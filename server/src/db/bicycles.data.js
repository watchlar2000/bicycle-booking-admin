import { generateId } from '../helpers/common.js';

const ID = new Map();

function fillMapWithIDs(amount) {
    for (let i = 0; i < amount; ++i) {
        const id = generateId(12);
        ID.set(i, id);
    }
}

fillMapWithIDs(3);

export const bicycleData = [
    {
        id: ID.get(0),
        name: 'Giant',
        type: 'Mountain bike',
        color: 'blue',
        wheel_size: 29,
        price: 49.99,
        description: 'Pro-level Advanced SL composite frame is the lightest off-road frame Giant has ever produced, offering serious XC racers a competitive advantage for climbing, accelerating and sprinting.',
    },
    {
        id: ID.get(1),
        name: 'Vitus',
        type: 'E-bike',
        color: 'red',
        wheel_size: 27.5,
        price: 69.99,
        description: 'The Vitus e-Substance loads your ride with freedom and choice. It expands your world, opening up new possibilities to ride and explore where otherwise you might not have looked. Unshackled from the same old routes, each ride reveals new ways ahead, like a fresh map - that bridleway to who-knows-where, the gravel track through the woods or the rougher shortcut that you know is quicker but that other bikes couldn\’t handle.',
    },
    {
        id: ID.get(2),
        name: 'Rocky Mountains',
        type: 'Kid\'s bike',
        color: 'orange',
        wheel_size: 24,
        price: 29.99,
        description: 'With its sturdy construction and nimble handling, The Flow is the perfect skills training tool for any serious rider, and a fun playful ride for everyone. Get ready to master the pump track with precision and style with the Flow.',
    },

];

