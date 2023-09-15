import './style/style.css';
import { Row, Col, Collapse } from 'antd'
import teach from '../../assets/teacher/tech.svg'
import { Link, useParams } from 'react-router-dom';
import book from '../../assets/books/book.svg';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../helps/api';


const TeacherDetail = () => {
  const [teacher, setTeacher] = useState()
  const { username } = useParams()

  
  const items = [
    {
      key: '1',
      label: 'Skopus maqolalar',
      children: <Row>
        {teacher ? 
        <>
          {teacher.articles.map((item, key) => (
            <Col  key={key} lg={6} md={12} sm={24} xs={24} >
            <Link to={`/articles/${item._id}`}>
            <div className='book-card'>
            <div className='book-card-img'>
            <img src={item.preview_pic} alt='book-img' />
            </div>
            <div className='book-card-text'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <span>Muallif: 

            </span>
            </div>
            </div>
            </Link>
            </Col>
            ))}
          </>
          : <></>}
      </Row>
    }
  ]

  const getTeacher = () => {
    axios.get(`${api}/teachers/profile/${username}`).then((res) => {
      setTeacher(res.data)
      console.log(res.data);
    })
  }

  useEffect(() => {
    getTeacher()
  }, [])
  


  if (teacher) {
    return (
      <>
      <Navbar />
      <div className='teacherdetail'>
          <div className='teach'>
            <h1>{teacher.full_name}</h1>
            <Row>
              <Col lg={12} md={24} sm={24} xs={24}> 
                  <div className='teach-img'>
                    <img src={teacher.profile_pic} alt="oqituvchi" />
                  </div>  
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}>
                  <div className='teach-info'>
                    <div>
                      {teacher.studyCareer.length != 0 && 
                      <>
                      <h1>O'quv faoliyati</h1>
                      <ul>
                        {teacher.studyCareer.map((item, key) => (
                          <li key={key}>{item.name}</li>
                          ))}
                      </ul>
                      </>
                      }
                    </div>
                    <div>
                      {teacher.workCareer.length != 0 && <>
                      <h1>Mehnat faoliyati</h1>
                      <ul>
                        {teacher.workCareer.map((item, key ) => (
                          <li key={key}>{item.name}</li>
                        ))}
                      </ul>
                      </>}
                    </div>
                    <div>
                      {teacher.scientific_degree.length != 0 && <>
                      <h1>Ilmiy darajasi</h1>
                      <ul>
                        {teacher.scientific_degree.map((item, key) => (
                          <li key={key}>{item.name}</li>
                        ))}
                      </ul>
                      </>}
                    </div>
                    <div>
                      <h1>Bog'lanish</h1>
                      <ul>
                        <li><span>Email:</span>
                          <a href={`mailto: ${teacher.email}`}>{teacher.email}</a></li>
                        <li>
                          <span>Telefon:</span>
                          <a href={`tel: ${teacher.phoneNumber}`}>{teacher.phoneNumber}</a>
                        </li>
                      </ul>
                    </div>
                  </div> 
              </Col>
            </Row>
            <h1 style={{marginTop: '70px'}}>Ilmiy maqolalar</h1>
            <div className='artciles'>
              <Collapse items={items} expandIconPosition={'end'} />
            </div>
            <h1>Kitoblar va qo’llanmalar</h1>
            <div className='teacher-books'>
            <Row>
              {teacher ? 
              <>
              {teacher.books.map((item, key) => (
              <Col lg={6} md={12} sm={24} xs={24} >
                <Link to={`/presentations/${item._id}`}>
                  <div className='book-card'>
                    <div className='book-card-img'>
                      <img src={item.preview_pic} alt='book-img' />
                    </div>
                    <div className='book-card-text'>
                      <h1>{item.name}</h1>
                      <p>{item.description}</p>
                      <span>Muallif: Sardorbek Najmiddinov</span>
                    </div>
                  </div>
                </Link>
              </Col>
                ))}
                </>
                : <></>}
            </Row>
            </div>
          </div>
          {/* <div className='teach-sub'>
                <h1>Fanlar</h1>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Fan nomi</th>
                        <th>Ma’ruza/Amaliyot/Labaratoriya</th>
                      </tr>
                    </thead>
                  </table>
                </div>
          </div> */}
      </div>
      <Footer />
      </>
    )
  }
  else {
    return (
    <div>
      <Navbar />
      <Footer />
    </div>
    )
  }

}

export default TeacherDetail