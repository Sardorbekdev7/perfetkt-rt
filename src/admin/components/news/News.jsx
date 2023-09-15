import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import { useAuthStore } from '../../../store/auth.store';
import Cookies from 'universal-cookie';
import {Button,Col,Form,Input, Modal, Row, Upload, Image, DatePicker} from "antd"
import TextArea from 'antd/es/input/TextArea';
import { setQuarter } from 'date-fns';

const cookies = new Cookies()

const News = ()=>{
    const token = cookies.get('token');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState('')
    const [news, setNews] = useState([])
    const [fileIn,setFileIn] = useState()
    const handleChange = (e)=>{
        if(!e.target.files){
            return
        }
        setFileIn(e.target.files[0])
    }

    const handleFileChange = (e)=>{
        if(!e.target.files){
            return
        }
        setFile(e.target.files[0])
    }

    const formData = new FormData()

    formData.append('title', title)
    formData.append('createdAt', date)
    formData.append('body', file)
    formData.append('preview_pic',fileIn)
    formData.append('description', desc)

      const postNews = async () => {
        const response = await axios.post(`${api}/news/create`, formData, {
          headers: {
            'x-auth-token-admin': `${token}`
          }
      }).then((res) => {
        getNews()
      })

      }

      const getNews = async () => {
        const response = await axios.get(`${api}/news/all`).then((res => {
            setNews(res.data)
        }))
      }

      const postData = () => {
        setOpen(false)
        setTitle('')
        setDate('')
        setFile('')
      }

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
                        <th>Rasm</th>
                        <th>Fayl</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {news.length != 0 ? news.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.title}</td>
                            <td><Image src={item.preview_pic} width={100} height={100} /></td>
                            <td><a href={item.body}>Yuklab olish</a></td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteSubject(item._id)} >O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody>
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
                <Input placeholder="Izoh" onChange={(e) => setDesc(e.target.value)} value={desc} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Sana</p>
                <DatePicker onChange={(val)=>{setDate(val)}} value={date}  />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Rasm</p>
                <input type="file" name="" id="" onChange={handleChange} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Fayl</p>
                <input type="file" name="" id=""  onChange={handleFileChange}  />
            </Col>
        </Row>
       </Modal>
       </>
    )
}
export default News

