import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies()

const Subteacher = ()=>{
    const token = cookies.get('token');
    const [teachers,setTeachers] = useState([]);
    const [teacher,setTeacher] = useState("");
    const [profile,setProfile] = useState({});
    const [resources,setResources] = useState([]);
    const [subjects,setSubjects] = useState([]);
    const [subject,setSubject] = useState("")
    const [allSubjects,setAllSubjects] = useState([])
    const addSubject = ()=>{
        axios.get(`${api}/admin/add_subject/${subject}/${profile._id}`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        })
    }
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
            axios.get(`${api}/subjects/all`).then((res)=>{
                setAllSubjects(res.data)
            })
        })
    }
    const getTeacherInfo = (username)=>{
        axios.get(`${api}/teachers/profile/${username}`).then(res=>{
            getResources();
            setProfile(res.data)
        })
    }
    const getResources = () =>{
        console.log(teacher)
        axios.get(`${api}/admin/getResources/${teacher}`,{
            headers: {
                'x-auth-token-admin': `${token}`
            } 
        }).then((res)=>{
            console.log(res.data)
            setResources(res.data.resources);
            setSubjects(res.data.subjects);
        })
    }
    const deleteBook = (_id)=>{
        axios.delete(`${api}/admin/delete-book/${_id}`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        }).then((res)=>{
            getTeachers()
        })
    }
    const deleteResource = (id)=>{
        axios.delete(`${api}/admin/delete-resource/${id}`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        })
    }
    const deleteArticle = (_id)=>{
        axios.delete(`${api}/admin/delete-article/${_id}/`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        }).then((res)=>{
            getTeachers()
        })
    }
    const removeSubject = (_id)=>{
        console.log(profile)
        axios.get(`${api}/admin/remove_subject/${_id}/${profile._id}`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        })
    }
    useEffect(()=>{
        getTeachers();
    },[])
    return(
        <div style={{gap: '10px'}}>
            <h1 style={{marginBottom: '10px'}}>O'qituvchini tanlang</h1>
            <Select
                    allowClear
                    style={{
                        width: '100%',marginBottom: '10px'
                    }}
                    placeholder="O'qituvchilarni tanlang"
                    options={teachers}
                    onChange={(val)=>{setTeacher(val);}}
                    />
            <Button  type="primary" onClick={() => {setProfile(null);getTeacherInfo(teacher);}} style={{marginBottom: '10px'}} >Ma'lumot</Button>
            <h2>Yuklangan adabiyotlar</h2>
            {profile?
            <div>
                <h3>Kitoblar</h3>
                <div className="books">
                <ul>
                {profile.books&&profile.books.length!=0?profile.books.map((item,key)=>(
                    <li>{item.name} - <Button onClick={()=>{deleteBook(item._id)}}>Delete</Button></li>
                )):<>Kitoblar mavjud emas</>}
                </ul>
                </div>
                <h3>Maqolalar</h3>
                <div className="books">
                {profile.books&&profile.books.length!=0?profile.articles.map((item,key)=>(
                    <li>{item.title} - <Button onClick={()=>{deleteArticle(item._id)}}>Delete</Button></li>
                )):<>Maqolalar mavjud emas</>}
                </div>
            </div>
            :<p>Ma'lumot yuklanmoqda</p>}
            <h2>Yuklangan fan resurslari</h2>
            <table>
                    <thead>
                        <th>№</th>
                        <th>Nomi</th>
                        <th>Mavzu</th>
                        <th>Fan</th>
                        <th>Fan turi</th>
                        <th>Resurs turi</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                    {resources&& resources.length?resources.map((item,key)=>(
                        <tr>
                            <td>{key+1}</td>
                            <td>{item.name}</td>
                            <td>{item.theme.name}</td>
                            <td>{item.subject.subject_name}</td>
                            <td>{item.subject_type}</td>
                            <td>{item.resource_type}</td>
                            <td><Button onClick={()=>{deleteResource(item._id)}}>Delete</Button></td>
                        </tr>
                   )):<tr><td colSpan={7}>Resurslar mavjud emas</td></tr>}
                    </tbody>
                </table>
            <div>
            <h2>Fanlar ro'yxati</h2>
            <table>
                <thead>
                <th>№</th>
                <th>Nomi</th>
                <th>Qisqa nomi</th>
                <th>Semester</th>
                <th>Action</th>
                </thead>
                <tbody>
                    {subjects?subjects.map((item,key)=>(
                        <tr>
                            <td>{key+1}</td>
                            <td>{item.subject_name}</td>
                            <td>{item.short_name}</td>
                            <td>{item.semester}</td>
                            <td><Button onClick={()=> {removeSubject(item._id)}}>Remove</Button></td>
                        </tr>
                    ))
                    :<tr><td colSpan={5}></td></tr>}
                </tbody>
            </table>
            <Select
            allowClear
            style={{
                width: '100%',marginBottom: '10px'
            }}
            placeholder="Fan tanlang"
            options={allSubjects.map((subject)=>{return {label: subject.subject_name,value: subject._id}})}
            onChange={(val)=>{setSubject(val);}}
            />
            <Button onClick={addSubject}>Add subject</Button>
            </div>
        </div>
    )
}
export default Subteacher