import { Avatar, Col, Row } from 'antd'
import { Link, useParams } from 'react-router-dom';
import './style/style.css';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../helps/api';

const Book = () => {
    const { _id } = useParams()
    const [book, setBook] = useState()

    const getBook = () => {
        axios.get(`${api}/books/one/${_id}`).then((res) => {
            setBook(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        getBook()
    }, [])

    if (book) {
        return (
          <>
          <Navbar />
          <div className='book'>
              <Row>
                  <Col lg={12} md={24} sm={24} xs={24} >
                      <div className='book-detail-card'>
                          <img src={book.preview_pic} alt="" />
                      </div>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24} >
                      <div className='book-detail-card'>
                          <h1>{book.title}</h1>
                          <p>{book.description}</p>
                          <div className='book-detail-card-author'>
                                {book.authors.map((item, key) => (
                                    <Link key={key} to={`/teachers/${item._id}`} style={{display: 'flex', alignItems: 'center'}} >
                                        <Avatar src={<img src={item.profile_pic} />} />
                                        <span>{`${item.firstName} ${item.lastName}`}</span>
                                    </Link>
                                ))}
                          </div>
                          <div className='book-detail-link'>
                              <a href={book.link} target='_blank'>Yuklab olish</a>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>
          <Footer />
          </>
        )
    }

    return (
        <div>
            <Navbar />
            Loading...
            <Footer />
        </div>
    )
}

export default Book