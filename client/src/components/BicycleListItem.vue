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
        <p>
            {{ name }} - {{ type }} ({{ color }})
        </p>
        <p>
            ID: {{ id }}
        </p>
        <div>
            <span> Status:</span>
            <div id='v-model-select'>
                <select v-model='selectedStatusOption' :data-id='id'
                        @change='emitStatusChange({id: props.id, status: selectedStatusOption})'>
                    <option v-for='option in statusOptionsList' :key='`${option}`'>
                        {{ option }}
                    </option>
                </select>
            </div>

        </div>
        <p>
            {{ price }} UAH/hr.
        </p>
        <button @click='emitDeleteItem({id})'>Delete</button>
    </li>
</template>

<style>
.list__item {
    background-color: #E8E8E8;
    border: 2px solid;
    padding: 0.75rem;
}
</style>