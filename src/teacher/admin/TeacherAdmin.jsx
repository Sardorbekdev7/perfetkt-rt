import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {GiBookshelf, GiBookCover} from 'react-icons/gi'
import {MdOutlineLaptopChromebook} from 'react-icons/md'
import {FaHome} from 'react-icons/fa'
import { Layout, Menu, Button, theme } from 'antd';
import {Link, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import HomeDash from "../components/home/HomeDash.jsx";
import {PiChalkboardTeacher} from "react-icons/pi";
import Subjects from '../components/subjects/Subjects.jsx';
import Profile from '../components/profile/Profile.jsx';
import Books from '../components/books/Books.jsx';
import Articles from '../components/articles/Articles.jsx';
import Cookies from 'universal-cookie';
const { Header, Sider, Content } = Layout;

const cookies = new Cookies()

const TeacherAdmin = () => {
  const token = cookies.get('token');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuLinks={
    default:'1',
    teachers:'2',
    category:'3',
    subcategory:'4',
    course:'5',
    faq:"6",
    coursedes: '7',
    about:"8",
  }
  var location = useLocation();
    var path=location.pathname.slice(location.pathname.indexOf('/my')+7)
    if(path.length===0){
      path="default"
    }


  const pathId=menuLinks[path]

  if (token) {
    return (
      <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h1 style={{color: 'white', textAlign: 'center', margin: '15px 0'}}>Perfekt - RTK</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathId]}
          
          >
            <Menu.Item key="1">
                <FaHome />
                <Link to="">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <PiChalkboardTeacher />
                <Link to="profile">Profil</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <GiBookshelf />
                <Link to="subjects">Fanlar</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <GiBookCover />
                <Link to="books">Kitoblar</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <MdOutlineLaptopChromebook />
                <Link to="articles">Maqolalar</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: 'auto'
          }}
          >
           <Routes>
            <Route path={''} element={<HomeDash />} />
            <Route path={'profile'} element={<Profile />} />
            <Route path={'books'} element={<Books />} />
            <Route path={'articles'} element={<Articles />} />
            <Route path={'subjects'} element={<Subjects />} />
           </Routes>                                          
        </Content>
      </Layout>
    </Layout>
  );
}
else {
  return (
    <Navigate to={'/login'} replace={true} />
  )
}
};

export default TeacherAdmin;