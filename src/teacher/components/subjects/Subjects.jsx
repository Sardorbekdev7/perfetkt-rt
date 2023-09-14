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
    const [subOptions,setSubOptions] = useState([]);
    const [themeOptions,setThemeOptions] = useState([]);
    const [themeId,setThemeId] = useState("");
    const [resource_name,setResourceName] = useState("");
    const [link,setResourceLink] = useState("");
    const [subject_type,setSubjectType] = useState("");
    const [resource_type,setResourceType] = useState("")
    const [subject_id,setSubjectId] = useState("")
    const [open,setOpen] = useState(false)
    const [resources,setResources] = useState([])
    const token = cookies.get("token")
    
    const getSubjects = ()=>{
        axios.get(`${api}/subjects/me`,{
            headers: {
                "x-auth-token": token
            }
        }).then(res=>{
            console.log(res.data)
            setSubjects(res.data.subjects);
            setResources(res.data.resources)
            let options = [];
            res.data.subjects.map((item)=>{
                options.push({label: item.subject_name,value: item._id})
            })
            setSubOptions(options);
        })
    }

    const deleteResource = (id)=>{
        axios.delete(`${api}/subjects/delete-resource/${id}`,{
            headers: {
                "x-auth-token": token
            }
        }).then((res) => {
            message.success("Muvaffiqiyatli")
        }).catch((err) => {
            message.error("Xatolik")
        })
        getSubjects()
    }

    const addResource = ()=>{
        axios.post(`${api}/subjects/add-resource`,{
            theme_id: themeId,
            name: resource_name,
            link,
            resource_type,
            subject_type,
            subject_id
        },{
            headers: {
                "x-auth-token": token
            }
        }).then((res) => {
            message.success("Muvaffiqiyatli")
        }).catch((err) => {
            message.error("Xatolik")
        })
    }

    useEffect(()=>{
        getSubjects()
    }, [open]);

    return (
        <>
        <Row>
        <Col style={{
            marginTop: "10px"
        }} lg={12} md={24} sm={24}>
            <h4>Mening fanlarim: </h4>
            <Select
            placeholder="Fanni tanlang"
            options={subOptions}
            style={{
                width: "100%"
            }}
            onChange={(val)=>{
                let [subject] = subjects.filter((e)=>e._id==val)
                let theme = []
                setSubjectId(val)
                subject.themes.map((item)=>{
                    theme.push({label: item.name,value: item._id})
                })
                setThemeOptions(theme)
            }}
            title='Subject'
        />
        </Col>
        <Col style={{
            marginTop: "10px"
        }} lg={12} md={24} sm={24}>
            <h4>Mavzular: </h4>
            <Select
            placeholder="Fan mavzusini tanlang"
            options={themeOptions}
            style={{
                width: "100%"
            }}
            onChange={(val)=>{
                setThemeId(val);
            }} 
        />
        </Col>
        <Col style={{
            marginTop: "10px"
        }} lg={12} md={24} sm={24}>
            <Button disabled={!themeId.length} type='primary' onClick={()=>{setOpen(true)}}>Resurs qo'shish</Button>
        </Col>
        </Row>
        <Row style={{
            marginTop: 30
        }}>
            <Col lg={24}>
                <h2>Mening resurslarim</h2>
                <table style={{width: '100%'}} >
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
                    {resources?resources.map((item,key)=>(
                        <tr>
                            <td>{key+1}</td>
                            <td>{item.name}</td>
                            <td>{item.theme.name}</td>
                            <td>{item.subject.subject_name}</td>
                            <td>{item.subject_type}</td>
                            <td>{item.resource_type}</td>
                            <td><Button danger onClick={()=>{deleteResource(item._id)}}>Delete</Button></td>
                        </tr>
                   )):<>Resurslar mavjud emas</>}
                    </tbody>
                </table>
            </Col>
        </Row>
        <Modal title="Resurs qo'shish"
        centered
        open={open}
        onOk={()=>{addResource();setOpen(false)}}
        onCancel={() => setOpen(false)}
        width={1000}>
            <Row>
                <Col style={{
                    padding: 5
                }} lg={12} md={24} sm={24}>
                <h4>Fan turini tanlang</h4>
                <Select
                placeholder="Fan turini tanlang"
                onChange={(val)=>{setSubjectType(val)}}
                style={{
                  width: 200  
                }}
                options={[
                    {label: "Ma'ruza", value: "Ma'ruza"},
                    {label: "Amaliyot", value: "Amaliyot"},
                    {label: "Labaratoriya", value: "Labaratoriya"},
                ]}
                /></Col>
                <Col style={{
                    padding: 5
                }} lg={12} md={24} sm={24}>
                <h4>Resurs turini tanlang</h4>
                <Select
                onChange={(val)=>{setResourceType(val)}}
                placeholder="Resurs turini tanlang"
                style={{
                  width: 200  
                }}
                options={[
                    {label: "Taqdimot", value: "Taqdimot"},
                    {label: "Videodars", value: "Videodars"},
                    {label: "Leksiya", value: "Leksiya"},
                    {label: "Maqola", value: "Maqola"},
                    {label: "Kitob", value: "Kitob"},
                ]}
                /></Col>
                <Col style={{
                    padding: 5
                }} lg={12} md={24} sm={24}>
                    <h4>Resurs nomi: </h4>
                    <Input type='text' placeholder='Resurs nomi...' onChange={(e)=>setResourceName(e.target.value)}/>
                </Col>
                <Col style={{
                    padding: 5
                }} lg={12} md={24} sm={24}>
                <h4>Resurs uchun havola: </h4>
                    <Input type='text' placeholder='Resurs uchun havola...' onChange={(e)=>setResourceLink(e.target.value)}/>
                </Col>
            </Row>
            
        </Modal>
        </>
    )
}

export default Subjects