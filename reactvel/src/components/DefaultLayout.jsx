import { Link, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
export default function DefaultLayout(){
    //data context yang dipakai untuk menentukan user, token, dan notifikasi yang digenerate di file context provider
    const {user, token, setUser,setToken, notification} = UseStateContext()

    if(!token){
        return <Navigate to="/login" />
    }
    const onLogout = (e) =>{
        e.preventDefault()
        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        })
    }
    //fungsi untuk mengakses semua data user
    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
        })
},[])
    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">User</Link>

            </aside>
            <div className="content">
                <header>
                    <div>
                        header
                    </div>
                    <div>
                       { user.name}
                       <a href="" className="btn-logout" onClick={onLogout}>logout</a>
                    </div>
                </header>
                <main>
                <Outlet/>
                </main>
            </div>
            {notification && <div className="notification">
                {notification}
                </div>
                }   
        </div>
    )
}