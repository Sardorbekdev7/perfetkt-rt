import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    WechatOutlined
  } from '@ant-design/icons';
  import '../css/Admin.css'
  import { Layout, Menu, theme } from 'antd';
  import React, {  useState } from 'react';


import { Navigate, Route, Routes, useLocation } from 'react-router';
import Teachers from './Teachers';
import Slider from './Slider';
import {MdPerson} from 'react-icons/md'
import {BiCategoryAlt} from 'react-icons/bi'
import {BsGlobe} from 'react-icons/bs'
import {GrTechnology} from 'react-icons/gr'
import {MdDescription} from 'react-icons/md'
import { Link } from 'react-router-dom';
import Categories from './Categories';
import SubCategories from './SubCategory';
import Course from './Course';
import CourseDes from './CourseDes';
import Faq from './Faq';
import About from './About';
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
        <div className='adminPanel'>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
            {collapsed?'':<>Farobiy.uz</>}
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[pathId]}
            
          >
            <div className='btnMenu'  onClick={()=>{setCollapsed(!collapsed)}}>{collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> }</div>


            <Menu.Item key="8">
            <MdDescription />
            <Link to="about">Biz haqimizda</Link>
            </Menu.Item>

            <Menu.Item key="2">
            <MdPerson />
                <Link to="teachers">O'qituvchilar</Link>
            </Menu.Item>
           
            <Menu.Item key="3">
            <BsGlobe />
            <Link to="category">Kurs turlari</Link>
            </Menu.Item>
           
            <Menu.Item key="4">
            <BiCategoryAlt />
            <Link to="subcategory">Kurslar</Link>
            </Menu.Item>
           
            <Menu.Item key="5">
            <GrTechnology />
            <Link to="course">Texnologiyalar</Link>
            </Menu.Item>

            <Menu.Item key="6">
            < WechatOutlined/>
            <Link to="faq">Ko'p so'raladigan</Link>
            </Menu.Item>

            <Menu.Item key="7">
            <MdDescription />
            <Link to="course-descriptions">Kurs izohlari</Link>
            </Menu.Item>



           

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
           <Routes>
           <Route path="" element={<Slider/>}/>
           <Route path="teachers" element={<Teachers/>}/>
            <Route path="category" element={<Categories/>}/>
            <Route path="subcategory" element={<SubCategories/>}/>
            <Route path="course" element={<Course/>}/>
            <Route path="course-descriptions" element={<CourseDes/>}/>
            <Route path='faq' element={<Faq/>}/>
            <Route path='about' element={<About/>}/>
           </Routes>
          </Content>
        </Layout>
      </Layout>
      </div>
    );
  };
  export default Admin;

  