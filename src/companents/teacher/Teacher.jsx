import { Col, Row } from 'antd'
import tech from '../../assets/teacher/tech.svg'
import './style/style.css'
import { Link } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

const Teacher = () => {
  return (
    <>
    <Navbar />
    <div className='teachers'>
      <h1>Bizning o'qituvchilarimiz</h1>
      <div className='teacher'>
        <Row>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='teacher-card'>
              <div className='teacher-img'>
                <img src={tech} alt='teacher' />
              </div>
              <div className='teacher-info'>
                <h3>Mallayev Oybek Usmonqulovich</h3>
                <p>Kafedra mudiri. P.H.D Dotesent</p>
                <div>
                  <span>Email:</span>
                  <a href="mailto: o.mallayev@perfectuniversity.uz">o.mallayev@perfectuniversity.uz</a>
                </div>
                <div>
                  <span>Telefon:</span>
                  <a href="tel:+998909998877">+998909998877</a>
                </div>
                <div className='teacher-about'>
                  <Link to='/teachers/mallayev'>Batafsil</Link>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='teacher-card'>
              <div className='teacher-img'>
                <img src={tech} alt='teacher' />
              </div>
              <div className='teacher-info'>
                <h3>Mallayev Oybek Usmonqulovich</h3>
                <p>Kafedra mudiri. P.H.D Dotesent</p>
                <div>
                  <span>Email:</span>
                  <a href="mailto: o.mallayev@perfectuniversity.uz">o.mallayev@perfectuniversity.uz</a>
                </div>
                <div>
                  <span>Telefon:</span>
                  <a href="tel:+998909998877">+998909998877</a>
                </div>
                <div className='teacher-about'>
                  <Link to='/teachers/mallayev'>Batafsil</Link>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='teacher-card'>
              <div className='teacher-img'>
                <img src={tech} alt='teacher' />
              </div>
              <div className='teacher-info'>
                <h3>Mallayev Oybek Usmonqulovich</h3>
                <p>Kafedra mudiri. P.H.D Dotesent</p>
                <div>
                  <span>Email:</span>
                  <a href="mailto: o.mallayev@perfectuniversity.uz">o.mallayev@perfectuniversity.uz</a>
                </div>
                <div>
                  <span>Telefon:</span>
                  <a href="tel:+998909998877">+998909998877</a>
                </div>
                <div className='teacher-about'>
                  <Link to='/teachers/mallayev'>Batafsil</Link>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={24} xs={24} >
            <div className='teacher-card'>
              <div className='teacher-img'>
                <img src={tech} alt='teacher' />
              </div>
              <div className='teacher-info'>
                <h3>Mallayev Oybek Usmonqulovich</h3>
                <p>Kafedra mudiri. P.H.D Dotesent</p>
                <div>
                  <span>Email:</span>
                  <a href="mailto: o.mallayev@perfectuniversity.uz">o.mallayev@perfectuniversity.uz</a>
                </div>
                <div>
                  <span>Telefon:</span>
                  <a href="tel:+998909998877">+998909998877</a>
                </div>
                <div className='teacher-about'>
                  <Link to='/teachers/mallayev'>Batafsil</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Teacher