<script setup>
import { computed, onMounted, reactive, ref, toRaw, watch } from 'vue';
import { BicycleService } from '@/api/index.js';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { initFormData, status } from '@/helpers/constants.js';
import { generateErrorObj } from '@/helpers/utils.js';
import { errorMessage } from '@/helpers/errors.js';
import { checkIfErrorsExisting, validateNumberField, validateTextField } from '@/helpers/validate.js';
import BicycleListItem from '@/components/BicycleListItem.vue';
import BicycleStats from '@/components/BicycleStats.vue';
import BicycleList from '@/components/BicycleList.vue';

const bicycleData = reactive({ data: null });
const initErrorsData = generateErrorObj();

const formData = reactive({ ...initFormData });
const formDataErrors = reactive({ ...initErrorsData });
const isFormSent = ref(false);

const handleStatusChange = ({ id, status }) => {
    updateBicycleData({ id, status });
};

const handleClearForm = () => {
    Object.assign(formData, initFormData);
    Object.assign(formDataErrors, initErrorsData);
    isFormSent.value = false;
};

async function handleDelete({ id }) {
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
        syncWithLocalBicycleData(data);
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
        handleClearForm();
    } catch (e) {
        console.error(e);
    }
}

function syncWithLocalBicycleData(updatedBicycle) {
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
};

const totalAmountOfBikes = computed(() => {
    if (bicycleData.data) {
        return bicycleData.data.length;
    }
    return 0;
});

const filterBikeListByStatus = (statusCondition) => {
    if (bicycleData.data) {
        return bicycleData.data.filter(bicycle => bicycle.status === statusCondition).length;
    }
};

const availableBikes = computed(() => {
    return filterBikeListByStatus(status.available);
});

const bookedBikes = computed(() => {
    return filterBikeListByStatus(status.busy);
});

const averageBikePrice = computed(() => {
    if (bicycleData.data) {
        const priceOfAllBicycles = bicycleData.data.reduce((acc, cur) => acc += cur.price, 0);
        return (priceOfAllBicycles / bicycleData.data.length).toFixed(2);
    }
    return 0;
});

watch(formData, () => {
    if (isFormSent.value) {
        validateFormData();
    }
});

onMounted(async () => {
    const { data } = await BicycleService.getAll();
    bicycleData.data = data;
});
</script>

<template>
    <DefaultLayout>
        <template #header>
            <AppHeader />
        </template>
        <template #main>
            <BicycleList v-if='bicycleData.data' class='list'>
                <BicycleListItem v-for='{id, name, type, color, price, status} in bicycleData.data'
                                 :id='id'
                                 :key='id'
                                 :class='`border-${status.toLowerCase()}`'
                                 :color='color'
                                 :name='name'
                                 :price='price'
                                 :status='status'
                                 :type='type'

                                 @change-status='handleStatusChange'
                                 @delete-item='handleDelete'
                ></BicycleListItem>
            </BicycleList>
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
                <hr class='break-line' />
                <BicycleStats
                    :available-bikes='availableBikes'
                    :average-bike-price='averageBikePrice'
                    :booked-bikes='bookedBikes'
                    :total-amount-of-bikes='totalAmountOfBikes'
                />
            </div>
        </template>
        <template #footer>
            <AppFooter />
        </template>
    </DefaultLayout>
</template>

<style>
.details {
    border-left: 1px solid #C4C4C4;
    flex: 1;
    padding-left: 1.5rem;
    padding-top: 1.5rem;
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

.break-line {
    color: #C4C4C4;
    margin: 1.25rem 0;
    opacity: 0.375;
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
</style>
