import React, { useState } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import './style/style.css';
import { Link } from 'react-router-dom';
const DrawerNavbar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MenuOutlined  onClick={showDrawer} style={{color: "white"}} />
      <Drawer  placement="right" onClose={onClose} open={open} style={{background: '#00803D', zIndex: '1235456464453543 !important'}}>
        <div className='navbar-drawer-name'>
                <Link to={'/teachers'} >O'qituvchilar</Link>
                <Link to={'/books'} >Kitoblar</Link>
                <Link to={'/articles'} >Maqolalar</Link>
                <Link to={'/subjects'} >Fanlar</Link>
                <Link to={'/presentations'} >Taqdimotlar</Link>
                <Divider />
                <Link to={'/login'} >Kirish</Link>
            </div>
      </Drawer>
    </>
  );
};
export default DrawerNavbar;