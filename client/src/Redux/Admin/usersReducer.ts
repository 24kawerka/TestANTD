import { GET_USERS } from '../../Constants/actionTypeConstants'

type UsersType = { firstName: string, lastName: string, id: number, isOnline: boolean, role: string }

type InitialUsersStateType = {
    users: Array<UsersType>,
    isAuth: boolean
}
const InitialUsersState: InitialUsersStateType = {
    users: [],
    isAuth: true
}
type UsersReducerActionType = {
    type: typeof GET_USERS,
    users: Array<UsersType>
}

const usersReducer = (state = InitialUsersState, action: UsersReducerActionType): InitialUsersStateType => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users:
                    action.users.sort((a: any, b: any) => a.id - b.id).filter((user: UsersType) => user.role === 'USER')
            }
        }
        default: return state
    }
}
const getUsers = (users: Array<UsersType>) => {
    return {
        type: GET_USERS,
        users
    }
}

export { usersReducer, getUsers }
export type { InitialUsersStateType, UsersType }