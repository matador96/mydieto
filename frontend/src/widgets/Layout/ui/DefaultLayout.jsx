import React from 'react';
import { Layout } from 'antd';
import ProfileMenu from '@features/user/ui/ProfileMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@shared/assets/images/logo.png';
import Container from '@widgets/Container';
import Footer from '@widgets/Custom/Footer';
import MenuComponent from '@widgets/Layout/Menu';

const { Content, Header } = Layout;

const SellerLayout = (props) => {
   const navigate = useNavigate();
   const location = useLocation();

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
            <Header className="dieto-header">
               <Container>
                  <div className="dieto-header-items">
                     <div
                        className="logo"
                        onClick={() => navigate('/')}
                        style={{
                           backgroundImage: `url(${logo})`
                        }}
                     />

                     <div className="menu-items">
                        <MenuComponent />
                     </div>

                     <div>
                        <ProfileMenu />
                     </div>
                  </div>
               </Container>
            </Header>{' '}
            <Content>{props.children}</Content>
            <Footer />
         </Layout>
      </Layout>
   );
};
export default SellerLayout;
