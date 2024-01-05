import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { UseStateContext } from "../context/ContextProvider";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const {setNotification} = UseStateContext()
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    if(user.id){
        axiosClient.put(`/users/${user.id}`,user)
        .then(()=>{
          setNotification('User was successfully Updated')
            navigate('/users')
        })
        .catch(err=>{
            console.log(err)
            const response = err.response
            if(response && response.status === 422){
               setErrors(response.data.errors)
            }
        })
    }else{
        axiosClient.post('/users',user)
        .then(()=>{
          setNotification('User was successfully Created')
            navigate('/users')
        })
        .catch(err=>{
            console.log(err)
            const response = err.response
            if(response && response.status === 422){
               setErrors(response.data.errors)
            }
        })
    }
  }
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && 
        <form onSubmit={onSubmit}>
            <input value={user.name} onChange={e => setUser({...user, name: e.target.value})} type="text" placeholder="name" />
            <input value={user.email} onChange={e => setUser({...user, email: e.target.value})} type="email" placeholder="email" />
            <input onChange={e => setUser({...user, password: e.target.value})} type="password" placeholder="password" />
            <input onChange={e => setUser({...user, password_confirmation: e.target.value})} type="password" placeholder="password Confirmation" />
            <button type="submit" className="btn">submit</button>
            </form>}
      </div>
    </>
  );
}
