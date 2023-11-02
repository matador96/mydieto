import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Tag } from 'antd';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';

const MenuProfile = ({ isCollapsed }) => {
   const navigate = useNavigate();
   const userData = useSelector(getUserAuthData);

   return (
      <div
         className="menu-profile"
         onClick={() => navigate(`/${userData.type}/profile`)}>
         {[userData].map((user) => (
            <React.Fragment key={`user-${user}`}>
               <Avatar
                  className="menu-profile_avatar"
                  shape="square"
                  style={{ backgroundColor: 'transparent' }}
                  icon={<UserOutlined />}
                  size="large"
               />
               {!isCollapsed && (
                  <div className="menu-profile-info">
                     <span className="menu-profile-info_login">{user.email}</span>

                     <Tag className="menu-profile-info_role">{userData.type}</Tag>
                  </div>
               )}
            </React.Fragment>
         ))}
      </div>
   );
};

export { MenuProfile };
