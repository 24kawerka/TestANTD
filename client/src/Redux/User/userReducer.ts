import { SET_ISAUTH, SET_USER } from '../../Constants/actionTypeConstants'

type UserType = {
    email: string
    exp: number
    firstName: string
    iat: number
    id: number
    lastName: string
    role: string
}

type InitialUserStateType = {
    user: any,
    isAuth: boolean
}

const InitialUserState: InitialUserStateType = {
    user: {},
    isAuth: false
}
type SetUserReducerActionType = {
    type: typeof SET_USER,
    responce: UserType
}
type SetIsAuthReducerActionType = {
    type: typeof SET_ISAUTH,
    data: boolean
}
type UserReducerActionType = SetUserReducerActionType | SetIsAuthReducerActionType

const userReducer = (state = InitialUserState, action: UserReducerActionType): InitialUserStateType => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.responce
            }
        }
        case SET_ISAUTH: {
            return {
                ...state,
                isAuth: action.data
            }
        }

        default: return state
    }
}

const setUser = (responce: any) => {
    return {
        type: SET_USER,
        responce
    }
}
const setIsAuth = (data: boolean) => {
    return {
        type: SET_ISAUTH,
        data
    }
}

export { userReducer, setUser, setIsAuth }
export type { InitialUserStateType, UserType }