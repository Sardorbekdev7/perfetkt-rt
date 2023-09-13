import React from 'react'
import { useEffect, useState } from 'react';
import { api } from '../../../helps/api';
import axios from 'axios';
import {Input,Col,Row,Button} from "antd"
const Profile = () => {
  const [teacher,setTeacher] = useState({});
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [fatherName,setFatherName] = useState("")
  const [studyCareer,setStudyCareer] = useState([])
  const [workCareer,setWorkCareer] = useState([]);
  const [nameC,setNameC] = useState("");
  const [startT,setStartT]  =useState("")
  const [endT,setEndT]  =useState("")
  const [nameWC,setNameWC] = useState("");
  const [startWT,setStartWT]  =useState("")
  const [endWT,setEndWT]  =useState("")
  const formData = new FormData()

  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('fatherName', fatherName);
  formData.append("full_name",`${lastName} ${firstName} ${fatherName}`)

  const updateProfile = ()=>{
    axios.put(`${api}/teachers/test`,formData).then(res=>{
      console.log(res)
    })
  }

  const updateCareer = ()=>{
    axios.put(`${api}/teachers/test`,{}).then(res=>{
      console.log(res.data)
    })
  }

  const getTeacher  = ()=>{
    axios.get(`${api}/teachers/profile/a-abdusattorov`).then(res=>{
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setFatherName(res.data.fatherName)
      setTeacher(res.data);
      res.data.studyCareer?setStudyCareer(res.data.studyCareer):setStudyCareer([])
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
  },{})

  return (
    <div>
      <div>
      <h2>Shaxsiy ma'lumotlarni yangilash</h2>
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
                <p>Sharingiz:</p>
                <Input  placeholder="Otasining ismi" onChange={(e) => setFatherName(e.target.value)} value={fatherName} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <p>Profil rasmi</p>
                <input type="file" name="" id="" onChange={(e) => {formData.append('profile_pic', e.target.files[0]);}} />
            </Col>
            <Col g={12} md={24} sm={24} xs={24}>
                <Button onClick={(e)=>{updateProfile()}} type="primary">Jo'natish</Button>
            </Col>
      </Row>
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