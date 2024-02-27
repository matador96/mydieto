import React from 'react';
import { Dropdown, Space } from 'antd';
import { getUserAuthData } from '@entitles/User';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

const ProfileMenu = ({ adminMode }) => {
   const authData = useSelector(getUserAuthData);
   const navigate = useNavigate();

   const userItems = [
      {
         label: <a onClick={() => navigate('/profile')}>Мой профиль</a>,
         key: '1'
      },
      {
         label: <a onClick={() => navigate('/profile/articles')}>Мои статьи</a>,
         key: '2'
      },
      {
         type: 'divider'
      },
      {
         label: <a onClick={() => navigate('/admin/dashboard')}>Админ панель</a>,
         key: '3'
      },
      {
         label: <a onClick={() => navigate('/logout')}>Выйти</a>,
         key: '4'
      }
   ];

   const adminItems = [
      {
         label: <a onClick={() => navigate('/')}>Вернутся на сайт</a>,
         key: '3'
      },
      {
         label: <a onClick={() => navigate('/logout')}>Выйти</a>,
         key: '4'
      }
   ];

   return (
      <Dropdown
         menu={{ items: adminMode ? adminItems : userItems }}
         trigger={['click']}>
         <a onClick={(e) => e.preventDefault()}>
            <Space>
               {authData?.email}
               <DownOutlined />
            </Space>
         </a>
      </Dropdown>
   );
};

export default ProfileMenu;
