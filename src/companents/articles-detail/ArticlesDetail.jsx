import './style/style.css';
import { Avatar, Col, Row } from 'antd'
import book from '../../assets/books/book.svg';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../helps/api';


const ArticlesDetail = () => {
    const { _id } = useParams()
    const [article, setArticle] = useState()

    const getArticle = () => {
        axios.get(`${api}/articles/one/${_id}`).then((res) => {
            setArticle(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        getArticle()
    }, [])

    if (article) {
        return (
          <>
          <Navbar />
          <div className='book'>
              <Row>
                  <Col lg={12} md={24} sm={24} xs={24} >
                      <div className='book-detail-card'>
                          <img src={article.preview_pic} alt="" />
                      </div>
                  </Col>
                  <Col lg={12} md={24} sm={24} xs={24} >
                      <div className='book-detail-card'>
                          <h1>{article.title}</h1>
                          <p>{article.description}</p>
                          <div className='book-detail-card-author'>
                                {article.authors.map((item, key) => (
                                    <Link key={key} to={`/teachers/${item._id}`} style={{display: 'flex', alignItems: 'center'}} >
                                        <Avatar src={<img src={item.profile_pic} />} />
                                        <span>{`${item.firstName} ${item.lastName}`}</span>
                                    </Link>
                                ))}
                          </div>
                          <div className='book-detail-link'>
                              <a href={article.link} target='_blank'>Yuklab olish</a>
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

export default ArticlesDetail