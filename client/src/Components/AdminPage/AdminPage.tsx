import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../Styles/Admin/admin.scss'
import AdminSelector from '../../Redux/Admin/AdminPageSelector'
import { getUsers, UsersType } from '../../Redux/Admin/usersReducer'
import { UserForAdmin } from './UserForAdmin'
import { UserAPI } from '../../http/userAPI'
import Admin from '../../Redux/Admin/AdminPageSelector'
import { setTasksForAdmin, TasksForAdminType } from '../../Redux/Admin/tasksUserForAmin'
import { setIsAuth, setUser } from '../../Redux/User/userReducer'
import { useHistory } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../Constants/routeConstants'
import { socket } from '../../Constants/utilsConstants'
import { Row, Col, Typography, Button } from 'antd';


const AdminPage = () => {
    const users = useSelector(AdminSelector.getUsers)
    const tasks = useSelector(Admin.getTasksUserForAdmin)
    const dispatch = useDispatch()
    const history = useHistory()
    const { Title, Text } = Typography

    useEffect(() => {
        UserAPI.getAllUsers().then(resp => {
            dispatch(getUsers(resp))
        })
    }, [])

    useEffect(() => {
        const newUserRegisterData = () => {
            alert('Добавлен новый пользователь');
            UserAPI.getAllUsers().then(resp => {
                dispatch(getUsers(resp))
            })
        }
        socket.on('newUserRegister', newUserRegisterData)
        return () => {
            socket.off('newUserRegister', newUserRegisterData)
        }
    }, [dispatch])

    useEffect(() => {
        const deleteTaskNotifyData = (data: any) => {
            UserAPI.getUserTasksForAdmin(data.userId).then(resp => {
                dispatch(setTasksForAdmin(resp))
            })
        }
        socket.on('deleteTaskNotify', deleteTaskNotifyData)
        return () => {
            socket.off('deleteTaskNotify', deleteTaskNotifyData)
        }
    }, [dispatch])

    useEffect(() => {
        const createTaskNotifyData = (data: any) => {
            UserAPI.getUserTasksForAdmin(data.userId).then(resp => {
                dispatch(setTasksForAdmin(resp))
            })
        }
        socket.on('createTaskNotify', createTaskNotifyData)
        return () => {
            socket.off('createTaskNotify', createTaskNotifyData)
        }
    }, [dispatch])

    useEffect(() => {
        const changeTaskNotifyData = (newTask: any) => {
            UserAPI.getUserTasksForAdmin(newTask).then(resp => {
                dispatch(setTasksForAdmin(resp))
            })
        }
        socket.on('changeTaskNotify', changeTaskNotifyData)
        return () => {
            socket.off('changeTaskNotify', changeTaskNotifyData)
        }
    }, [dispatch])

    useEffect(() => {
        const doneTaskNotifyData = (newTaskId: any) => {
            UserAPI.getUserTasksForAdmin(newTaskId).then(resp => {
                dispatch(setTasksForAdmin(resp))
            })
        }
        socket.on('doneTaskNotify', doneTaskNotifyData)
        return () => {
            socket.off('doneTaskNotify', doneTaskNotifyData)
        }
    }, [dispatch])

    useEffect(() => {
        const changeFirstNameNotifyData = (id: number) => {
            UserAPI.getAllUsers().then(resp => {
                dispatch(getUsers(resp))
            })
        }
        socket.on('changeFirstNameNotify', changeFirstNameNotifyData)
        return () => {
            socket.off('changeFirstNameNotify', changeFirstNameNotifyData)
        }
    }, [dispatch])

    useEffect(() => {
        const changeLastNameNotifyData = (id: number) => {
            UserAPI.getAllUsers().then(resp => {
                dispatch(getUsers(resp))
            })
        }
        socket.on('changeLastNameNotify', changeLastNameNotifyData)
        return () => {
            socket.off('changeLastNameNotify', changeLastNameNotifyData)
        }
    }, [dispatch])

    const logOut = () => {
        dispatch(setIsAuth(false))
        dispatch(setUser({}))
        history.push(LOGIN_ROUTE)
    }

    return (
        <div className='admin-container'>
            <Row>
                <Col span={12}>
                    <Title>Пользователи</Title>
                    {users.map((users: UsersType) =>
                        <UserForAdmin key={users.id} users={users} />
                    )}
                </Col>
                <Col span={12}>
                    <div className='tasks-title'>
                        <Title>Список задач</Title>
                        <Button type="primary" danger onClick={logOut}>Выйти</Button>
                    </div>
                    {tasks.map((task: TasksForAdminType, index: number) =>
                        <div key={index}>
                            {task.isDone === false ?
                                <div className='task-wrapper '>
                                    <Text strong>{task.title}</Text>
                                </div>
                                :
                                <div className='task-wrapper '>
                                    <Text delete strong>{task.title}</Text>
                                    <Text strong>
                                        Закончена {task.updatedAt.slice(0, 10)} в {task.updatedAt.slice(11, -5)}
                                    </Text>
                                </div>
                            }
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}
export { AdminPage }