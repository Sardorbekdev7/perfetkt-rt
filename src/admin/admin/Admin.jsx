import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {FaHome} from 'react-icons/fa'
import { Layout, Menu, Button, theme } from 'antd';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import HomeDash from "../components/home/HomeDash.jsx";
import {PiChalkboardTeacher} from "react-icons/pi";
import Teachers from "../components/teacher/Teacher.jsx";
import Subjects from '../components/subjects/Subjects.jsx';
import Subteacher from '../components/subteacher/subteacher.jsx';
import News from '../components/news/News.jsx';
const { Header, Sider, Content } = Layout;


const Admin = () => {
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
    var path=location.pathname.slice(location.pathname.indexOf('/admin')+7)
    if(path.length===0){
      path="default"
    }


  const pathId=menuLinks[path]


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
                <Link to="teachers">O'qituvchilar</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <PiChalkboardTeacher />
                <Link to="subjects">Fanlar</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <PiChalkboardTeacher />
                <Link to="subteacher">Fan va o'qituvchi</Link>
            </Menu.Item>
            <Menu.Item key="5">
                <PiChalkboardTeacher />
                <Link to="news">Yangiliklar</Link>
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
            <Route path={'teachers'} element={<Teachers />} />
            <Route path={'subjects'} element={<Subjects />} />
            <Route path={'subteacher'} element={<Subteacher />} />
            <Route path={'news'} element={<News />} />
            <Route path={'teachers'} element={<Teachers />} />
            <Route path={'teachers'} element={<Teachers />} />
            </Routes>                                          
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;