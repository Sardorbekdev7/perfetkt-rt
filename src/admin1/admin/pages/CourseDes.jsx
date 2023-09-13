import { Button, Col, Form, Input, Modal, Row, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import {BsEyeFill} from 'react-icons/bs'
import { delDes, getCourse, getDes, postDes, putDes } from '../../host/Config';
import { useCookies } from 'react-cookie';
import {TbEdit} from 'react-icons/tb'
import {MdDelete} from 'react-icons/md'
import ReactQuill from 'react-quill';
import { useStore } from '../../store/Store';

export default function CourseDes() {
  const [data, setData] = useState(null)
  const [modal, setModal]=useState(false)
  const [desModal, setDesModal] = useState(true)
  const [cookei, setCookie] = useCookies()
  const [sel_data, setSel_data]=useState(null)
  const [course, setCourse] = useState(null)
  const [description_uz, setdescription_uz]=useState('')
  const [description_ru, setdescription_ru]=useState('')
  const [description_en, setdescription_en]=useState('')
  const [change, setChange] = useState(null)
  const [form] = Form.useForm()
  const setLoader=useStore(state=>state.setLoader)
  
  
  const getDesData = () =>{
    getDes(cookei.token).then(res => {
      setData(res.data)
      setLoader(false)
    })

  }

  const editData=(id)=>{
    setChange(id.id)
    setDesModal(false)
    form.setFieldsValue(id)

  }

  const deleteData=(res)=>{
    setLoader(true)
    delDes(cookei.token, res).then(res => {
      message.success("Ma'lumot o'chirildi")
      getDesData()
    }).catch(res => {
      setLoader(false)
      message.error("Ma'lumot o'chirilmadi")
    })
  }
  useEffect(() => {
    getDesData()
    getCourse(cookei.token).then(res => {
      setCourse(res.data)
    })
  }, []);

  const handClose =()=>{
    setDesModal(true)
  }

  const onFinish = (event) => {
    setLoader(true)
    
    if(change === null) {
      postDes(cookei.token, event).then(res => {
        message.success("Ma'lumot saqlandi")
        handClose()
        getDesData()
      }).catch(err => {
        setLoader(false)
        message.error("Ma'lumot saqlanmadi")
      })
    } else {
      putDes(cookei.token, event, change).then(res => {
        message.success("Ma'lumot o'zgartirildi")
        handClose()
        getDesData()
      }).catch( err => {
        setLoader(false)
        message.error("Mal'lumot o'zgartirilmadi")
      })
    }
    
  }
    
  const column = [
    {
      title: '#',
      key: '#',
      render:(text, res, index)=>{
        return(index+1)
    },
    },
    {
      title: 'Nomi (uz)',
      key: 'name_uz',
      dataIndex: 'name_uz',
    },
    {
      title: 'Nomi (en)',
      key: 'name_en',
      dataIndex: 'name_en',
    },
    {
      title: 'Nomi (ru)',
      key: 'name_ru',
      dataIndex: 'name_ru',
    },
    {
      title:"Matn",
      key:'text',
      dataIndex:'id',
      render:(id, res)=>{
          return(
          <div className='table_btns'>
          <Button type="primary"
          onClick={()=>{setModal(true);setSel_data(res);}}
          ><BsEyeFill size={"1.3em"}/></Button></div>)
      }
      
  },
  {
      title:"O'zgartirish",
      key:'edit',
      dataIndex:"id",
      render:(res, objc)=>{
          return(<Button  onClick={()=>{editData(objc)}} type='primary'><TbEdit  size={"1.3em"}/></Button>)
      }
      
  },
  {
      title:"O'chirish",
      key:'delete',
      dataIndex:"id",
      render:(res)=>{
          return(<Button type='primary' onClick={()=>{deleteData(res)}} danger><MdDelete  size={"1.3em"}/></Button>)
      }
      
  }
  ]
  return (
    <div className='adminBox'>
      {desModal?<>
      <div className='admin_btns'>
                <Button style={{marginBottom:'20px'}} onClick={()=>setDesModal(false)} type='primary'>Izoh qo'shish</Button>
      </div>
      <Table 
      columns={column}
      dataSource={data}
      />
      </>
      :
      <Form
      form={form}
      name="basic"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}
  
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
      >
        <div className='admin_btns'>
<Button style={{marginBottom:'20px'}} onClick={()=>setDesModal(true)} type='primary'>Orqaga</Button>
<Button style={{marginLeft:'20px', backgroundColor:"#00a900"}} type="primary" htmlType="submit"> Saqlash</Button>
</div>
        <Row>
        <Col style={{padding:'0px 20px'}} lg={12} md={24}>
    <Form.Item
      label="Nomi (uz)"
      name="name_uz"
      rules={[
        {
          required: true,
          message: "Bu maydonni to'ldirish shart",
        },
      ]}
    >
      <Input />
    </Form.Item>
   
        </Col>
        <Col style={{padding: '0px 20px'}} lg={12} md={24} >
          <Form.Item
          label="Nomi (en)"
          name="name_en"
          rules={[
            {
              required: true,
              message: "BU maydonni to'ldirish shart",
            }
          ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col style={{padding: '0px 20px'}} lg={12} md={24} >
        <Form.Item
        label='Nomi (ru)'
        name="name_ru"
        rules={[
          {
            required: true,
            message: "Bu maydonni to'ldirish shart",
          }
        ]}
        >
          <Input/>
        </Form.Item>
        </Col>
        <Col style={{padding:'0px 20px'}} lg={8} md={24}>
        <Form.Item
      label="Kurs turi"
      name="course"
      initialValue={course!==null && course.length!==0?course[0].id:null}
      rules={[
        {
          required: true,
          message: "Bu maydonni to'ldirish shart",
        },
      ]}
    >
<Select>
    {course!==null?course.map((item, key)=>{
        return(<Select.Option key={key} value={item.id}>{item.name_uz}</Select.Option>)
    }):<></>}
        </Select>

    </Form.Item>
        </Col>
        <Col style={{padding: '0px 20px'}} lg={24} md={24}>
          <Form.Item
          label='Izoh (uz)'
          name='description_uz'
          rules={[
            {
              required: true,
              message: "Bu maydonni to'ldirish shart",
            }
          ]}
          >
            <ReactQuill style={{height:'200px', fontSize:'16px'}} theme="snow" value={description_uz} onChange={setdescription_uz} />
          </Form.Item>
        </Col>
        <Col style={{padding: '20px 20px'}} lg={24} md={24}>
          <Form.Item
          label='Izoh (en)'
          name='description_en'
          rules={[
            {
              required: true,
              message: "Bu maydonni to'ldirish shart",
            }
          ]}
          >
            <ReactQuill style={{height:'200px', fontSize:'16px'}} theme="snow" value={description_en} onChange={setdescription_en} />
          </Form.Item>
        </Col>
        <Col style={{padding: '0px 20px'}} lg={24} md={24}>
          <Form.Item
          label='Izoh (ru)'
          name='description_ru'
          rules={[
            {
              required: true,
              message: "Bu maydonni to'ldirish shart",
            }
          ]}
          >
            <ReactQuill style={{height:'200px', fontSize:'16px'}} theme="snow" value={description_ru} onChange={setdescription_ru} />
          </Form.Item>
        </Col>
        </Row>
      </Form>
}
<Modal title="" 
        footer={false}
        open={modal} onOk={()=>{setModal(false)}} onCancel={()=>{setModal(false)}}>
       <div>
        <b  style={{fontSize:'18px'}}>Matn (uz)</b>
        <p style={{fontSize:'16px'}} dangerouslySetInnerHTML={{__html:sel_data!==null?sel_data.description_uz:''}}/>
       </div>
       <div>
        <b  style={{fontSize:'18px'}}>Matn (ru)</b>
        <p style={{fontSize:'16px'}}  dangerouslySetInnerHTML={{__html:sel_data!==null?sel_data.description_ru:''}}/>
       </div>
       <div>
        <b  style={{fontSize:'18px'}}>Matn (en)</b>
        <p style={{fontSize:'16px'}} dangerouslySetInnerHTML={{__html:sel_data!==null?sel_data.description_en:''}}/>
       </div>
      </Modal>
    </div>
  )
}
