import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import { useAuthStore } from '../../../store/auth.store';
import Cookies from 'universal-cookie';
import {Button,Form,Input} from "antd"

const cookies = new Cookies()

const News = ()=>{
    const token = cookies.get('token');
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    return(
       <>
        <div>
            <h1>Yangiliklar sahifasi</h1>

            <div className="create-news">
                <h2>Yangilik qo'shish</h2>
            </div>
       </div>
       </>
    )
}
export default News