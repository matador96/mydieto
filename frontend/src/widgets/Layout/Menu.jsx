/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
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
   getItem('Курсы', 'courses'),
   getItem('Эксперты', 'instructors'),
   getItem('Статьи', 'articles'),
   getItem('Контакты', 'contacts')
];

const MenuComponent = () => {
   const navigate = useNavigate();
   const [current, setCurrent] = useState('main');

   useEffect(() => {
      const path = window.location.pathname.split('/')[1];
      setCurrent(path);
   }, []);

   const onClick = (e) => {
      const routeName = e?.key;
      if (!routeName || !RoutePath[routeName]) return;

      setCurrent(routeName);
      navigate(RoutePath[routeName]);
   };

   return (
      <Menu
         mode="horizontal"
         defaultSelectedKeys={['main']}
         selectedKeys={[current]}
         items={items}
         onClick={onClick}
         style={{
            minWidth: '300px'
         }}
      />
   );
};

export default MenuComponent;
