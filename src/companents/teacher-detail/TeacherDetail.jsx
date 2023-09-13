import './style/style.css';
import { Row, Col, Collapse } from 'antd'
import teach from '../../assets/teacher/tech.svg'
import { Link } from 'react-router-dom';
import book from '../../assets/books/book.svg';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const items = [
  {
    key: '1',
    label: 'Skopus maqolalar',
    children: <Row>
      <Col lg={6} md={12} sm={24} xs={24} >
          <Link to={`/presentations/sardorbekkkk`}>
            <div className='book-card'>
              <div className='book-card-img'>
                <img src={book} alt='book-img' />
              </div>
              <div className='book-card-text'>
                <h1>Dasturlash 1</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                <span>Muallif: Sardorbek Najmiddinov</span>
              </div>
            </div>
          </Link>
        </Col>
    </Row>
  }
]

const TeacherDetail = () => {
  return (
    <>
    <Navbar />
    <div className='teacherdetail'>
        <div className='teach'>
          <h1>Mallayev Oybek Usmonqulovich</h1>
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}> 
                <div className='teach-img'>
                  <img src={teach} alt="oqituvchi" />
                </div>  
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
                <div className='teach-info'>
                  <div>
                    <h1>O'quv faoliyati</h1>
                    <ul>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                    </ul>
                  </div>
                  <div>
                    <h1>Mehnat faoliyati</h1>
                    <ul>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                    </ul>
                  </div>
                  <div>
                    <h1>Ilmiy darajasi</h1>
                    <ul>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                    </ul>
                  </div>
                  <div>
                    <h1>Bog'lanish</h1>
                    <ul>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
                      <li>2003-2007 yy - Toshkent Axborot Texnologiyalari Universiteti bakalavryati kunduzgi</li>
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
            <Col lg={6} md={12} sm={24} xs={24} >
              <Link to={`/presentations/sardorbekkkk`}>
                <div className='book-card'>
                  <div className='book-card-img'>
                    <img src={book} alt='book-img' />
                  </div>
                  <div className='book-card-text'>
                    <h1>Dasturlash 1</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                    <span>Muallif: Sardorbek Najmiddinov</span>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24} >
              <div className='book-card'>
                <div className='book-card-img'>
                  <img src={book} alt='book-img' />
                </div>
                <div className='book-card-text'>
                  <h1>Dasturlash 1</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quasi.</p>
                  <span>Muallif: Sardorbek Najmiddinov</span>
                </div>
              </div>
            </Col>
          </Row>
          </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default TeacherDetail