import { SET_TASKS_FOR_ADMIN } from "../../Constants/actionTypeConstants"


type TasksForAdminType = {
    title: string | null,
    isDone: boolean | null,
    userId: number | null,
    updatedAt: string
}

type InitialTasksType = {
    listForAdmin: Array<TasksForAdminType>
}
const InitialTasks: InitialTasksType = {
    listForAdmin: []
}
type SetTasksForAdminActionType = {
    type: typeof SET_TASKS_FOR_ADMIN,
    tasks: Array<TasksForAdminType>
}

const tasksUserForAdminReducer = (state = InitialTasks, action: any): InitialTasksType => {
    switch (action.type) {
        case SET_TASKS_FOR_ADMIN: {
            return {
                ...state,
                listForAdmin: action.tasks.sort((a: any, b: any) => a.id - b.id)
            }
        }
        //dont need this, but thats my solution
        //     case SET_NEW_TASK_LIST: {
        //         return {
        //             ...state,
        //             listForAdmin: [...state.listForAdmin, action.data]
        //         }
        //     }
        //     default: return state
        // }
        default: return state
    }
}

const setTasksForAdmin = (tasks: Array<TasksForAdminType>) => {
    return {
        type: SET_TASKS_FOR_ADMIN,
        tasks
    }
}

export { tasksUserForAdminReducer, setTasksForAdmin }

export type { TasksForAdminType }