import './style/style.css';
import img1 from '../../assets/homepage/brand1.svg'
import { Link } from 'react-router-dom';
import useMatchMedia from 'use-match-media-hook'
import DrawerNavbar from './Drawer';

const queries = [
  '(max-width: 1024px)',
]

const Navbar = () => {

  const [mobile] = useMatchMedia(queries)

  return (
    <div className='navbar'>
        <div className='navbar-brand'>
          <Link to='/'>
            <img src={img1} alt="brand" />
            <div className='navbar-text'>
              <h1>PERFECT UNIVERSITY</h1>
              <h2>Raqamli Texnologiyalar kafedrasi</h2>
            </div>
          </Link>
        </div>
        {mobile ? <DrawerNavbar /> : 
        <div className='navbar-name'>
            <Link to={'/teachers'} >O'qituvchilar</Link>
            <Link to={'/books'} >Kitoblar</Link>
            <Link to={'/articles'} >Maqolalar</Link>
            <Link to={'/subjects'} >Fanlar</Link>
            <Link to={'/presentations'} >Taqdimotlar</Link>
            <Link to={'/login'} >Kirish</Link>
        </div>
        }
    </div>
  )
}

export default Navbar