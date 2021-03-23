import React from 'react'
import { useDispatch } from 'react-redux'
import { UserAPI } from '../../http/userAPI'
import '../../Styles/Admin/admin.scss'
import { setTasksForAdmin } from '../../Redux/Admin/tasksUserForAmin'
import { getUsers } from '../../Redux/Admin/usersReducer'
import { Button } from 'antd';
import "antd/dist/antd.css";
import { UnlockTwoTone, LockTwoTone, CloseCircleTwoTone } from "@ant-design/icons"


type UserType = {
    users: {
        firstName: string,
        lastName: string,
        id: number,
        isOnline: boolean
    }
}

const UserForAdmin = (props: UserType) => {
    const dispatch = useDispatch()
    const showUserTasks = (id: number) => {
        UserAPI.getUserTasksForAdmin(id).then(resp => {
            dispatch(setTasksForAdmin(resp))
        })
    }
    const deleteUserCreator = async (id: number) => {
        await UserAPI.deleteUser(id).then(responce => {
            UserAPI.getAllUsers().then(resp => {
                dispatch(getUsers(resp))
            })
        })
    }
    const setIsActive = async (id: number) => {
        await UserAPI.changeIsActive(id).then(resp => {
            UserAPI.getAllUsers().then(resp => {
                dispatch(getUsers(resp))
            })
            alert('Изменен статус пользователя!')
        })

    }
    return (
        <div className='user-list-container'>
            <Button
                onClick={() => showUserTasks(props.users.id)} >
                {`${props.users.firstName} ${props.users.lastName}`}
            </Button>
            {props.users.isOnline === true ?
                <Button type="text" onClick={() => setIsActive(props.users.id)}><UnlockTwoTone twoToneColor="#FFFF00" /></Button>
                :
                <Button type="text" onClick={() => setIsActive(props.users.id)}><LockTwoTone twoToneColor="#FFFF00" /></Button>
            }
            <Button type="text" onClick={() => deleteUserCreator(props.users.id)}><CloseCircleTwoTone twoToneColor="#eb2f96" /></Button>

        </div>
    )
}



export { UserForAdmin }