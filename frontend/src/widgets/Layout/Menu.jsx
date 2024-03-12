/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@shared/config/routes';

function getItem(label, key, icon, children, disabled) {
   return {
      key,
      icon,
      children,
      label,
      disabled
   };
}

const items = [
   getItem('Главная', 'main'),
   getItem('Курсы', 'admin-users'),
   getItem('Эксперты', 'instructors'),
   getItem('Статьи', 'articles'),
   getItem('Контакты', 'admin-articles')
];

const MenuComponent = () => {
   const navigate = useNavigate();

   const onClick = (e) => {
      const routeName = e?.key;
      if (!routeName || !RoutePath[routeName]) return;

      navigate(RoutePath[routeName]);
   };

   return (
      <Menu
         mode="horizontal"
         defaultSelectedKeys={['main']}
         items={items}
         onClick={onClick}
         style={{
            minWidth: '300px'
         }}
      />
   );
};

export default MenuComponent;
