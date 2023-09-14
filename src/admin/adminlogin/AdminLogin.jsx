import axios from 'axios'
import Cookies from 'universal-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../helps/api'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const cookies = new Cookies()

  const LoginAdmin = () => {
    axios.post(`${api}/auth/signin/admin`, {username, password}).then((res) => {
      cookies.set('token', res.data.token)
      console.log(res);
    })
  }

  return (
    <div className='login'>
      <h1>Kirish</h1>
      <div className='login-inputs'>
        <div>
          <p>Login</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className='login-button'>
        <button onClick={LoginAdmin}>
          <Link to={'/admin'}>
            Kirish
          </Link>
        </button>
      </div>
    </div>
  )
}

export default AdminLogin;