import React from 'react';
import { Tabs } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useState, useEffect } from 'react';
import { GetSellerOrders } from '@features/order/model/services/GetSellerOrders';
const text = `
  В разработке
`;

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
      const collapseList = data.map((e) => ({
         key: e.id,
         label: `Заказ № ${e.id}`,
         children: <p>{text}</p>,
         style: panelStyle
      }));

      return collapseList;
   };

   return (
      <Collapse
         bordered={false}
         expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
         )}
         style={{
            background: 'transparent'
         }}
         items={getItems(panelStyle)}
      />
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
