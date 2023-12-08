import React from 'react';
import { Tabs, Tag, Space } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useState, useEffect } from 'react';
import { VerticalSpace } from '@shared/ui';
import OrderItemData from './OrderItemData';
import { GetOrders } from '@features/order/model/services/GetOrders';
import timestampToNormalDate from '@shared/utils/tsToTime';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import { Typography } from 'antd';
const { Text } = Typography;

const statusTextsForAdmin = {
   onEvaluation: 'Ожидает вашей оценки',
   onConfirmation: 'На согласовании у продавца',
   waitDelivery: 'Ожидаем курьера',
   finished: 'Завершен',
   canceled: 'Отменено'
};

const { Panel } = Collapse;
const OrderList = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const { status } = props;
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });

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

      GetOrders(fetchSettings).then((res) => {
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
         return {
            key: e.id,
            label: (
               <>
                  <Space direction="horizontal">
                     <Text strong>Заказ №{e.id}</Text>
                     <Text type="secondary">
                        от {timestampToNormalDate(e.createdAt)}
                     </Text>

                     {e.seller.firstName && (
                        <Text type="secondary">Продавец: {e.seller.firstName}</Text>
                     )}
                  </Space>
               </>
            ),
            extra: (
               <Text type="secondary">
                  {statusTextsForAdmin[e.orderStatus.status]}
               </Text>
            ),
            children: (
               <OrderItemData
                  fetchOrders={fetchData}
                  order={e}
                  showSellerBlock={true}
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
         </Collapse>{' '}
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

const items = [
   {
      key: null,
      label: 'Все заказы',
      children: <OrderList status={null} />
   },
   {
      key: 'onEvaluation',
      label: 'Ожидают моей оценки',
      children: <OrderList status={'onEvaluation'} />
   },
   {
      key: 'onConfirmation',
      label: 'Ожидают согласия продавца',
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

const OrderTabsAdmin = () => (
   <>
      <Tabs
         className="order-tabs"
         defaultActiveKey="1"
         items={items}
         // type="card"
         style={{ minHeight: '80vh' }}
      />
   </>
);
export default OrderTabsAdmin;
