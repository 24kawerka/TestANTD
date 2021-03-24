import { $host, $authHost } from './index'
import jwt_decode from 'jwt-decode'
import { UsersType } from '../Redux/Admin/usersReducer'
import { TasksForAdminType } from '../Redux/Admin/tasksUserForAmin'
import { UserType } from '../Redux/User/userReducer'

type tokenDataType = {
    token: string
}

const AuthAPI = {
    registration: async (email: string, password: string, firstName: string, lastName: string) => {
        const { data } = await $host.post<tokenDataType>('api/user/registration', { email, password, firstName, lastName, role: 'USER', isOnline: true })
        console.log(data);
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
    login: async (email: string, password: string) => {
        const { data } = await $host.post<tokenDataType>('api/user/login', { email, password })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}
const UserAPI = {
    getAllUsers: async () => {
        const { data } = await $authHost.get<UsersType[]>('api/user/users')
        return data
    },
    getUserTasksForAdmin: async (id: number) => {
        const { data } = await $authHost.get<TasksForAdminType[]>(`/api/task/tasksforadmin/${id}`)
        return data
    },
    changeFirstName: async (id: number, firstName: string) => {
        const { data } = await $authHost.put<UserType>(`api/user/firstname/${id}`, { firstName })
        return data
    },
    changeLastName: async (id: number, lastName: string) => {
        const { data } = await $authHost.put<UserType>(`api/user/lastname/${id}`, { lastName })
        return data
    },
    deleteUser: async (id: number) => {
        const { data } = await $authHost.delete<UsersType[]>(`api/user/users/${id}`)
        return data
    },
    changeIsActive: async (id: number) => {
        const { data } = await $authHost.put<UsersType>(`api/user/isactive/${id}`)
        return data
    }
}
export { AuthAPI, UserAPI }
