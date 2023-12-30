<script setup>
import { reactive, ref, toRaw, watch } from 'vue';
import { BicycleService } from '@/api/index.js';
import { initFormData } from '@/helpers/constants.js';
import { generateErrorObj, toHex } from '@/helpers/utils.js';
import { errorMessage } from '@/helpers/errors.js';
import {
    checkIfErrorsExisting,
    validateId,
    validateNumberField,
    validateTextField,
} from '@/helpers/validate.js';
import { notify } from '@/helpers/notify.js';

const emit = defineEmits(['add-bicycle']);

const initErrorsData = generateErrorObj();
const formData = reactive({ ...initFormData });
const formDataErrors = reactive({ ...initErrorsData });
const isFormTouched = ref(false);

const handleClearForm = () => {
    Object.assign(formData, initFormData);
    Object.assign(formDataErrors, initErrorsData);
    isFormTouched.value = false;
};

async function handlePostBicycle() {
    isFormTouched.value = true;
    const validForm = validateFormData();

    if (!validForm) {
        return;
    }

    if (notify.isVisible) {
        return;
    }

    const postData = toRaw(formData);

    const body = { ...postData, id: toHex(postData.id) };

    try {
        const { data } = await BicycleService.post(body);
        emit('add-bicycle', data);
        handleClearForm();
    } catch (e) {
        console.log(e.message);
    }
}

const validateFormData = () => {
    const errors = {};
    for (const [key, value] of Object.entries(toRaw(formData))) {
        switch (key) {
            case 'price':
                errors[key] = validateNumberField(value);
                break;
            case 'wheel_size':
                errors[key] = validateNumberField(value);
                break;
            case 'id':
                errors[key] = validateId(value);
                break;
            default:
                errors[key] = validateTextField(value);
                break;
        }
    }

    Object.assign(formDataErrors, errors);

    return checkIfErrorsExisting(errors);
};

watch(formData, () => {
    if (isFormTouched.value) {
        validateFormData();
    }
});
</script>

<template>
    <form class="form" @submit.prevent="handlePostBicycle">
        <div class="form__row">
            <div class="form__row--item">
                <input v-model="formData.name" placeholder="Name" type="text" />
                <p v-if="!formDataErrors.name" class="error">
                    {{ errorMessage.text('Name') }}
                </p>
            </div>
            <div class="form__row--item">
                <input v-model="formData.type" placeholder="Type" type="text" />
                <p v-if="!formDataErrors.type" class="error">
                    {{ errorMessage.text('Type') }}
                </p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row--item">
                <input
                    v-model="formData.color"
                    placeholder="Color"
                    type="text"
                />
                <p v-if="!formDataErrors.color" class="error">
                    {{ errorMessage.text('Color') }}
                </p>
            </div>
            <div class="form__row--item">
                <input
                    v-model="formData.wheel_size"
                    placeholder="Wheel size"
                    type="text"
                />
                <p v-if="!formDataErrors.wheel_size" class="error">
                    {{ errorMessage.number('Wheel size') }}
                </p>
            </div>
        </div>
        <div class="form__row">
            <div class="form__row--item">
                <input
                    v-model="formData.price"
                    placeholder="Price"
                    type="text"
                />
                <p v-if="!formDataErrors.price" class="error">
                    {{ errorMessage.number('Price') }}
                </p>
            </div>
            <div class="form__row--item">
                <input
                    v-model="formData.id"
                    placeholder="ID (slug): XXXXXXXXXXXX"
                    type="text"
                />
                <p v-if="!formDataErrors.id" class="error">
                    {{ errorMessage.id() }}
                </p>
            </div>
        </div>
        <div class="form__row--item">
            <textarea
                v-model="formData.description"
                placeholder="Description"
            />
            <p v-if="!formDataErrors.description" class="error">
                {{ errorMessage.text('Description') }}
            </p>
        </div>
        <div class="form__controls">
            <button class="button">Save</button>
            <button class="button" type="button" @click="handleClearForm">
                Clear
            </button>
        </div>
    </form>
</template>

<style>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form__row {
    display: flex;
    gap: 0.75rem;
    width: 100%;
}

.form__row--item {
    flex: 1;
}

.form__row--item input,
.form__row--item textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
}

.form__controls {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.form__controls button {
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    font-size: 14px;
    font-weight: bold;
    height: 24px;
    justify-content: center;
    padding: 4px 22px;
    text-transform: uppercase;
}

.error {
    color: #eb5757;
    font-size: 0.75rem;
    margin-top: 0.1875rem;
}

.button {
    background-color: #696969;
    border: none;
    color: #f2f2f2;
    outline: none;
}
</style>
