import { SET_LIST, SET_NEW_TASK } from '../../Constants/actionTypeConstants'

type TaskType = { title: string, isDone: boolean, id: number, userId: number, updatedAt: string }

type InitialListStateType = {
    list: Array<TaskType>,
    isAuth: boolean
}
const InitialListState: InitialListStateType = {
    list: [],
    isAuth: true
}

type SetListActionType = {
    type: typeof SET_LIST,
    responce: Array<TaskType>
}
type SetNewTaskType = {
    type: typeof SET_NEW_TASK,
    task: TaskType
}
type ListReducerActionType = SetListActionType | SetNewTaskType

const listReducer = (state = InitialListState, action: ListReducerActionType): InitialListStateType => {
    switch (action.type) {
        case SET_LIST: {
            return {
                ...state,
                list: action.responce.sort((a: any, b: any) => a.id - b.id),
            }
        }
        case SET_NEW_TASK: {
            return {
                ...state,
                list: [...state.list, action.task]
            }
        }
        default: return state
    }
}

const setUserList = (responce: Array<TaskType>) => {
    return {
        type: SET_LIST,
        responce
    }
}
const setNewTask = (task: TaskType) => {
    return {
        type: SET_NEW_TASK,
        task
    }
}



export { listReducer, setUserList, setNewTask }
export type { InitialListStateType, TaskType }