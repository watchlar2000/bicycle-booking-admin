<script setup>
import { computed } from 'vue';
import { bicycleStatus } from '@/helpers/constants.js';

const props = defineProps({
    bicycleData: Object,
});

const totalAmountOfBikes = computed(() => {
    if (props.bicycleData) {
        return props.bicycleData.length;
    }
    return 0;
});

function filterBikeListByStatus(statusCondition) {
    if (props.bicycleData) {
        return props.bicycleData.filter(
            (bicycle) => bicycle.status === statusCondition,
        ).length;
    }

    return 0;
}

const availableBikes = computed(() => {
    return filterBikeListByStatus(bicycleStatus.available);
});

const bookedBikes = computed(() => {
    return filterBikeListByStatus(bicycleStatus.busy);
});

const averageBikePrice = computed(() => {
    if (props.bicycleData && props.bicycleData.length) {
        const totalPrice = props.bicycleData.reduce(
            (acc, cur) => (acc += cur.price),
            0,
        );
        return (totalPrice / props.bicycleData.length).toFixed(2);
    }
    return 0;
});
</script>

<template>
    <div class="statistics">
        <h3 class="title">Statistics</h3>
        <div class="statistics__data-list">
            <p>
                Total Bikes: <span>{{ totalAmountOfBikes }}</span>
            </p>
            <p>
                Available Bikes: <span>{{ availableBikes }}</span>
            </p>
            <p>
                Booked Bikes: <span>{{ bookedBikes }}</span>
            </p>
            <p>
                Average Bike Cost: <span>{{ averageBikePrice }}</span> UAH/hr
            </p>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
    text-transform: uppercase;
}

.statistics__data-list {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    gap: 0.375rem;
    line-height: 22px;
    margin-top: 0.5rem;
}

.statistics__data-list span {
    font-weight: 700;
}
</style>
