import React from 'react'
import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import {Input,Col,Row,Button,Modal,Image} from "antd"
import Cookies from 'universal-cookie';
const cookies = new Cookies()
const Profile = () => {
  const token = cookies.get('token');
  const [teacher,setTeacher] = useState({});
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [fatherName,setFatherName] = useState("")
  const [email,setEmail] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [studyCareer,setStudyCareer] = useState([])
  const [workCareer,setWorkCareer] = useState([]);
  const [nameC,setNameC] = useState("");
  const [startT,setStartT]  =useState("")
  const [endT,setEndT]  =useState("")
  const [nameWC,setNameWC] = useState("");
  const [startWT,setStartWT]  =useState("")
  const [endWT,setEndWT]  =useState("")
  const [openProfile,setOpenProfile] = useState(false)
  const [openPhoto,setOpenPhoto] = useState(false)
  const formData = new FormData()

  const updateProfile = ()=>{
    axios.put(`${api}/teachers/updateTeacher`,{
      firstName,
      lastName,
      full_name: `${lastName} ${firstName} ${fatherName}`,
      email,
      phoneNumber
    },{
      headers: {
        "x-auth-token": token
      }
    }).then(res=>{
      console.log(res)
    })
  }
  const updateCareer = ()=>{
    console.log(studyCareer)
    axios.put(`${api}/teachers/update_career`,{
      studyCareer: studyCareer,
      workCareer
    },{
      headers: {
        "x-auth-token": token
      }
    }).then(res=>{
      console.log(res.data)
    })
  }
  const getTeacher  = ()=>{
    axios.get(`${api}/teachers/me`,{
      headers: {
        "x-auth-token": token
      }
    }).then(res=>{
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setFatherName(res.data.fatherName);
      setEmail(res.data.email)
      setPhoneNumber(res.data.phoneNumber)
      setTeacher(res.data);
      res.data.studyCareer?setStudyCareer(res.data.studyCareer):setStudyCareer([]);
      res.data.workCareer?setWorkCareer(res.data.workCareer):setWorkCareer([])
    })
  }
  const updatePhoto = ()=>{
    axios.put(`${api}/teachers/updatePhoto`,formData,{
      headers: {
        "x-auth-token": token
      }
    })
  }

  const AddSC = ()=>{
    setStudyCareer([...studyCareer,{name: nameC,startTime: startT, endTime: endT}])
  }
  const deleteStudyC = (index) =>{
    if(index==0) setStudyCareer(studyCareer.slice(1))
    else setStudyCareer([...studyCareer.slice(0,index),...studyCareer.slice(index+1)])
  }
  const AddWC = ()=>{
    setWorkCareer([...workCareer,{name: nameWC,startTime: startWT, endTime: endWT}])
  }
  const deleteWorkC = (index) =>{
    if(index==0) setWorkCareer(workCareer.slice(1))
    else setWorkCareer([...workCareer.slice(0,index),...workCareer.slice(index+1)])
  }
  useEffect(()=>{
    getTeacher();
  },[])

  return (
    <div>
      <div>
        <h2>Foydalanuvchi xolati: {teacher.isActive?"Active":"Active emas"}</h2>
        
      <Modal
      title="Profil rasmini tahrirlash"
      centered
      open={openPhoto}
      onOk={() =>{ updatePhoto(); setOpenPhoto(false) }}
      onCancel={() => setOpenPhoto(false)}
      width={1000}>
        <Row>
        <Col g={12} md={24} sm={24} xs={24}>
                <p>Profil rasmi</p>
                <input type="file" name="" id="" onChange={(e) => {formData.append('profile_pic', e.target.files[0]);}} />
        </Col>
        </Row>
      </Modal>
      <div>
       F.I.O: {teacher.full_name} - <Button onClick={()=>{setOpenProfile(true)}}>Tahrirlash</Button>
      </div>
      <div>
      <Image width={200} src={teacher.profile_pic?teacher.profile_pic:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}/> <br />
      <Button onClick={()=>{setOpenPhoto(true)}}>Rasmni tahrirlash</Button>
      </div>
      <Modal
       title="Ismni tahrirlash"
       centered
       open={openProfile}
       onOk={() =>{ updateProfile(); setOpenProfile(false) }}
       onCancel={() => setOpenProfile(false)}
       width={1000}>
      <Row>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Familyangiz:</p>
                <Input placeholder="Familyasi" onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Ismingiz:</p>
                <Input  placeholder="Ismingiz" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Sharifingiz:</p>
                <Input  placeholder="Otasining ismi" onChange={(e) => setFatherName(e.target.value)} value={fatherName} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Sharifingiz:</p>
                <Input  placeholder="Email kiriting..." onChange={(e) => setEmail(e.target.value)} value={email} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Sharifingiz:</p>
                <Input  placeholder="Telefon raqam" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
            </Col>
      </Row>
      </Modal>
      </div>
      <div>
      <h2>O'qish va ish faoliyatini yangilash</h2>
      <Row>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>O'qish korierangiz: {studyCareer.length}</p>
                <ul>
                  {studyCareer.length?studyCareer.map((item,key)=>(
                    <li>{item.name} - <Button onClick={()=>{deleteStudyC(key)}}>Delete</Button></li>
                  )):""}
                </ul>
                <br />
                <Input placeholder="O'quv muassasi va turini kiriting" onChange={(e) => setNameC(e.target.value)} value={nameC} />
                <Input placeholder="Nomi" type='Date' onChange={(e) => setStartT(e.target.value)} value={startT} />
                <Input placeholder="Nomi" type='Date' onChange={(e) => setEndT(e.target.value)} value={endT} />
                <Button onClick={AddSC}>Add</Button>
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Ish korierangiz: {workCareer.length}</p>
                <ul>
                  {workCareer.length?workCareer.map((item,key)=>(
                    <li>{item.name} - <Button onClick={()=>{deleteWorkC(key)}}>Delete</Button></li>
                  )):""}
                </ul>
                <br />
                <Input placeholder="Ish joyi va lavozimini kiriting" onChange={(e) => setNameWC(e.target.value)} value={nameWC} />
                <Input placeholder="Nomi" type='Date' onChange={(e) => setStartWT(e.target.value)} value={startWT} />
                <Input placeholder="Nomi" type='Date' onChange={(e) => setEndWT(e.target.value)} value={endWT} />
                <Button onClick={AddWC}>Add</Button>
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <Button onClick={(e)=>{updateCareer()}} type="primary">Jo'natish</Button>
            </Col>
      </Row>
      </div>
    </div>
  )
}

export default Profile