import { Col, Collapse, Row } from 'antd';
import './style/style.css';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { api } from '../../helps/api';
import { useEffect, useState } from 'react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const getSubjects = () => {
    axios.get(`${api}/subjects/all`).then(res => {
      console.log(res);
      setSubjects(res.data);
    })
  }

  useEffect(() => {
    getSubjects()
  }, [])
  

  return (
    <>
    <Navbar />
    <div className='subjects'>
      <h1>Kafedra tomonidan o’tiladigan fanlar</h1>
      <Row>
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>I - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==1).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>II - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==2).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>III - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==3).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>IV - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==4).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>V - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==5).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>VI - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==6).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>VII - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==7).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
        {subjects.length != 0 ? <>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='subject-card'>
              <h3>VIII - semestr</h3>
              <table>
                <tr>
                  <th>Fanlar</th>
                </tr>
        {subjects.filter((e)=>e.semester==8).map((item,key)=>(
                <tr key={key}>
                  <td>
                  <Collapse
                      size="small"
                      bordered={false}
                      expandIconPosition={'end'}
                      items={[
                        {
                          key: key + 1,
                          label: item.subject_name,
                          children: <p>
                            {item.teachers.map((item1, key) => (
                              <p>{item1.firstName} {item1.lastName}</p>
                            ))}
                          </p>,
                        },
                      ]}
                    />
                  </td>
                </tr>
                  ))}
              </table>
            </div>
          </Col>
        </>
        :<></>}
      </Row>
    </div>
    <Footer />
    </>
  )
}

export default Subjects