import { Avatar, Col, Row } from 'antd'
import book from '../../assets/books/book.svg';
import { Link } from 'react-router-dom';
import './style/style.css';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const Book = () => {
  return (
    <>
    <Navbar />
    <div className='book'>
        <Row>
            <Col lg={12} md={24} sm={24} xs={24} >
                <div className='book-detail-card'>
                    <img src={book} alt="" />
                </div>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24} >
                <div className='book-detail-card'>
                    <h1>Dasturlash 1</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione numquam deleniti nemo optio tempore, repudiandae soluta animi. Quas, itaque et?</p>
                    <div className='book-detail-card-author'>
                        <Link to={'/teachers/mallayev'}>
                            <Avatar src={<img src={book} />} />
                            <span>sardorbe</span>
                        </Link>
                    </div>
                    <div className='book-detail-link'>
                        <Link to={''}>Yuklab olish</Link>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
    <Footer />
    </>
  )
}

export default Book