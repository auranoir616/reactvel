import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"
import { UseStateContext } from "../context/ContextProvider"
export default function Users(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const {setNotification} = UseStateContext()

    useEffect(()=>{
        getUsers()
    },[])

    const onDelete =(user)=>{
        if(!window.confirm('are you want to delete this User?')){
        return
     }

     axiosClient.delete(`/users/${user.id}`)
     .then(()=>{
        setNotification('User was successfully Deleted')
        getUsers()
     })
     .catch((error)=>{
        console.log('gagal delete user, ', error)
     })
}

    const getUsers = () =>{
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            setLoading(false)
            console.log(data)
            setUsers(data.data)
        })
        .catch(()=>{
            setLoading(false)
        })
    }
    
    return(
        <div>
            <div style={{display: 'flex',justifyContent:'space-between', alignItems:'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create at</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                    }   
                    {!loading && <tbody>
                        {users.map(user =>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/'+user.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={() => onDelete(user)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
}
                </table>
            </div>
        </div>
    )
}