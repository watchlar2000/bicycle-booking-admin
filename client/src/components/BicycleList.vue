<template>
    <ul class="list__bicycle">
        <slot />
    </ul>
</template>

<style scoped>
.list__bicycle {
    display: flex;
    flex: 1;
    flex-direction: column;

    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 1.5rem 0 0;
}
</style>
