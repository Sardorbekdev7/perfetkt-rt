import { Button, Col, Form, Image, Input, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { deleteAbout, deleteSlider, getAbout, getSlider, postAbout, postSlider, putAbout, putSlider } from '../../host/Config'
import table_image from '../../assets/admin/table_image.png'
import {MdDelete} from 'react-icons/md'
import {TbEdit} from 'react-icons/tb'
import {BsEyeFill} from 'react-icons/bs'
import ReactQuill from 'react-quill';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { api } from '../../host/Host';
import { useStore } from '../../store/Store';
import { beforeUpload, getBase64 } from '../../components/Objects'

export default function About() {
  const [form]=Form.useForm()
    const [data, setData]=useState(null)
    const [sel_data, setSel_data]=useState(null)
    const [image_id, setimage_id]=useState(null)
    const [modal, setModal]=useState(false)
    const [edit, setedit]=useState(null)
    const [changePage, setchangePage]=useState(false)
    const [btnDis, setBtnDis]=useState(false)
    const [cookie, setCookie]=useCookies()
    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const setLoader=useStore(state=>state.setLoader)
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Yuklanyapdi
      </div>
    </div>
  );
  const handleChange = (info) => {
  if (info.file.status === 'uploading') {
      setBtnDis(true)
      setLoading(true);
      return;
    }
  if (info.file.status === 'done') {
      setBtnDis(false)
      setimage_id(info.file.response.id)
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
      
        setImageUrl(url);
      });
    }
  };
  

  const editData=(res)=>{
    setchangePage(true)
    form.setFieldsValue(res)
    var image=res.image
    setImageUrl(api+image.file)
    setimage_id(image.id)
    setedit(res.id)
  }
    const showModal = () => {
        setchangePage(true);
      };
     
    const columns=[
        {
            title:"#",
            key:'#',
            render:(text, res, index)=>{
                return(index+1)
            }
            
        },
        {
            title:"Nomi (uz)",
            key:'about_uz',
            dataIndex:"about_uz",
            
        },
        {
            title:"Nomi (ru)",
            key:'about_ru',
            dataIndex:"about_ru",
            
        },
        {
            title:"Nomi (en)",
            key:'about_en',
            dataIndex:"about_en",
            
        },
        
        {
            title:"Rasm",
            key:'image',
            dataIndex:"image",
            render:(res)=>{
                return(  <Image
                    height={60}
                    src={res!==null && Object.keys(res).length?res.file.length!==0?api+res.file:table_image:table_image}
                  />)
            }
            
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
  const getAboutData=()=>{
      getAbout(cookie.token).then(res=>{
        setData(res.data)
        setLoader(false)
    })
    }
    const deleteData=(id)=>{
      setLoader(true)
      deleteAbout(cookie.token, id).then(res=>{
        message.success("Ma'lumot o'chirildi")
        getAboutData()

      }).catch(err=>{
        setLoader(false)
        message.error("Ma'lumot o'chirilmadi")
      })
    }
    useEffect(()=>{
        getAboutData()
    }, [])
   
    const onFinish=(event)=>{
      setLoader(true)
   event.image=image_id
   
   if(edit===null){
    postAbout(cookie.token, event).then(res=>{
      message.success("Ma'lumot saqlandi")
      handleClose()
     }).catch(err=>{
      setLoader(false)
      message.error("Ma'lumot saqlanmadi")
     })
   }else{
    putAbout(cookie.token, event, edit).then(res=>{
      message.success("Ma'lumot o'zgartirildi")
      handleClose()
     }).catch(err=>{
      setLoader(false)
      message.error("Ma'lumot o'zgartirilmadi")
     })
   }
   
   }
  const handleClose=()=>{
    setimage_id(null)
    setImageUrl()
    setchangePage(false)
    getAboutData()
    setedit(null)
    form.resetFields()
  }
  return (
    <div>
        <div className='adminBox'>
           
            {!changePage?<>
                <div className='admin_btns'>
                <Button style={{marginBottom:'20px'}} onClick={showModal} type='primary'>Slider qo'shish</Button>
                </div>
            
             <Table 
             rowKey={(res)=>(res.id)}
             dataSource={data} columns={columns} /></>:
             <>
             
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
<Button style={{marginBottom:'20px'}} onClick={handleClose} type='primary'>Orqaga</Button>
<Button disabled={btnDis} style={{marginLeft:'20px', backgroundColor:"#00a900"}} type="primary" htmlType="submit"> Saqlash</Button>
</div>
    <Row style={{paddingTop:"20px"}}>
    <Col style={{padding:'0px 20px'}} lg={12} md={24}>
    <Form.Item
      label="Nomi (uz)"
      name="about_uz"
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
        <Col style={{padding:'0px 20px'}} lg={12} md={24}>
        <Form.Item
      label="Nomi (ru)"
      name="about_ru"
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
        <Col style={{padding:'0px 20px'}} lg={12} md={24}>
        <Form.Item
      label="Nomi (en)"
      name="about_en"
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
        <Col style={{padding:'0px 20px'}} lg={12} md={24}>
        <Form.Item
      label="Rasm"
      name="image"
      rules={[
        {
          required: true,
          message: "Bu maydonni to'ldirish shart",
        },
      ]}
    >
       <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${api}/api/files/${image_id===null?"":"?id="+image_id}`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Form.Item>
        </Col>
    </Row>
   
  </Form>
  </>
        }
        </div>
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
