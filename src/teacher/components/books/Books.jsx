import { Button, Col, DatePicker, Input, Modal, Row, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../../../helps/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Books = () => {
    const token = cookies.get('token');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState('')
    const [date, setDate] = useState('')
    const [book, setBook] = useState('')
    const [out_authors,setOutAuthors]=useState([])
    const [tags,setTags]=useState([])
    const [language,setLanguage]=useState('')

    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', desc)
    formData.append('link', file)
    formData.append('language', language)
    formData.append('tags', tags)
    formData.append('out_authors', out_authors)
    formData.append('creationDate', date)

    const postBooks = async () => {
        const response = await axios.post(`${api}/books/add`, formData, {
            headers: {
              'x-auth-token': `${token}`
            }
        } 
        ).then((res) => {
            console.log(res);
        })
    }

    const getBooks = () => {
        axios.get(`${api}/books/all`).then((res) => {
            setBook(res.data)
            console.log(res);
        })
    }

    const postData = () => {
        setOpen(false)
        postBooks()
        setName('')
        setDesc('')
        setFile('')
        setLanguage('')
    }

    useEffect(() => {
      getBooks()
    }, [])
    





  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <h1>Kitoblar</h1>
            <Button type="primary" onClick={() => setOpen(true)} >Kitob qo'shish</Button>
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
                        <th>Rasm</th>
                        <th>Yuklab olish</th>
                        <th>Tahrirlash</th>
                        <th>O'chirish</th>
                    </tr>
                </thead>
                <tbody>
                    {book.length != 0 ? book.map((item, key)=> (
                        <tr style={{border: 'gray 1px solid'}} key={key}>
                            <td>{key + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.creationDate}</td>
                            <td><Button>Tahrirlash</Button></td>
                            <td><Button danger onClick={() => deleteTeacher(item._id)}>O'chirish</Button></td>
                        </tr>
                    )): <></>}
                </tbody>
            </table>
        </div>
        <Modal
        title="Kitob qo'shish"
        centered
        open={open}
        onOk={() => postData()}
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
                    <p>Izoh</p>
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
                    <p>Avtorlar</p>
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
                    <p>Avtorlar</p>
                    <Select
                        mode="tags"
                        style={{
                        width: '100%',
                        }}
                        placeholder="Taglar"
                        onChange={(val)=>{setTags(val)}}
                        options={[]}
                    />

                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Rasm</p>
                    <input type="file" name="" id="" onChange={(e) => {formData.append('preview_pic', e.target.files[0]); console.log(e);}} />
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <p>Fayl</p>
                    <Input type="text" name="" id="" onChange={(e) => {setFile(e.target.value)}} value={file} />
                </Col>
            </Row>
        </Modal>
        </div>
  )
}

export default Books