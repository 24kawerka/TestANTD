import { TaskType } from '../Redux/User/listReducer'
import { $authHost } from './index'


const ListAPI = {
    getList: async () => {
        const { data } = await $authHost.get<TaskType[]>('api/task')
        return data
    },
    createTask: async (title: string, isDone: boolean) => {
        const { data } = await $authHost.post<TaskType>('api/task', { title, isDone })
        return data
    },
    deleteTask: async (id: number) => {
        const { data } = await $authHost.delete<TaskType>(`api/task/${id}`)
        return data
    },
    changeTask: async (id: number, title: string, isDone: boolean) => {
        const { data } = await $authHost.put<TaskType>(`api/task/${id}`, { title, isDone })
        return data
    },
    doneTask: async (id: number) => {
        const { data } = await $authHost.put<TaskType>(`/api/task/done/${id}`)
        return data
    }

}

export { ListAPI }