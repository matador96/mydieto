import React, { useEffect } from 'react';
import {
   FileTextOutlined,
   UsergroupAddOutlined,
   DashboardOutlined,
   AlignLeftOutlined,
   UnorderedListOutlined,
   InboxOutlined,
   ShoppingOutlined,
   ShoppingCartOutlined
} from '@ant-design/icons';
import { Menu, Layout, Badge } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RoutePath, routeList } from '@shared/config/routes';
import Container from '@widgets/Container';

import { SIDEBAR_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { MenuProfile } from '@shared/ui/MenuProfile';
import { useSelector } from 'react-redux';
import { getUserPermissions } from '@entitles/User';
import DrawerCart from '@features/cart/ui/DrawerCart';
import {
   getLocalStorageByKey,
   setLocalStorageByKey
} from '@shared/lib/localStorage';
import { getCartCount } from '@entitles/Cart';

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
   // getItem('Панель', 'dashboard', <DashboardOutlined />),
   // getItem('Пользователи', 'users', <UsergroupAddOutlined />),
   // getItem('Продавцы', 'users', <UsergroupAddOutlined />),
   // getItem('Журнал действий', 'logs', <AlignLeftOutlined />),

   getItem('Каталог плат и деталей', 'seller-catalogs', <UnorderedListOutlined />),
   getItem('Мои заказы', 'seller-orders', <ShoppingOutlined />)
   // getItem('Мои заказы', 'seller-leads', <UsergroupAddOutlined />)
];

const SellerLayout = (props) => {
   const navigate = useNavigate();
   const location = useLocation();

   const cartCount = useSelector(getCartCount);
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
         <Layout>
            {' '}
            <Header style={{ padding: '0' }} className="erp-header-seller">
               <Container>
                  <div className="erp-header-seller-items">
                     {' '}
                     <div className="header-logo" onClick={() => navigate('/')}>
                        РЭЛ
                     </div>
                     <Menu
                        onClick={onClick}
                        mode="horizontal"
                        items={actualItems}
                        className="menu"
                        selectedKeys={selectedRoute}
                        defaultSelectedKeys={selectedRoute}
                     />{' '}
                     <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                           className="header-button"
                           onClick={() => navigate(`/seller/storage`)}
                        >
                           <InboxOutlined />

                           <span className="header-button_label">Моя склад</span>
                        </div>

                        <DrawerCart
                           button={
                              <div className="header-button">
                                 <Badge
                                    showZero
                                    count={cartCount}
                                    size="small"
                                    status="success"
                                 >
                                    <ShoppingCartOutlined />
                                 </Badge>
                                 <span className="header-button_label">Корзина</span>
                              </div>
                           }
                        />

                        <MenuProfile isCollapsed={collapsed} />
                     </div>
                  </div>
               </Container>
            </Header>{' '}
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
                  <Container> {props.children} </Container>
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
export default SellerLayout;
