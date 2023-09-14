import { Col, Row } from 'antd';
import './style/style.css';
import Search from '../search/Search';
import search from '../../assets/search/search.svg';
import filterimg from '../../assets/search/filter.svg';
import book from '../../assets/books/book.svg';
import Filter from '../filter/Filter';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { api } from '../../helps/api';
import axios from 'axios';


const Books = () => {
  const [filter, setFilter] = useState(false)
  const [books, setBooks] = useState([])

  const getBooks = () => {
    axios.get(`${api}/books/all`).then((res) => {
      setBooks(res.data)
      console.log(res.data);
    })
  }

  const handleClickOpen = () => {
    setFilter(!filter)
  }

  useEffect(() => {
    getBooks()
  }, [])


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
      {books.length !=0 ? books.map((res, key) => (
            <Col key={key} lg={6} md={12} sm={24} xs={24} >
              <Link to={`/books/${res._id}`}>
                <div className='book-card'>
                  <div className='book-card-img'>
                    <img src={res.preview_pic} alt='book-img' />
                  </div>
                  <div className='book-card-text'>
                    <h1>{res.title}</h1>
                    <p>{res.description}</p>
                    <span>Mualliflar: {res.authors.map((item, key) => (
                      <>{`${item.firstName} ${item.lastName}, `}</>
                    ))} </span>
                  </div>
                </div>
              </Link>
            </Col>
          )): <></>}
      </Row>
    </div>
    <Footer />
    </>
  )
}

export default Books