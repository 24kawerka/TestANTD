import { $authHost } from './index'


const ListAPI = {
    getList: async () => {
        const { data } = await $authHost.get('api/task')
        return data
    },
    createTask: async (title, isDone) => {
        const { data } = await $authHost.post('api/task', { title, isDone })
        return data
    },
    deleteTask: async (id) => {
        const { data } = await $authHost.delete(`api/task/${id}`)
        return data
    },
    changeTask: async (id, title, isDone) => {
        const { data } = await $authHost.put(`api/task/${id}`, { title, isDone })
        return data
    },
    doneTask: async (id) => {
        const { data } = await $authHost.put(`/api/task/done/${id}`)
        return data
    }

}

export { ListAPI }