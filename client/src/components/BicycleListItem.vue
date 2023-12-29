<script setup>
import { status } from '@/helpers/constants.js';
import { ref } from 'vue';

const statusOptionsList = Object.values(status);

const props = defineProps({
    id: String,
    name: String,
    type: String,
    color: String,
    price: String,
    status: String,
});

const selectedStatusOption = ref(props.status);
const emit = defineEmits(['change-status', 'delete-item']);

const emitStatusChange = ({ id, status }) => {
    emit('change-status', { id, status });
};

const emitDeleteItem = ({ id }) => {
    emit('delete-item', { id });
};
</script>

<template>
    <li class='list__item'>
        <div class='col-1'>
            <p class='item__title'>
                <span>{{ name }}</span> - {{ type }} ({{ color }})
            </p>
            <p class='item__id'>
                ID: {{ id }}
            </p>
            <div class='item__status'>
                <span> Status:</span>
                <select v-model='selectedStatusOption' :data-id='id'
                        class='item__select' @change='emitStatusChange({id: props.id, status: selectedStatusOption})'>
                    <option v-for='option in statusOptionsList' :key='`${option}`'>
                        {{ option }}
                    </option>
                </select>
            </div>
        </div>
        <div class='col-2'>
            <button @click='emitDeleteItem({id})'>Delete</button>
            <p class='item__price'>
                {{ price }} UAH/hr.
            </p>
        </div>

    </li>
</template>

<style>
.list__item {
    background-color: #E8E8E8;
    border: 2px solid;
    border-radius: 10px;
    display: flex;
    padding: 0.75rem;
    width: 100%;
}

.col-1 {
    flex: 2;
}

.col-2 {
    align-items: flex-end;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
}

.item__title {
    font-size: 14px;
    line-height: 22px;
    text-transform: uppercase;
}

.item__title span {
    font-weight: 700;
}

.item__id {
    color: #717171;
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
}

.item__price {
    font-size: 24px;
    font-weight: 400;
    line-height: 38px;
}

.item__id,
.item__status {
    margin-top: 0.4rem;
}

.item__select {
    background-color: inherit;
    border: none;
    font: inherit;
    margin-left: 8px;
    outline: none;
}
</style>