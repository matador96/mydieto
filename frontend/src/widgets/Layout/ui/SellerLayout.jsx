import React, { useEffect } from 'react';
import {
   FileTextOutlined,
   UsergroupAddOutlined,
   DashboardOutlined,
   AlignLeftOutlined,
   UnorderedListOutlined,
   InboxOutlined,
   CloseCircleOutlined,
   ShoppingOutlined,
   ShoppingCartOutlined,
   SearchOutlined
} from '@ant-design/icons';
import { Menu, Layout, Badge, Input, Button, Image } from 'antd';
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
import StorageCounter from '@features/storage/ui/StorageCounter';
import Head from '../Head';

import buttonCatalogIcon from '@shared/assets/images/Stroke.svg';
import cartIcon from '@shared/assets/images/cart.svg';
import searchIcon from '@shared/assets/images/search.svg';
import clearSearchInput from '@shared/assets/images/clearSearchInput.svg';
import { OrderIconComponent } from '../../../shared/ui/Order';
const { Footer, Content, Header } = Layout;

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
   getItem('аказы', 'seller-orders', <ShoppingOutlined />)
   // getItem('Мои заказы', 'seller-leads', <UsergroupAddOutlined />)
];

const SellerLayout = (props) => {
   const [value, setValue] = useState('');
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

   const MyIcon = () => <img src={searchIcon} />;

   return (
      <Layout
         style={{
            minHeight: '100vh'
         }}>
         <Layout>
            {' '}
            <Head />
            <Header className="erp-header-seller">
               {/* <Container  }}> */}
               <div className="erp-header-seller-items">
                  {' '}
                  <div className="search-container">
                     <p className="header-logo" onClick={() => navigate('/')}>
                        РЭЛ
                     </p>
                     <Button
                        className="catalog-button-container"
                        onClick={() => navigate('/')}>
                        <div className="button-catalog">
                           <img className='button-catalog-icon' src={buttonCatalogIcon} alt="ascasc" />
                           <p>Каталог</p>
                        </div>
                     </Button>
                     <div className="search-container-input">
                        <Input
                           className="custom-search-input"
                           placeholder="Введите запрос"
                        />
                        <div className="clear-search-button-container">
                           <img
                              className="clear-icon-input"
                              src={clearSearchInput}
                           />
                           <Button
                              icon={<MyIcon />}
                              size="large"
                              className="search-button-input"
                           />
                        </div>
                     </div>
                  </div>
                  <div className="menu-container">
                     <StorageCounter />

                     <DrawerCart
                        button={
                           <div className="menu-items">
                              <Badge showZero count={cartCount} status="success">
                                 <img
                                    style={{ width: '24px', height: '24px' }}
                                    src={cartIcon}
                                 />
                              </Badge>
                                 <span className="menu-profile-info_login">
                                    Корзина
                                 </span>
                           </div>
                        }
                     />

                     <OrderIconComponent />
                     <MenuProfile isCollapsed={collapsed} />
                  </div>
               </div>
            </Header>{' '}
            <Content
               style={{
                  margin: '0 16px'
               }}>
               <div
                  style={{
                     padding: '0 24px',
                     minHeight: 360
                  }}>
                  <Container> {props.children} </Container>
               </div>
            </Content>
            <Footer
               style={{
                  textAlign: 'center'
               }}>
               © 2022 – {new Date().getFullYear()} Ecorium. Все права защищены.
            </Footer>
         </Layout>
      </Layout>
   );
};
export default SellerLayout;
