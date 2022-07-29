import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
  import '../resources/layout.css';
  import {Link} from 'react-router-dom'
  
  const { Header, Sider, Content } = Layout;
  
  const App= (props) => {
    const [collapsed, setCollapsed] = useState(false);
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo"><h3>Sam POS</h3></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: <Link to='/home'>Home</Link>,
              },
              {
                key: '2',
                icon: <CopyOutlined/>,
                label: <Link to='/home'>Bills</Link>,
              },
              {
                key: '3',
                icon: <UnorderedListOutlined/>,
                label: <Link to='/home'>Items</Link>,
              },
              {
                key: '4',
                icon: <UserOutlined/>,
                label: <Link to='/home'>Customers</Link>,
              },
              {
                key: '5',
                icon: <LoginOutlined/>,
                label: <Link to='/home'>Logout</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '10px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default App;