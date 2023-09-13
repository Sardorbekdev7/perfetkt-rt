import './style/style.css'
import Carousel from "react-multi-carousel";
import newsimg from '../../assets/homepage/news.png'
import date from '../../assets/homepage/date.svg'
import { Link } from 'react-router-dom';
import Stat from '../statstic/Stat';
import { getData } from '../../helps/api';
import { useAuthStore } from '../../store/auth.store';
import { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';



const HomePage = () => {

  const { news, setNews } = useAuthStore()

  const getNews = () => {
    getData('news', 'all').then((res) => {
      setNews(res.data)
      console.log(res);
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
          autoPlay={false}
          autoPlaySpeed={2000}
          itemClass="carousel-item-padding-40-px"
          >
            <div className='news-card'>
              <div className='news-card-img'>
                <img src={newsimg} alt='yangiliklar' />
              </div>
              <div className='news-card-text'>
                <div className='news-card-date'>
                  <img src={date} alt='date' />
                  <span>01.01.2023</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis minus inventore in illum cum debitis consequatur, est distinctio expedita quia.</p>
                <div className='news-card-link'>
                  <Link to='/yangiliklar/'>Batafsil</Link>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <Stat />
      
    </div>
    <Footer />
  </>
  )
}

export default HomePage