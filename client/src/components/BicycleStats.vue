<script setup>
defineProps({
    totalAmountOfBikes: [String, Number],
    availableBikes: [String, Number],
    bookedBikes: [String, Number],
    averageBikePrice: [String, Number],
});
</script>

<template>
    <div class='statistics'>
        <h3 class='title'>Statistics</h3>
        <div class='statistics__data-list'>
            <p>Total Bikes: <span>{{ totalAmountOfBikes }}</span></p>
            <p>Available Bikes: <span>{{ availableBikes }}</span></p>
            <p>Booked Bikes: <span>{{ bookedBikes }}</span></p>
            <p>Average Bike Cost: <span>{{ averageBikePrice }}</span> UAH/hr</p>
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
    gap: .375rem;
    line-height: 22px;
    margin-top: .5rem;
}

.statistics__data-list span {
    font-weight: 700;
}
</style>