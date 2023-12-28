const BASE_URL = 'api/bicycles';

export function BicycleDataService(http) {
    return Object.freeze({
        getAll,
        post,
        deleteById,
        updateById,
    });

    async function getAll() {
        return await http.get(BASE_URL);
    }

    async function post(data) {
        return await http.post(BASE_URL, data);
    }

    async function deleteById(id) {
        return await http.delete(`${BASE_URL}/${id}`);
    }


    async function updateById(data) {
        const { id, ...body } = data;
        return await http.put(`${BASE_URL}/${id}`, body);
    }
}