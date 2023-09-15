import { Col, Row } from 'antd';
import './style/style.css';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { api } from '../../helps/api';
import { useEffect } from 'react';

const Subjects = () => {
  const getSubjects = () => {
    axios.get(`${api}/subjects/all`).then(res => {
      console.log(res);
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
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>I - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>II - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>III - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>IV - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>V - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>VI - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>VII - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
        <Col lg={6} md={12} sm={24} xs={24} >
          <div className='subject-card'>
            <h3>VIII - semestr</h3>
            <table>
              <tr>
                <th>Fanlar</th>
                <th>Kredit</th>
              </tr>
              <tr>
                <td>Matematika</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Fizika</td>
                <td>8</td>
              </tr>
            </table>
          </div>
        </Col>
      </Row>
    </div>
    <Footer />
    </>
  )
}

export default Subjects