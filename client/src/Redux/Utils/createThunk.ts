import { socket } from "../../Constants/utilsConstants"
import { ListAPI } from "../../http/listAPI"
import { setUserList, TaskType } from "../User/listReducer"



const createTaskThunk = (data: TaskType) => async (dispatch: any) => {
    await ListAPI.createTask(data.title, data.isDone = false)
    ListAPI.getList().then((responce: any) => {
        dispatch(setUserList(responce))
        const createdItem = responce[responce.length - 1]
        socket.emit('createTask', createdItem)
    })
}

const doneTaskThunk = (newTask: any) => async (dispatch: any) => {
    await ListAPI.doneTask(newTask.id)
    ListAPI.getList().then((responce: any) => {
        dispatch(setUserList(responce))
    })
}
const deleteTaskCreatorThunk = (data: any) => async (dispatch: any) => {
    await ListAPI.deleteTask(data.id)
}


export { createTaskThunk, doneTaskThunk, deleteTaskCreatorThunk }