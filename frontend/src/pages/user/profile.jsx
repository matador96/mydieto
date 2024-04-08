/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content, Title } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import Container from '@widgets/Container/ui/Container';

import SettingsIcon from '@shared/assets/icons/SettingsIcon';
import ChatsIcon from '@shared/assets/icons/ChatsIcon';
import CoursesIcon from '@shared/assets/icons/CoursesIcon';
import MedicalCardIcon from '@shared/assets/icons/MedicalCardIcon';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

const menuList = [
   {
      label: 'Мои курсы',
      icon: <CoursesIcon />,
      url: '/profile'
   },
   {
      label: 'Медицинская карта',
      icon: <MedicalCardIcon />,
      url: '/profile'
   },
   {
      label: 'Чаты',
      icon: <ChatsIcon />,
      url: '/profile'
   },
   {
      label: 'Настройки',
      icon: <SettingsIcon />,
      url: '/profile'
   },
   {
      label: 'Админ панель',
      icon: <UserOutlined style={{fontSize: 20}} />,
      url: '/admin/dashboard'
   },
   {
      label: 'Выход',
      icon: <LoginOutlined style={{fontSize: 20}}/>,
      url: '/logout'
   }
];

const ProfilePage = () => {
   const navigate = useNavigate();

   return (
      <Content>
         <Container>
            <div className="profile-page">
               <div className="profile-page_left">
                  <div 
                        className="profile-page_menu">
                  {menuList.map((item, index) => (
                     <div
                     className="profile-page_menu-item"
                        key={index}
                        onClick={() => navigate(`${item.url}`)}>
                        {item.icon}{item.label}
                     </div>
                  ))}
                  </div>
               </div>
               <div className="profile-page_right"></div>
            </div>
         </Container>
      </Content>
   );
};

export default ProfilePage;
