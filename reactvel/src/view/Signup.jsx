import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client.js"
import { UseStateContext } from "../context/ContextProvider"

export default function Signup(){
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [errors, setErrors] = useState()
    const {setUser, setToken} = UseStateContext()
    const onSubmit = (e) =>{
        e.preventDefault()
        const payload ={
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value,
        }

        console.log(payload)
        axiosClient.post('/signup', payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
            console.log('data',data)
        })
        .catch(err=>{
            console.log(err)
            const response = err.response
            if(response && response.status === 422){
               setErrors(response.data.errors)
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">

        <form onSubmit={onSubmit}>
        
            <h1 className="title">
                Sign up 
            </h1>
            {errors && <div className="alert">
        {Object.keys(errors).map(key =>(
            <p key={key}>{errors[key][0]}</p>
        ))}
            </div> }
            <input ref={nameRef} type="text" placeholder="Full name"/>
            <input ref={emailRef} type="email" placeholder="Email Address"/>
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input ref={passwordConfirmRef} type="password" placeholder="Password Confirmation" />
            <button type="submit" className="btn btn-block">Sign up</button>
            <p className="message">
                Already Registered? <Link to='/login'>Sign In</Link>
            </p>
        </form>
            </div>
        </div>
    )
}