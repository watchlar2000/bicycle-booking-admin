export function makeBicycleList(database) {
    return Object.freeze({
        findMany,
        create,
        updateById,
        deleteById,
    });

    function findMany() {
        return database.bicycle.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });
    }

    function create(data) {
        return database.bicycle.create({
            data,
        });
    }

    function updateById(id, updatedData) {
        return database.bicycle.update({
            where: {
                id,
            },
            data: {
                ...updatedData,
            },
        });
    }

    function deleteById(id) {
        return database.bicycle.delete({
            where: {
                id,
            },
        });
    }
}