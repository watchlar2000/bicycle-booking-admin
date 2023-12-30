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
import IconLoader from '@/components/shared/IconLoader.vue';

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
        bicycleData.data = toRaw(bicycleData).data.filter((i) => i.id !== id);
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
    bicycleData.data = toRaw(bicycleData).data.map((bicycle) => {
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
            <div class="list">
                <IconLoader
                    v-if="!bicycleData.data"
                    class="list__loader"
                ></IconLoader>
                <BicycleList v-else>
                    <BicycleListItem
                        v-for="{
                            id,
                            name,
                            type,
                            color,
                            price,
                            status,
                        } in bicycleData.data"
                        :id="id"
                        :key="id"
                        :class="`border-${status.toLowerCase()}`"
                        :color="color"
                        :name="name"
                        :price="price"
                        :status="status"
                        :type="type"
                        @change-status="handleStatusChange"
                        @delete-item="handleDelete"
                    />
                </BicycleList>
            </div>

            <div class="details">
                <BicycleForm @add-bicycle="addNewBicycleToLocalData" />
                <hr class="break-line" />
                <BicycleStats :bicycle-data="toRaw(bicycleData.data)" />
            </div>
        </template>
        <template #footer>
            <AppFooter />
        </template>
    </DefaultLayout>
</template>

<style>
.details {
    border-left: 1px solid #c4c4c4;
    flex: 1;
    padding-left: 1.5rem;
    padding-top: 1.5rem;
}

.list {
    flex: 1;
    position: relative;
}

.list__loader {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.break-line {
    color: #c4c4c4;
    margin: 1.25rem 0;
    opacity: 0.375;
}

.border-available {
    border-color: #6fcf97;
}

.border-unavailable {
    border-color: #eb5757;
    opacity: 0.5;
}

.border-busy {
    border-color: #f2994a;
}
</style>
