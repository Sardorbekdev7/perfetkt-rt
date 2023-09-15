import { Button, Col, DatePicker, Image, Input, Modal, Row, Select, Tag, message } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../../../helps/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Articles = () => {
    const token = cookies.get('token');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [article, setArticle] = useState([])
    const [out_authors,setOutAuthors]=useState([]);;
    const [options,setOptions] = useState([])
    const [authors,setAuthors] = useState([])
    const [tags,setTags]=useState([])
    const [language,setLanguage]=useState('')
    const [types,SetTypes] = useState('')
    const [link,setLinks] = useState('')
    const [file,setFile] = useState();
    const [preview_pic,setPreviewpic] = useState()
    const formData = new FormData()

    const handleFile = (e)=>{
        if(!e.target.files){
            return
        }
        setFile(e.target.files[0])
    }
    const handlePreview = (e)=>{
        if(!e.target.files){
            return
        }
        setPreviewpic(e.target.files[0])
    }
    formData.append('title', name)
    formData.append('description', desc)
    formData.append('link', link)
    formData.append('language', language)
    formData.append('tags', JSON.stringify(tags))
    formData.append('out_authors', JSON.stringify(out_authors))
    formData.append('authors', JSON.stringify(authors))
    formData.append('creationDate', date)
    formData.append('type', types)
    formData.append('file',file)
    formData.append('preview_pic',preview_pic)

    const postArticles = () => {
        axios.post(`${api}/articles/add`, formData, {
            headers: {
              'x-auth-token': `${token}`,
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            }
        } 
        ).then((res) => {
            message.success("Maqola muvaffiqiyatli qo'shildi")
        }).catch((err) => {
            message.error("Xatolik")
        })
    }

    const getAuthors = ()=>{
        axios.get(`${api}/teachers/allIds`).then(res=>{
            let options = []
            res.data.teachers.map((item,key)=>{
                options.push({label: item.full_name, value: item._id})
            })
            setOptions(options)
        })
    }

    const getArticles = () => {
        axios.get(`${api}/articles/me`,{
            headers: {
                "x-auth-token": token,
            }
        }).then((res) => {
          setArticle(res.data.articles)
            
        })
    }
    
    const deleteArticles = (id) => {
        axios.delete(`${api}/articles/delete/${id}`, {
            headers: {
                "x-auth-token": token,
            }
        }).then((res) => {
            getArticles()
            message.success("Maqola muvaffiqiyatli o'chirildi")
        }).catch(() => {
            message.error("Xatolik")
        })
    }

    const postData = () => {
      postArticles()
      setOpen(false)
    }


    useEffect(() => {
        getAuthors();
        getArticles();
      
    }, [open])
    


  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <h1>Maqolalar</h1>
            <Button type="primary" onClick={() => setOpen(true)} >Maqola qo'shish</Button>
        </div>
        <div>
        <table style={{width: '100%', border: 'gray 1px solid'}}>
                <thead style={{border: 'gray 1px solid'}}>
                    <tr style={{backgroundColor: 'gray'}}>
                        <th>N</th>
                        <th>Nomi</th>
                        <th>Izoh</th>
                        <th>Yozilgan sanasi</th>
                        <th>Tili</th>
                        <th>Avtorlari</th>
                        <th>Tags</th>
                        <th>Rasm</th>
                        <th>Yuklab olish</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {article.length != 0 ? article.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.creationDate}</td>
                            <td>{item.language}</td>
                            <td>{item.out_authors.map((at,key) => (<p>{at}</p>))}</td>
                            <td>{item.tags.map((at) => (<Tag>{at}</Tag>))}</td>
                            <td><Image width={200} src={`${item.preview_pic}`} /></td>
                            <td><a href={`${item.link}`} target="_blank" rel="noopener noreferrer">Download</a></td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteArticles(item._id)}>O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody>
            </table>
        </div>
        <Modal
        title="Maqola qo'shish"
        centered
        open={open}
        onOk={() =>{ postData()}}
        onCancel={() => setOpen(false)}
        width={1000}
        >
            <Row>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Kitob nomi</p>
                    <Input placeholder="Kitob nomi" onChange={(e) => setName(e.target.value)} value={name} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Izoh</p>
                    <Input placeholder="Izoh" onChange={(e) => setDesc(e.target.value)} value={desc} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Maqola yozilgan vaqt</p>
                    <DatePicker onChange={(val)=>{setDate(val)}} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Tili</p>
                    <Select
                        style={{
                        width: '100%',
                        }}
                        onChange={(val)=>{setLanguage(val)}}
                        options={[
                            {
                                value: 'uz',
                                label: "O'zbek"
                            },
                            {
                                value: 'ru',
                                label: 'Rus tili'
                            },
                            {
                                value: 'en',
                                label: 'Ingliz tili'
                            },
                        ]}
                    />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Maqola turi</p>
                    <Select
                        style={{
                        width: '100%',
                        }}
                        onChange={(val)=>{SetTypes(val)}}
                        options={[
                            {
                                value: 'scopus',
                                label: "Scopus"
                            },
                            {
                                value: 'local',
                                label: 'Mahalliy'
                            },
                            {
                                value: 'international',
                                label: 'Xalqaro'
                            },
                        ]}
                    />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Tizimda mavjud bo'lgan mualliflar</p>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                        width: '100%',
                        }}
                        placeholder="Mualliflar"
                        onChange={(val)=>{setAuthors(val)}}
                        options={options}
                    />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Tizimda mavjud bo'lmagan mualliflar</p>
                    <Select
                        mode="tags"
                        style={{
                        width: '100%',
                        }}
                        placeholder="Mualliflar"
                        onChange={(val)=>{setOutAuthors(val)}}
                        options={[]}
                    />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Kalit so'zlar</p>
                    <Select
                        mode="tags"
                        style={{
                        width: '100%',
                        }}
                        placeholder="Kalit so'zlar"
                        onChange={(val)=>{setTags(val)}}
                        options={[]}
                    />

                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Rasm</p>
                    <Input type="file" name="" id="" onChange={handlePreview} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Fayl</p>
                    <Input type="file" name="" id="" onChange={handleFile} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Batafsil ma'lumot uchun link</p>
                    <Input type="text" name="" id="" onChange={(e) => {setLinks(e.target.value)}} />
                </Col>
            </Row>
        </Modal>
        </div>
  )
}

export default Articles