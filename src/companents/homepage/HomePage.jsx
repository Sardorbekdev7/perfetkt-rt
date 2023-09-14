import './style/style.css'
import Carousel from "react-multi-carousel";
import newsimg from '../../assets/homepage/news.png'
import date from '../../assets/homepage/date.svg'
import { Link } from 'react-router-dom';
import Stat from '../statstic/Stat';
import { api, getData } from '../../helps/api';
import { useAuthStore } from '../../store/auth.store';
import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import axios from 'axios';
import { Spin } from 'antd';



const HomePage = () => {

  // const { news, setNews } = useAuthStore()
  const [news, setNews] = useState([])

  const getNews = () => {
    getData('news', 'all').then((res) => {
      setNews(res.data)
    })
  }

  

  useEffect(() => {
    getNews()
  }, [])
  

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  


  return (
    <>
    <Navbar />
    <div className='homepage'>
      <div>
        <h1>Yangiliklar</h1>
        <div className='news-cards'>
          <Carousel
          responsive={responsive}
          infinite={true}
          swipeable={false}
          draggable={false}
          containerClass="carousel-container"
          autoPlay={true}
          autoPlaySpeed={2000}
          itemClass="carousel-item-padding-40-px"
          >
            {news.length != 0 ? news.map((item, key) => (
              <div key={key} className='news-card'>
                <div style={{height: '300px'}} className='news-card-img'>
                  <img src={item.preview_pic} style={{height: '100%', overflow: 'hidden'}}  alt='yangiliklar' />
                </div>
                <div className='news-card-text'>
                  <div className='news-card-date'>
                    <img src={date} alt='date' />
                    <span>{item.createdAt}</span>
                  </div>
                  <p>{item.title}</p>
                  <div className='news-card-link'>
                    <Link to={`/yangiliklar/${item._id}`}>Batafsil</Link>
                  </div>
                </div>
              </div>

            )): 
            <div style={{textAlign: 'center'}}>
                <Spin size="large" />
            </div>
            }
          </Carousel>
        </div>
      </div>
      <Stat  />
      
    </div>
    <Footer />
  </>
  )
}

export default HomePage