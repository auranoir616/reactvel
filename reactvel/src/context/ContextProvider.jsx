import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
//nilai default context yang akan digunakan
const StateContext =  createContext({
    user: null,
    token: null,
    notification: null,
    setUser: ()=>{},
    setToken: ()=>{},
    setNotification: () =>{}
})
//ngsi yang bertanggung jawab untuk menentukan nilai terbaru dari StateContext yang telah Anda definisikan sebelumnya
export const ContextProvider = ({children})=>{
    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setNotification = (message) =>{
        _setNotification(message);
        setTimeout(()=>{
            _setNotification('')
        },5000)
    }
    const setToken =(token) =>{
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
            </StateContext.Provider>
    )
}
    ContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
}
export const UseStateContext =()=>useContext(StateContext)