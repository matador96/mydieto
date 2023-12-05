import React from 'react';
import { Tabs } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useState, useEffect } from 'react';
import { GetSellerOrders } from '@features/order/model/services/GetSellerOrders';
import OrderItemData from './OrderItemData';
const text = `
  В разработке
`;
const { Panel } = Collapse;
const OrderList = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const { token } = theme.useToken();
   const panelStyle = {
      marginBottom: 12,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none'
   };

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetSellerOrders({
         limit: 1000,
         sort: 'id',
         order: 'asc'
      }).then((res) => {
         setIsLoading(false);
         setData(res.data);
      });
   };

   const getItems = (panelStyle) => {
      const collapseList = data.map((e) => {
         const dateObject = new Date(e.createdAt);

         const year = dateObject.getFullYear();
         const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
         const day = dateObject.getDate().toString().padStart(2, '0');

         const hours = dateObject.getHours().toString().padStart(2, '0');
         const minutes = dateObject.getMinutes().toString().padStart(2, '0');

         const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

         return {
            key: e.id,
            label: `Заказ № ${e.id} от ${formattedDate}`,
            extra: `${e.price}р`,
            children: <OrderItemData order={e} />,
            style: { ...panelStyle, color: 'red' }
         };
      });

      return collapseList;
   };
   const collapseItems = getItems(panelStyle);
   return (
      <Collapse
         bordered={false}
         expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
         )}
         style={{ background: 'transparent' }}
      >
         {collapseItems.map((item) => (
            <Panel
               key={item.key}
               header={item.label}
               extra={item.extra}
               style={item.style}
            >
               {item.children}
            </Panel>
         ))}
      </Collapse>
   );
};

const onChange = (key) => {
   console.log(key);
};

const items = [
   {
      key: '1',
      label: 'Все заказы',
      children: <OrderList />
   },
   {
      key: '2',
      label: 'Ожидают моей оценки',
      children: text
   },
   {
      key: '3',
      label: 'Ожидают согласия продавца',
      children: text
   },
   {
      key: '4',
      label: 'Ожидают курьера',
      children: text
   },
   {
      key: '5',
      label: 'Выполненные',
      children: text
   },
   {
      key: '6',
      label: 'Отмененные',
      children: text
   }
];

const OrderTabs = () => (
   <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default OrderTabs;
