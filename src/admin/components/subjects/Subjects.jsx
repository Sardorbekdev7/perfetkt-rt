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


const Subjects = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [sub, setSub] = useState([])
    const [shortname, setShortname] = useState('')
    const [options,setOptions] = useState([]);
    const [selected,setSelected] = useState([])
    //for theme
    const [themeName,setThemeName] = useState("");
    const [themeNum,setThemeNum] = useState(0);
    const [themeOptions,setThemeOptions] = useState([])
    const [selectedSubject,setselectedSubject] = useState("")
    const [openTheme, setOpenTheme] = useState(false);
    const token = cookies.get('token')

    const postSubject = () => {
        console.log(selected)
        axios.post(`${api}/admin/add-subject`, {
            subject_name: name,
            short_name: shortname,
            teachers: selected
        }, {
            headers: {
              'x-auth-token-admin': `${token}`
            }
        }).then((res) => {
            getSubjects()
        })
    }

    const postSubjectTheme = () => {
        axios.post(`${api}/admin/add-theme`, {
            name: themeName,
            themeNum,
            subject_id: selectedSubject
        }, {
            headers: {
              'x-auth-token-admin': `${token}`
            }
        }).then((res) => {
            getSubjects()
        })
    }
    
    const getTeachers = () =>{
        axios.get(`${api}/admin/home`,{
            headers: {
                'x-auth-token-admin': `${token}`
            }
        }).then((res)=>{
            let options = []
            res.data.passwords.map((item,key)=>{
                options.push({
                    label: item.full_name,
                    value: item._id
                })
            })
            setOptions(options)
        })
    }
    const deleteSubject = (id) => {
        axios.delete(`${api}/admin/delete-subject/${id}`, {
            headers: {
              'x-auth-token-admin': `${token}`
            }
        }).then((res) => {
            getSubjects()
        })
    }
    const getSubjects = async () => {
        let response = await axios.get(`${api}/subjects/all`)
        let  options = [];
        response.data.map((item,key)=>{
            options.push({
                label: item.subject_name,
                value: item._id
            })
        })
        setThemeOptions(options)
        setSub(response.data)
        return response.data
    }
    const postDataTheme = () =>{
        postSubjectTheme();
        setOpenTheme(false);
        setThemeName("");
        setThemeNum(0)

    }
    const postData = () => {
        console.log(selected)
        postSubject()
        setOpen(false)
        setName('')
        setShortname('')
    }

    useEffect(() => {
      getSubjects();
      getTeachers()
    }, [])
    

     
    
    return (
        <div className="adminteacher">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}} className="teachertitle">
                <h1>Fanlar</h1>
                <Button type="primary" onClick={() => {getTeachers();setOpen(true)}} >Fanlar qo'shish</Button>
            </div>
         <div className="teachertable">
            <table style={{width: '100%', border: 'gray 1px solid'}}>
                <thead style={{border: 'gray 1px solid'}}>
                    <tr style={{backgroundColor: 'gray'}}>
                        <th>N</th>
                        <th>Nomi</th>
                        <th>Qisqa nomi</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {sub.length != 0 ? sub.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.subject_name}</td>
                            <td>{item.short_name}</td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteSubject(item._id)} >O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody>
            </table>
        </div>
        <Modal
        title="Fan qo'shish"
        centered
        open={open}
        onOk={() => postData()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Fan nomi</p>
                <Input placeholder="Fan nomi" onChange={(e) => setName(e.target.value)} value={name} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Qisqa nomi</p>
                <Input placeholder="Fanning qisqa nomi"  onChange={(e) => setShortname(e.target.value)} value={shortname} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>O'qituvchilarni tanlash</p>
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="O'qituvchilarni tanlang"
                    options={options}
                    onChange={(val)=>setSelected(val)}
                    />
            </Col> 
        </Row>
        </Modal>
        
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: "40px"}} className="themettle">
                <h1>Mavzular ro'yxati</h1>
                <Button type="primary" onClick={() => {getTeachers();setOpenTheme(true)}} >Yangi mavzu qo'shish</Button>
            </div>   
        <Modal
        title="Mavzu qo'shish"
        centered
        open={openTheme}
        onOk={() => postDataTheme()}
        onCancel={() => setOpenTheme(false)}
        width={1000}
      >
        <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Mavzu nomi</p>
                <Input placeholder="Mavzu nomi" onChange={(e) => setThemeName(e.target.value)} value={themeName} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Qisqa nomi</p>
                <Input placeholder="Mavzu tartibi"  type='number' onChange={(e) => setThemeNum(e.target.value)} value={themeNum} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Fanni tanlash</p>
                <Select
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Fanni tanlang"
                    options={themeOptions}
                    onChange={(val)=>{setselectedSubject(val)}}
                    />
            </Col> 
        </Row>
        </Modal>    
        </div>
        
        
    )
}

export default Subjects