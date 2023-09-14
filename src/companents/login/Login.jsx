import axios from 'axios'
import './style/style.css'
import { api } from '../../helps/api'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { message } from 'antd'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const cookies = new Cookies()

  const LoginAdmin = () => {
    axios.post(`${api}/auth/signin/`, {username, password}).then((res) => {
      const  data  = res.data.token
                if (data) {
                    cookies.set('token', res.data.token)
                    navigate('/my')
                    console.log(res);
                } 
    }).catch((err) => {
      message.error("Bunday foydalanuvchi topilmadi!")
    })
  }


 

  return (
    <div className='login'>
      <h1>Kirish</h1>
      <form className='login-inputs'>
        <div>
          <p>Login</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </form>
      <div className='login-button'>
        <button onClick={LoginAdmin} type='button'>
            Kirish
        </button>
      </div>
    </div>
  )
}

export default Login;
