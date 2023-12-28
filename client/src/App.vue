<script setup>
import { onMounted, reactive, ref, toRaw, watch } from 'vue';
import { BicycleService } from '@/api/index.js';

const statusOptionsList = ['Available', 'Unavailable', 'Busy'];
const bicycleData = reactive({ data: null });

const initFormData = {
    name: '',
    type: '',
    color: '',
    wheel_size: '',
    price: '',
    id: '',
    description: '',
};

const initErrorsData = generateErrorObj();

function generateErrorObj() {
    const err = {};
    for (const key of Object.keys(initFormData)) {
        err[key] = true;
    }

    return err;
}

const errorMessage = {
    id: 'ID must be a 12-byte string',
    text: 'This field must be at least 5-character long',
    number: 'This field must be a number',
};

const formData = reactive({ ...initFormData });
const formDataErrors = reactive({ ...initErrorsData });
const isFormSent = ref(false);

onMounted(async () => {
    const { data } = await BicycleService.getAll();
    bicycleData.data = data;
});

const handleStatusChange = (e) => {
    const newSelectedStatus = e.target.value;
    const id = e.target.attributes['data-id'].value;

    updateBicycleData({ id, status: newSelectedStatus });
};

const handleClearForm = () => {
    Object.assign(formData, initFormData);
    Object.assign(formDataErrors, initErrorsData);
    isFormSent.value = false;
};

async function handleDelete(id) {
    try {
        await BicycleService.deleteById(id);
        bicycleData.data = toRaw(bicycleData).data.filter(i => i.id !== id);
    } catch (e) {
        console.error(e);
    }
}

async function updateBicycleData(body) {
    try {
        const { data } = await BicycleService.updateById(body);
        syncLocalBicycleData(data);
    } catch (e) {
        console.error(e);
    }
}

async function handlePostBicycle() {
    isFormSent.value = true;
    const validForm = validateFormData();

    if (!validForm) {
        return;
    }

    const body = { ...toRaw(formData) };

    try {
        const { data } = await BicycleService.post(body);
        bicycleData.data = [data, ...bicycleData.data];
    } catch (e) {
        console.error(e);
    }
}

function syncLocalBicycleData(updatedBicycle) {
    bicycleData.data = toRaw(bicycleData).data.map(bicycle => {
        if (bicycle.id === updatedBicycle.id) {
            return updatedBicycle;
        }

        return bicycle;
    });
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
            default:
                errors[key] = validateTextField(value);
                break;
        }
    }

    Object.assign(formDataErrors, errors);

    return checkIfErrorsExisting(errors);
    // console.log(errors);
};

function checkIfErrorsExisting(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === false) {
            return false;
        }
    }
    return true;
}

function validateTextField(input) {
    return !(typeof input === 'string' && input.length < 5);
}

function validateNumberField(input) {
    return !isNaN(Number(input)) && input !== '';
}

watch(formData, () => {
    if (isFormSent.value) {
        validateFormData();
    }
});
</script>

<template>
    <div class='container'>

        <header class='header bg'>
            <div class='content-wrapper'>
                <h1>
                    ADMIN.BIKE-BOOKING.COM
                </h1>
            </div>

        </header>
        <main class='main'>
            <div class='content-wrapper main__content'>
                <div v-if='bicycleData.data' class='list'>
                    <div v-for='{id, name, type, color, price, status} in bicycleData.data' :key='id'
                         :class='`border-${status.toLowerCase()}`'
                         class='list__item'>
                        <p>
                            {{ name }} - {{ type }} ({{ color }})
                        </p>
                        <p>
                            ID: {{ id }}
                        </p>
                        <div>
                            <span>
                                Status:
                            </span>
                            <div id='v-model-select'>
                                <select :data-id='id' :value='status' @change='handleStatusChange'>
                                    <option v-for='option in statusOptionsList' :key='`${option}`'>
                                        {{ option }}
                                    </option>
                                </select>
                            </div>

                        </div>
                        <p>
                            {{ price }} UAH/hr.
                        </p>
                        <button @click='() => handleDelete(id)'>Delete</button>
                    </div>
                </div>
                <div class='details'>
                    <form class='form' @submit.prevent='handlePostBicycle'>
                        <div class='form__row'>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.name'

                                    placeholder='Name'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.name' class='error'>{{ errorMessage.text }}</p>
                            </div>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.type'
                                    placeholder='Type'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.type' class='error'>{{ errorMessage.text }}</p>
                            </div>

                        </div>

                        <div class='form__row'>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.color'

                                    placeholder='Color'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.color' class='error'>{{ errorMessage.text }}</p>
                            </div>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.wheel_size'

                                    placeholder='Wheel size'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.wheel_size' class='error'>{{ errorMessage.number }}</p>
                            </div>
                        </div>
                        <div class='form__row'>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.price'

                                    placeholder='Price'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.price' class='error'>{{ errorMessage.number }}</p>
                            </div>
                            <div class='form__row--item'>
                                <input
                                    v-model='formData.id'

                                    placeholder='ID (slug): XXXXXXXXXXXX'
                                    type='text'
                                >
                                <p v-if='!formDataErrors.id' class='error'>{{ errorMessage.id }}</p>
                            </div>
                        </div>
                        <div class='form__row--item'>
                            <textarea
                                v-model='formData.description'
                                placeholder='Description'

                            />
                            <p v-if='!formDataErrors.description' class='error'>{{ errorMessage.text }}</p>
                        </div>
                        <div class='form__controls'>
                            <button class='button'>Save</button>
                            <button class='button' type='button' @click='handleClearForm'>Clear</button>
                        </div>
                    </form>
                </div>
            </div>

        </main>
        <footer class='footer bg'>
            <div class='content-wrapper'>
                <p>
                    Developer: <span>Sergii Kochetov</span>
                </p>
            </div>
        </footer>
    </div>

</template>

<style scoped>
.container {
    /*background-color: #2c3e50;*/
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
}

.header,
.footer,
.main {
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    width: 100%;
}

.main {
    flex: 1;
}

.main__content {
    display: flex;
    gap: 1.5rem;
    margin: 1rem 0;
}

.content-wrapper {
    max-width: 1200px;
    width: 1200px;
}

.bg {
    background-color: #696969;
}

.list {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1.5rem;
}


.list__item {
    background-color: #E8E8E8;
    border: 2px solid;
    padding: 0.75rem;
}

.details {
    flex: 1;
}

.border-available {
    border-color: #6FCF97;
}

.border-unavailable {
    border-color: #EB5757;
}

.border-busy {
    border-color: #F2994A;
}

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
    color: #EB5757;
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
