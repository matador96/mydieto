/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Menu } from 'antd';

const items = [
   { label: 'Главная', key: '1' },
   { label: 'Курсы', key: '2' }
];

const MenuComponent = () => {
   return (
      <Menu
         mode="horizontal"
         defaultSelectedKeys={['2']}
         items={items}
         style={{
            minWidth: '300px'
         }}
      />
   );
};

export default MenuComponent;
