import { Col, Row, Spin } from 'antd';
import './style/style.css';
import dotsent from '../../assets/homepage/dotsent.svg'
import oliy from '../../assets/homepage/oliy.svg'
import subjects from '../../assets/homepage/subjects.svg'
import room from '../../assets/homepage/room.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../helps/api';

const Stat = () => {
    const [stat, setStat] = useState()

    const getStat = () => {
        axios.get(`${api}/home`).then(res => {
          console.log(res.data.statistics);
          setStat(res.data.statistics)
        })
      }

    useEffect(() => {
        getStat()
    }, [])

    if (stat) {
        return (
          <div className='stat'>
              <h1>Kafedra ma’lumotlari:</h1>
              <div>
                  <Row justify={'space-around'} gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}>
                      <Col lg={6} md={12} sm={24} xs={24}>
                          <div className='stat-card'>
                              <div className='stat-card-img'>
                                  <img src={dotsent} alt="P.H.D dotsent hodimlar" />
                              </div>
                              <div className='stat-card-text'>
                                  <h2>{stat.have_since_deg}</h2>
                                  <p>Ilmiy salohiyatga ega hodimlar</p>
                              </div>
                          </div>
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                          <div className='stat-card'>
                              <div className='stat-card-img'>
                                  <img src={oliy} alt="P.H.D dotsent hodimlar" />
                              </div>
                              <div className='stat-card-text'>
                                  <h2>{stat.big_teacher}</h2>
                                  <p>Oliy toifali o’qituvchilar</p>
                              </div>
                          </div>
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                          <div className='stat-card'>
                              <div className='stat-card-img'>
                                  <img src={subjects} alt="P.H.D dotsent hodimlar" />
                              </div>
                              <div className='stat-card-text'>
                                  <h2>{stat.subjects}</h2>
                                  <p>Kafedrada o’tiladigan fanlar</p>
                              </div>
                          </div>
                      </Col>
                      <Col lg={6} md={12} sm={24} xs={24}>
                          <div className='stat-card'>
                              <div className='stat-card-img'>
                                  <img src={room} alt="P.H.D dotsent hodimlar" />
                              </div>
                              <div className='stat-card-text'>
                                  <h2>{stat.courses}</h2>
                                  <p>Tashkil qilingan kurslar</p>
                              </div>
                          </div>
                      </Col>
                  </Row>
              </div>
          </div>
        )
    }
    else {
        return (
            <div style={{textAlign: 'center'}}>
                <Spin size="large" />
            </div>
        )
    }
}

export default Stat