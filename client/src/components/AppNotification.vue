<script setup>
defineProps({
    success: Boolean,
    msg: String,
});
</script>

<template>
    <div :class="`status-${success}`" class="wrapper">{{ msg }}</div>
</template>

<style scoped>
.wrapper {
    background-color: #6fcf97;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    position: fixed;
    right: 1.5rem;
    top: 1.5rem;
}

.status-false {
    background-color: #eb5757;
}
</style>
