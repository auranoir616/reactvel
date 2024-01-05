import { Link } from "react-router-dom"
import { useState,useRef } from "react"
import axiosClient from "../axios-client"
import { UseStateContext } from "../context/ContextProvider"

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState()
    const {setUser, setToken} = UseStateContext()
    const onSubmit = (e) =>{
        e.preventDefault()
        const payload ={
            //mengambil value dari elemen input menggunakan ref
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null)
        console.log(payload)
        axiosClient.post('/login', payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=>{
            console.log(err)
            const response = err.response
            if(response && response.status === 422){
               setErrors(response.data.errors)
            }else{
                setErrors({
                    email: [response.data.message]
                })
            }
        })
    }  
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">

        <form action="" onSubmit={onSubmit}>
            <h1 className="title">
                Login into your Account
            </h1>
            {errors && <div className="alert">
        {Object.keys(errors).map(key =>(
            <p key={key}>{errors[key][0]}</p>
        ))}
        </div>}
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button type="submit" className="btn btn-block">Login</button>
            <p className="message">
                not Registered? <Link to='/signup'>create new Account</Link>
            </p>
        </form>
            </div>
        </div>
    )
}