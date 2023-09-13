import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
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

const Subteacher = ()=>{
    const token = cookies.get('token');
    const [teachers,setTeachers] = useState([]);
    const [teacher,setTeacher] = useState("");
    const [profile,setProfile] = useState({})
    const getTeachers = ()=>{
        axios.get(`${api}/admin/home`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        }).then(res=>{
            let options = []
            res.data.passwords.map((item)=>{
                options.push({
                    label: item.full_name,
                    value: item.username
                })
            })
            setTeachers(options)
        })
    }
    const getTeacherInfo = (username)=>{
        axios.get(`${api}/teachers/profile/${username}`).then(res=>{
            setProfile(res.data)
        })
    }
    useEffect(()=>{
        getTeachers();
    },[])
    return(
        <>
            <h1>O'qituvchini tanlang</h1>
            <Select
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="O'qituvchilarni tanlang"
                    options={teachers}
                    onChange={(val)=>{setTeacher(val);}}
                    />
            <Button type="primary" onClick={() => {setProfile(null);getTeacherInfo(teacher);}} >Ma'lumot</Button>
            {profile?
            <div>
                <h2>{profile.full_name} - Umumiy ma'lumotlar</h2>
                <h3>Kitoblar</h3>
                <div className="books">
                {profile.books&&profile.books.length!=0?<>...</>:<>Kitoblar mavjud emas</>}
                </div>
                <h3>Maqolalar</h3>
                <div className="books">
                {profile.books&&profile.books.length!=0?<>...</>:<>Maqolalar mavjud emas</>}
                </div>
            </div>
            :<p>Ma'lumot yuklanmoqda</p>}
        </>
    )
}
export default Subteacher