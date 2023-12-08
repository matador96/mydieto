import React from 'react';
import { Tabs, Tag, Space } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { VerticalSpace } from '@shared/ui';
import { useState, useEffect } from 'react';
import { GetSellerOrders } from '@features/order/model/services/GetSellerOrders';
import OrderItemData from './OrderItemData';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { Empty } from 'antd';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import { Typography } from 'antd';
const { Text } = Typography;

const statusTextsForSeller = {
   onEvaluation: 'Ожидает оценки от покупателя',
   onConfirmation: 'Согласуйте предложенную цену',
   waitDelivery: 'Ожидаем курьера',
   finished: 'Завершен',
   canceled: 'Отменено'
};

const { Panel } = Collapse;

const OrderList = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });
   const { status } = props;
   const { token } = theme.useToken();
   const panelStyle = {
      marginBottom: 12,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none'
   };

   useEffect(() => {
      fetchData();
   }, [status]);

   const fetchData = (
      current = pagination.current,
      pageSize = pagination.pageSize
   ) => {
      setIsLoading(true);

      const fetchSettings = {
         page: current,
         limit: pageSize,
         sort: 'id',
         order: 'desc'
      };

      if (status) {
         fetchSettings.status = status;
      }
      GetSellerOrders(fetchSettings).then((res) => {
         setIsLoading(false);
         setPagination((prev) => ({
            ...prev,
            total: res.count,
            current,
            pageSize
         }));
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   const getItems = (panelStyle) => {
      const collapseList = data.map((e) => {
         console.log(e)
         return {
            key: e.id,
            label: (
               <Space direction="horizontal">
                  <Text strong>Заказ №{e.id}</Text>
                  <Text type="secondary">
                     от {timestampToNormalDate(e.createdAt)}
                  </Text>
               </Space>
            ),
            extra: (
               <Text type="secondary">
                  {statusTextsForSeller[e.orderStatus.status]}
               </Text>
            ),
            children: (
               <OrderItemData
                  fetchOrders={fetchData}
                  order={e}
                  showSellerBlock={false}
               />
            ),
            style: panelStyle
         };
      });

      return collapseList;
   };
   const collapseItems = getItems(panelStyle);
   return (
      <>
         {collapseItems.length === 0 ? (
            <Empty />
         ) : (
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
         )}

         <VerticalSpace />
         <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!!pagination.total && (
               <Pagination
                  pagination={pagination}
                  onChangePagination={onChangePagination}
                  isLoading={isLoading}
               />
            )}
         </Space>
      </>
   );
};

// label: (
//    <>
//       <Tag color={statuses['onEvaluation']?.color}>22</Tag> Ожидают оценки
//    </>
// ),

const items = [
   {
      key: null,
      label: 'Все',
      children: <OrderList status={null} />
   },
   {
      key: 'onEvaluation',
      label: 'Ожидают оценки покупателя',
      children: <OrderList status={'onEvaluation'} />
   },
   {
      key: 'onConfirmation',
      label: 'Ожидают согласия',
      children: <OrderList status={'onConfirmation'} />
   },
   {
      key: 'waitDelivery',
      label: 'Ожидают курьера',
      children: <OrderList status={'waitDelivery'} />
   },
   {
      key: 'finished',
      label: 'Выполненные',
      children: <OrderList status={'finished'} />
   },
   {
      key: 'canceled',
      label: 'Отмененные',
      children: <OrderList status={'canceled'} />
   }
];

const OrderTabsSeller = () => {
   return (
      <Tabs
         className="order-tabs"
         // tabPosition={'left'}
         defaultActiveKey="1"
         items={items}
         style={{ minHeight: '80vh' }}
      />
   );
};
export default OrderTabsSeller;
