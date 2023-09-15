import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import { useAuthStore } from '../../../store/auth.store';
import Cookies from 'universal-cookie';
import {Button,Col,Form,Input, Modal, Row, Upload} from "antd"
import TextArea from 'antd/es/input/TextArea';

const cookies = new Cookies()

const News = ()=>{
    const token = cookies.get('token');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', desc)
    

      const postNews = async () => {
        const response = await axios.post(`${api}/news/create`, formData, {
          headers: {
            'x-auth-token-admin': `${token}`
          }
      }).then((res) => setNews(res.data))

      }

      const getNews = async () => {
        const response = await axios.get(`${api}/news/all`).then((res => {
        }))
      }

      const postData = () => {
        postNews()
        setOpen(false)
        setTitle('')
        setDesc('')
      }

      useEffect(() => {
      }, [open])


      useEffect(() => {
        getNews()
      }, [])
      
      

    return(
       <>
        <div>
            <div className="create-news" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}} >
            <h1>Yangiliklar sahifasi</h1>
                <Button type="primary" onClick={() => setOpen(true)} >Yangilik qo'shish</Button>
            </div>
            <div>
            <table style={{width: '100%', border: 'gray 1px solid'}}>
                <thead style={{border: 'gray 1px solid'}}>
                    <tr style={{backgroundColor: 'gray'}}>
                        <th>N</th>
                        <th>Title</th>
                        <th>Izoh</th>
                        <th>Rasm</th>
                        <th>Fayl</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {sub.length != 0 ? sub.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.subject_name}</td>
                            <td>{item.short_name}</td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteSubject(item._id)} >O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody> */}
            </table>
            </div>
       </div>
       <Modal
       title="Yangiliklar qo'shish"
       centered
       open={open}
       onOk={() => postData()}
       onCancel={() => setOpen(false)}
       width={1000}
       >
        <Row>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Title</p>
                <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Izoh</p>
                <TextArea  placeholder="Izoh" onChange={(e) => setDesc(e.target.value)} value={desc} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Rasm</p>
                <input type="file" name="" id="" onChange={(e) => {formData.append('preview_pic', e.target.files[0])}} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Fayl</p>
                <input type="file" name="" id=""  onChange={(e) => formData.append('body', e.target.files[0])}  />
            </Col>
        </Row>
       </Modal>
       </>
    )
}
export default News

