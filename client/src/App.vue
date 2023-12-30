<script setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import { BicycleService } from '@/api/index.js';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import BicycleListItem from '@/components/BicycleListItem.vue';
import BicycleStats from '@/components/BicycleStats.vue';
import BicycleList from '@/components/BicycleList.vue';
import BicycleForm from '@/components/BicycleForm.vue';
import IconLoader from '@/components/shared/IconLoader.vue';
import AppNotification from '@/components/AppNotification.vue';
import { notify } from '@/helpers/notify.js';

const bicycleData = reactive({ data: null });
const serverError = ref(null);

const handleStatusChange = ({ id, status }) => {
    updateBicycleData({ id, status });
};

const addNewBicycleToLocalData = (data) => {
    bicycleData.data = [data, ...bicycleData.data];
};

async function handleDelete({ id }) {
    if (notify.isVisible) {
        return;
    }

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
    try {
        const { data } = await BicycleService.getAll();
        bicycleData.data = data;
    } catch (e) {
        serverError.value = e.error;
    }
});
</script>

<template>
    <DefaultLayout>
        <template #header>
            <AppHeader />
        </template>
        <template #main>
            <Transition name="slide-fade">
                <AppNotification
                    v-if="notify.isVisible"
                    :msg="notify.message"
                    :success="notify.success"
                />
            </Transition>
            <div class="list">
                <template v-if="!serverError">
                    <IconLoader
                        v-if="!bicycleData.data"
                        class="position-center"
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
                        <li v-if="!bicycleData.data.length">
                            No bicycle items... Use form to add new ones!
                        </li>
                    </BicycleList>
                </template>
                <template v-else>
                    <div class="position-center">
                        <p class="error-message">
                            {{ serverError }}
                        </p>
                        <p>Problems with connecting to the server</p>
                    </div>
                </template>
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

.position-center {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.error-message {
    font-size: 1.5rem;
    text-align: center;
}

.break-line {
    color: #c4c4c4;
    margin: 1.25rem 0;
    opacity: 0.375;
}

.slide-fade-enter-active {
    transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
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
