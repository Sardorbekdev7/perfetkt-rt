import { Col, Row } from 'antd'
import tech from '../../assets/teacher/tech.svg'
import './style/style.css'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import { useEffect, useState } from "react";
import {api} from "../../helps/api"
import axios from 'axios'
const Teacher = () => {
  const [teachers,setTeachers] = useState([]);
  const getTeachers = ()=>{
    axios.get(`${api}/teachers/all`).then((res)=>{
      setTeachers(res.data)
    })
  }
  useEffect(()=>{
    getTeachers();
    console.log(teachers)
  },[])
  return (
    <>
    <Navbar />
    <div className='teachers'>
      <h1>Bizning o'qituvchilarimiz</h1>
      <div className='teacher'>
        <Row>
          {teachers?
          teachers.map((item,key)=>(
            item.profile_pic?<Col lg={6} md={12} sm={24} xs={24} >
            <div className='teacher-card'>
              <div className='teacher-img'>
                <img src={item.profile_pic} alt='teacher' />
              </div>
              <div className='teacher-info'>
                <h3>{item.full_name}</h3>
                <p>{item.postion} {item.scientific_degree.length!=0?item.scientific_degree.map((el,key)=>(el)):""}</p>
                <div>
                  <span>Email:</span>
                  <a href={`mailto: ${item.email}`}>{item.email}</a>
                </div>
                <div>
                  <span>Telefon:</span>
                  <a href={`tel:${item.phoneNumber}`}>{item.phoneNumber}</a>
                </div>
                <div className='teacher-about'>
                  <Link to={`/teachers/${item.username}`}>Batafsil</Link>
                </div>
              </div>
            </div>
          </Col>:<></>
          )):<>Iltimos kuting...</>}
        </Row>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Teacher