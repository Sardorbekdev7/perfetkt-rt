import { Button, Col, Input, Modal, Row, Select, Table, Tag } from "antd"
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { api, getData } from "../../../helps/api";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Teachers = () => {
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([])
    const [full_name, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [position, setPosition] = useState('')
    const [options,setOptions] = useState([]);
    const [selected,setSelected]= useState([])
    const token = cookies.get('token')

    const getSubjects = async () => {
        let response = await axios.get(`${api}/subjects/all`)
        let options = []
        response.data.map((item, key) => {
            options.push({label: item.subject_name, value: item._id})
        })
        setOptions(options)
        return response.data

    }
    const getTeachers = () => {
        axios.get(`${api}/admin/home`, {
            headers: {
              'x-auth-token-admin': `${token}`
            }
        } ).then(res => {
            setTeachers(res.data.passwords)
        })
    }
    const postTeachers = () => {
        axios.post(`${api}/admin/add-teacher`, {full_name, username, password, position, subjects: selected} ,{
            headers: {
              'x-auth-token-admin': `${token}`
            }
        } ).then(res => {
            message.success('Muvaffaqiyatli')
        }).catch(() => {
            message.error('Xatolik')
        })
        getTeachers()
    }
    const deleteTeacher = (id) => {
        axios.delete(`${api}/admin/delete-teacher/${id}`, {
            headers: {
              'x-auth-token-admin': `${token}`
            }
        }).then((res) => {
            message.success("Muvaffiqiyatli")
        }).catch((err) => {
            message.error("Xatolik")
        })
        getTeachers()
        
    }
    const postData = () => {
        postTeachers()
        setOpen(false)
        setFullname('')
    }
    useEffect(() => {
       getTeachers(); 
    }, [open])
    return (
        <div className="adminteacher">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}} className="teachertitle">
                <h1>O'qituvchilar</h1>
                <Button type="primary" onClick={() => { getSubjects(); setOpen(true)}} >O'qituvchi qo'shish</Button>
            </div>
        <div className="teachertable">
        <table style={{width: '100%', border: 'gray 1px solid'}}>
                <thead style={{border: 'gray 1px solid'}}>
                    <tr style={{backgroundColor: 'gray'}}>
                        <th>N</th>
                        <th>Fullname</th>
                        <th>Parol</th>
                        <th>Lavozim</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.length != 0 ? teachers.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.full_name}</td>
                            <td>{item.temp_password}</td>
                            <td>{item.position}</td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteTeacher(item._id)}>O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody>
            </table>
        </div>
        <Modal
        title="O'qituvchilar qo'shish"
        centered
        open={open}
        onOk={() => postData()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>FIO</p>
                <Input placeholder="FIO" onChange={(e) => setFullname(e.target.value)} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Username</p>
                <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Parol</p>
                <Input placeholder="Parol" onChange={(e) => setPassword(e.target.value)} />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <p>Lavozim</p>
                <Input placeholder="Lavozim" onChange={(e) => setPosition(e.target.value)} />
            </Col>
             <Col lg={12} md={24} sm={24} xs={24}>
                <p>Fanlar</p>
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Fanlarni tanlang"
                    options={options}
                    onChange={(val)=>setSelected(val)}
                    />
            </Col> 
        </Row>
      </Modal>
        </div>
    )
}


export default Teachers