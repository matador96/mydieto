import React from 'react';
import { Tabs, Tag, Space } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useState, useEffect } from 'react';
import { GetSellerOrders } from '@features/order/model/services/GetSellerOrders';
import OrderItemData from './OrderItemData';
import timestampToNormalDate from '@shared/utils/tsToTime';
import statuses from '@shared/const/statuses';
import { Typography } from 'antd';
const { Text } = Typography;

const text = `
  В разработке
`;

const statusTextsForSeller = {
   onEvaluation: 'Ожидает оценки от покупателя'
};

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
         order: 'desc'
      }).then((res) => {
         setIsLoading(false);
         setData(res.data);
      });
   };

   const getItems = (panelStyle) => {
      const collapseList = data.map((e) => {
         return {
            key: e.id,
            label: (
               <>
                  <Space direction="horizontal">
                     <Text strong>Заказ №{e.id}</Text>
                     <Text type="secondary">
                        от {timestampToNormalDate(e.createdAt)}
                     </Text>
                  </Space>
               </>
            ),
            extra: <Text type="secondary">{statusTextsForSeller[e.status]}</Text>,
            children: <OrderItemData order={e} showSellerBlock={false} />,
            style: panelStyle
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
         style={{ background: 'transparent' }}>
         {collapseItems.map((item) => (
            <Panel
               key={item.key}
               header={item.label}
               extra={item.extra}
               style={item.style}>
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
   <Tabs
      defaultActiveKey="1"
      items={items}
      type="card"
      onChange={onChange}
      style={{ minHeight: '80vh' }}
   />
);
export default OrderTabs;
