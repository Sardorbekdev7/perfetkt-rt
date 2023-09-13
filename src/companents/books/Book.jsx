import { Col, Row } from 'antd';
import './style/style.css';
import Search from '../search/Search';
import search from '../../assets/search/search.svg';
import filterimg from '../../assets/search/filter.svg';
import book from '../../assets/books/book.svg';
import Filter from '../filter/Filter';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';


const Books = () => {
  const [filter, setFilter] = useState(false)

  const handleClickOpen = () => {
    setFilter(!filter)
  }


  return (
    <>
    <Navbar />
    <div className='books'>
      <h1>Raqamli texnologiyalar kafedrasining elektron kutubxonasi</h1>
      <div className='search'>
        <input type="text" placeholder='Kitob nomini yozing...' />
        <div className='search-filter'>
            <img onClick={() => handleClickOpen()} src={filterimg} alt="" />
            <img src={search} alt="" />
        </div>
      </div>
      {filter && <Filter />}      
      <Row>
        <Col lg={6} md={12} sm={24} xs={24} >
          <Link to={`/books/sardorbekkkk`}>
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
    <Footer />
    </>
  )
}

export default Books