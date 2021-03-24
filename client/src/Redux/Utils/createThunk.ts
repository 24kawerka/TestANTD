import { socket } from "../../Constants/utilsConstants"
import { ListAPI } from "../../http/listAPI"
import { setUserList, TaskType } from "../User/listReducer"



const createTaskThunk = (data: TaskType) => async (dispatch: any) => {
    await ListAPI.createTask(data.title, data.isDone = false)
    ListAPI.getList().then((responce: TaskType[]) => {
        dispatch(setUserList(responce))
        const createdItem = responce[responce.length - 1]
        socket.emit('createTask', createdItem)
    })
}

const doneTaskThunk = (newTask: TaskType) => async (dispatch: any) => {
    await ListAPI.doneTask(newTask.id)
    ListAPI.getList().then((responce: any) => {
        dispatch(setUserList(responce))
    })
}
const deleteTaskCreatorThunk = (data: TaskType) => async (dispatch: any) => {
    await ListAPI.deleteTask(data.id)
}


export { createTaskThunk, doneTaskThunk, deleteTaskCreatorThunk }