import React, { useEffect } from 'react';
import {
   DashboardOutlined,
   UnorderedListOutlined,
   HddOutlined,
   ContainerOutlined
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RoutePath, routeList } from '@shared/config/routes';
import { SIDEBAR_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { MenuProfile } from '@shared/ui/MenuProfile';
import { useSelector } from 'react-redux';
import { getUserPermissions } from '@entitles/User';
import {
   getLocalStorageByKey,
   setLocalStorageByKey
} from '@shared/lib/localStorage';

const { Footer, Sider, Content, Header } = Layout;

function getItem(label, key, icon, children, disabled) {
   return {
      key,
      icon,
      children,
      label,
      disabled
   };
}
const allMenuItems = [
   getItem('Панель', 'admin-dashboard', <DashboardOutlined />),
   // getItem('Пользователи', 'users', <UsergroupAddOutlined />),
   // getItem('Продавцы', 'users', <UsergroupAddOutlined />),
   // getItem('Заявки', 'users', <UsergroupAddOutlined />),
   // getItem('Журнал действий', 'logs', <AlignLeftOutlined />),

   getItem('Каталог', 'admin-catalogs', <UnorderedListOutlined />),
   getItem('Заказы', 'admin-orders', <ContainerOutlined />),
   getItem('Склады', 'admin-sellers-storage', <HddOutlined />)
];

const AdminLayout = (props) => {
   const navigate = useNavigate();
   const location = useLocation();
   const [collapsed, setCollapsed] = useState(false);
   const permissions = useSelector(getUserPermissions);

   useEffect(() => {
      getLocalStorageByKey(SIDEBAR_LOCALSTORAGE_KEY).then((res) => {
         if (res) {
            setCollapsed(res === 'true');
         }
      });
   }, []);

   const onCollapse = (value) => {
      setCollapsed(value);
      setLocalStorageByKey(SIDEBAR_LOCALSTORAGE_KEY, value);
   };

   const onClick = (e) => {
      const routeName = e?.key;
      if (!routeName || !RoutePath[routeName]) return;

      navigate(RoutePath[routeName]);
   };

   let pathName = location.pathname.replace('/', '');

   if (pathName.includes('/')) {
      pathName = pathName.split('/')[0];
   }

   const selectedRoute = RoutePath[pathName] ? [pathName] : null;

   const actualItems = allMenuItems.filter((item) =>
      // Думаю в будущем придется и вложенные категории также фильтровать
      routeList[item?.key]?.permission
         ? permissions.includes(routeList[item?.key]?.permission)
         : true
   );

   return (
      <Layout
         style={{
            minHeight: '100vh'
         }}
      >
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={false}
            className="left-sider-menu"
         >
            <div
               className={`left-side-logo ${collapsed ? 'collapsed' : ''}`}
               onClick={() => navigate('/')}
            >
               РЭЛ
            </div>
            <Menu
               onClick={onClick}
               mode="inline"
               items={actualItems}
               className="menu"
               selectedKeys={selectedRoute}
               defaultSelectedKeys={selectedRoute}
            />
         </Sider>
         <Layout>
            <Header className="erp-header">
               <div />

               <div style={{ display: 'flex' }}>
                  <MenuProfile isCollapsed={collapsed} />
               </div>
            </Header>
            <Content
               style={{
                  margin: '0 16px'
               }}
            >
               <div
                  style={{
                     padding: '0 24px',
                     minHeight: 360
                  }}
               >
                  {props.children}
               </div>
            </Content>
            <Footer
               style={{
                  textAlign: 'center'
               }}
            >
               © 2022 – {new Date().getFullYear()} Ecorium. Все права защищены.
            </Footer>
         </Layout>
      </Layout>
   );
};
export default AdminLayout;
