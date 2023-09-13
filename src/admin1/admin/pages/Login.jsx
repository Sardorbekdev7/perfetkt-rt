import React, { useEffect, useState } from 'react';
import { loginRequest } from '../../host/Config';
import { useStore } from '../../store/Store';
import '../css/Login.css'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';

export default function Login(){
    const {setLogin}=useStore(state=>state)
    const [cookies, setCookie] = useCookies(['token']);
    const [userName, setUserName]=useState('')
    const [password, setPassword]=useState('')
    const loginFunc=()=>{
        loginRequest(userName, password).then(res=>{
          if(res.data.token){
setCookie('token', res.data.token, {
    maxAge:7200
 })
                setLogin(true)
                
          }
        })
    }
    
    return(
        <div className="loginBox">
        <div className="container ">
	<div className="screen">
		<div className="screen__content">
			<form className="login">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" className="login__input" placeholder="Login"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="login__input" placeholder="Parol"/>
				</div>
				<button type="button" onClick={loginFunc} className="button login__submit">
					<span className="button__text">Kirish</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</div>
    
    )
}