<template>
    <ul class='list list__bicycle'>
        <slot />
    </ul>
</template>

<style scoped>
.list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.list__bicycle {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1.5rem;
}
</style>