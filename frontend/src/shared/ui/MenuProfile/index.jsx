import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';
import profileIcon from '../../assets/images/profile.svg';
const userType = {
   seller: 'Продавец',
   admin: 'Администратор'
};

const MenuProfile = ({ isCollapsed }) => {
   const navigate = useNavigate();
   const userData = useSelector(getUserAuthData);

   return (
      <div
         className="menu-items"
         onClick={() => navigate(`/${userData.type}/profile`)}>
         <img style={{ width: '24px', height: '24px' }} src={profileIcon} />
         <span className="menu-profile-info_login">Профиль</span>
      </div>
   );
};

export { MenuProfile };
