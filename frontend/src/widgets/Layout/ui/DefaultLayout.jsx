import React, { useEffect } from 'react';
import { Layout, Button } from 'antd';
import { isUserAuthorized } from '@entitles/User';
import ProfileMenu from '@features/user/ui/ProfileMenu';

import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@widgets/Container';
import { useSelector } from 'react-redux';

const { Footer, Content, Header } = Layout;

const SellerLayout = (props) => {
   const navigate = useNavigate();
   const location = useLocation();

   const isAuthorized = useSelector(isUserAuthorized);

   useEffect(() => {
      if (isAuthorized) {
         navigate(`/`);
      }
   }, [isAuthorized]);

   let pathName = location.pathname.replace('/', '');

   if (pathName.includes('/')) {
      pathName = pathName.split('/')[0];
   }

   return (
      <Layout
         style={{
            minHeight: '100vh'
         }}>
         <Layout style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
            {' '}
            <Header className="erp-header-seller">
               <Container>
                  <div className="erp-header-seller-items">
                     <div className="search-container">
                        <p className="header-logo" onClick={() => navigate('/')}>
                           ALTUN
                        </p>
                     </div>
                     <div className="menu-container">
                        {isUserAuthorized ? (
                           <ProfileMenu />
                        ) : (
                           <Button onClick={() => navigate('/login')}>Войти</Button>
                        )}
                     </div>
                  </div>
               </Container>
            </Header>{' '}
            <Content
               style={{
                  margin: '0 16px'
               }}>
               <div
                  style={{
                     padding: '0 24px',
                     minHeight: 360,
                     marginTop: '50px'
                  }}>
                  <Container> {props.children} </Container>
               </div>
            </Content>
            <Footer
               style={{
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  color: '#797B7A',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '24px'
               }}>
               © 2022 – {new Date().getFullYear()} Altun. Все права защищены.
            </Footer>
         </Layout>
      </Layout>
   );
};
export default SellerLayout;
