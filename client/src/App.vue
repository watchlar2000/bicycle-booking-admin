<script setup>
import { onMounted, reactive, toRaw } from 'vue';
import { BicycleService } from '@/api/index.js';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import BicycleListItem from '@/components/BicycleListItem.vue';
import BicycleStats from '@/components/BicycleStats.vue';
import BicycleList from '@/components/BicycleList.vue';
import BicycleForm from '@/components/BicycleForm.vue';

const bicycleData = reactive({ data: null });

const handleStatusChange = ({ id, status }) => {
    updateBicycleData({ id, status });
};

const addNewBicycleToLocalData = (data) => {
    bicycleData.data = [data, ...bicycleData.data];
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

function syncWithLocalBicycleData(updatedBicycle) {
    bicycleData.data = toRaw(bicycleData).data.map(bicycle => {
        if (bicycle.id === updatedBicycle.id) {
            return updatedBicycle;
        }

        return bicycle;
    });
}

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
                <BicycleForm @add-bicycle='addNewBicycleToLocalData' />
                <hr class='break-line' />
                <BicycleStats
                    :bicycle-data='toRaw(bicycleData.data)'
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
