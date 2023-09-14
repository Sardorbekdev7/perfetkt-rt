import { Button, Col, Input, Modal, Row, Select, Table,Space } from 'antd';
import { useEffect, useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from 'react-query';
import { api } from '../../../helps/api';
import axios from 'axios';
import { useAuthStore } from '../../../store/auth.store';
import Cookies from 'universal-cookie';


const cookies = new Cookies()


const Subjects = () => {
    const [subjects,setSubjects] = useState([]);
    const [subOptions,setSubOptions] = useState([])
    const [themeOptions,setThemeOptions] = useState([])
    const token = cookies.get("token")
    const getSubjects = ()=>{
        axios.get(`${api}/subjects/me`,{
            headers: {
                "x-auth-token": token
            }
        }).then(res=>{
            console.log(res.data.subjects)
            setSubjects(res.data.subjects)
            let options = [];
            res.data.subjects.map((item)=>{
                options.push({label: item.subject_name,value: item._id})
            })
            setSubOptions(options)

        })
    }
    useEffect(()=>{
        getSubjects()
    },[]);
    return (
        <>
        Hello {subjects.length}
         <Space/>
        <Select
            options={subOptions}
            style={{
                width: 120
            }}
            onChange={(val)=>{

            }}
        />
        </>
    )
}

export default Subjects