import { Col, Row } from 'antd';
import './style/style.css';
import dotsent from '../../assets/homepage/dotsent.svg'
import oliy from '../../assets/homepage/oliy.svg'
import subjects from '../../assets/homepage/subjects.svg'
import room from '../../assets/homepage/room.svg'

const Stat = () => {
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
                            <h2>25</h2>
                            <p>P.H.D dotsent hodimlar</p>
                        </div>
                    </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24}>
                    <div className='stat-card'>
                        <div className='stat-card-img'>
                            <img src={oliy} alt="P.H.D dotsent hodimlar" />
                        </div>
                        <div className='stat-card-text'>
                            <h2>25</h2>
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
                            <h2>25</h2>
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
                            <h2>25</h2>
                            <p>O’quv  xonalari</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default Stat