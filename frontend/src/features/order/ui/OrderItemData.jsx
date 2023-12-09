import React from 'react';
import { Descriptions, Table, Divider, Tag, Space, Alert } from 'antd';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { unitSettings } from '@shared/const/units';
import { VerticalSpace } from '@shared/ui';
import defaulPhotoCard from '@shared/assets/images/platy-meta.jpeg';
import { Typography } from 'antd';
import statuses from '@shared/const/statuses';
import OrderItemPriceInput from './OrderItemPriceInput';

import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';
import { Timeline } from 'antd';
// import OrderProcessingComponent from './OrderProcessingComponent';
import CancelOrderModalButton from './CancelOrderModalButton';
import AcceptOrderModalButton from './AcceptOrderModalButton';

import OrderGradeSuccess from './OrderGradeSuccess';

const { Text } = Typography;

const LastStatusBlock = ({ status, comment }) => {
   return (
      <Alert
         description={
            <div>
               <div>
                  <Text type="secondary">
                     {status === 'canceled' ? 'Причина: ' : 'Комментарий: '}
                     {comment || 'Не указано'}
                  </Text>
               </div>
            </div>
         }
         type={status === 'canceled' ? 'error' : 'success'}
         showIcon
      />
   );
};

const UnitPriceTag = ({ price, unit }) => {
   return price ? (
      <Tag bordered={false} color="processing">{`${price} руб/${
         unitSettings.find((e) => e.value === unit).shortLabel
      }`}</Tag>
   ) : (
      <Tag bordered={false}>Не оценено</Tag>
   );
};

const UnitPriceComponent = (props) => {
   const { value, orderItemId, unit, orderStatus } = props;

   const auth = useSelector(getUserAuthData);

   const isSeller = auth.type === 'seller';
   const isAdmin = auth.type === 'admin';

   if (isAdmin) {
      if (orderStatus === 'onEvaluation' || orderStatus === 'waitDelivery') {
         // onEvaluation Admin
         return <OrderItemPriceInput {...props} />;
      }
   }

   if (isSeller) {
      if (orderStatus === 'onEvaluation') {
         // onEvaluation Seller
         return <Tag bordered={false}>Ожидает оценки</Tag>;
      }
   }

   if (
      orderStatus === 'waitDelivery' ||
      orderStatus === 'onConfirmation' ||
      orderStatus === 'finished' ||
      orderStatus === 'canceled'
   ) {
      return <UnitPriceTag price={value} unit={unit} />;
   }

   return null;
};

function OrderItemData({ order, fetchOrders }) {
   const orderItems = order.orderItems;

   const auth = useSelector(getUserAuthData);

   const isSeller = auth.type === 'seller';
   const isAdmin = auth.type === 'admin';

   const columns = [
      {
         title: '',
         dataIndex: 'img',
         key: 'img',
         width: '100px',
         render: (_, record) => (
            <div
               className="orders-table-img"
               style={{
                  backgroundImage: `url(${record.catalog.imgUrl || defaulPhotoCard})`
               }}
            />
         )
      },
      {
         title: 'Наименование',
         dataIndex: 'name',
         key: 'name',
         render: (_, record) => record.catalog.name
      },
      {
         title: 'Объем',
         dataIndex: 'quantity',
         key: 'quantity',
         render: (_, record) => (
            <>
               {_}{' '}
               {unitSettings.find((e) => e.value === record.catalog.unit).shortLabel}
            </>
         )
      },
      {
         title: 'Оценочная стоимость за единицу',
         dataIndex: 'unitPrice',
         width: 300,
         key: 'unitPrice',
         render: (_, record) => (
            <UnitPriceComponent
               orderStatus={order.orderStatus.status}
               value={_}
               orderItemId={record.id}
               unit={record.catalog.unit}
            />
         )
      }
   ];

   const orderStatusesWithoutActionButtons = ['finished', 'canceled'];

   const getActionButtons = () => {
      const CancelButton = (
         <CancelOrderModalButton OnCloseModal={fetchOrders} orderId={order.id} />
      );

      const AcceptButton = (
         <AcceptOrderModalButton
            user={auth}
            OnCloseModal={fetchOrders}
            orderId={order.id}
            currentStatus={order.orderStatus.status}
         />
      );

      const buttons = {
         seller: {
            onConfirmation: [AcceptButton, CancelButton]
         },
         admin: {
            onEvaluation: [AcceptButton, CancelButton],
            waitDelivery: [AcceptButton, CancelButton]
         }
      };

      return buttons[auth.type][order.orderStatus.status];
   };

   return (
      <div>
         <Divider orientation="left">Заказ</Divider>

         <Descriptions>
            <Descriptions.Item key={`Номер`} label="Номер">
               {order.id}
            </Descriptions.Item>
            <Descriptions.Item key={`Дата`} label="Дата">
               {timestampToNormalDate(order.createdAt)}
            </Descriptions.Item>

            {/* <Descriptions.Item key={`Статус`} label="Статус">
               <Tag color={statuses[order.orderStatus.status]?.color}>
                  {statuses[order.orderStatus.status]?.label}
               </Tag>
            </Descriptions.Item> */}

            <Descriptions.Item key={`Адрес`} label="Адрес">
               <Space direction="vertical">
                  {order.address.address}
                  <Text type="secondary">Комментарий: {order.address.comment}</Text>
                  <Text type="secondary">Примечение: {order.address.name}</Text>
               </Space>
            </Descriptions.Item>
         </Descriptions>

         <Divider orientation="left">Продавец</Divider>

         <Descriptions>
            <Descriptions.Item key={`ФИО`} label="ФИО">
               {order.seller.firstName} {order.seller.lastName}
            </Descriptions.Item>

            <Descriptions.Item key={`Телефон`} label="Телефон">
               {order.seller.mobile}
            </Descriptions.Item>
         </Descriptions>

         <Divider orientation="left">Товары</Divider>

         {order.orderStatus.status === 'onConfirmation' && isSeller && (
            <>
               <Alert
                  message="Внимание, цена указывается за килограмм неповрежденного товара."
                  type="info"
                  showIcon
               />
               <VerticalSpace />
            </>
         )}

         <Table
            columns={columns}
            dataSource={orderItems}
            bordered={false}
            pagination={false}
         />

         {/* <OrderGradeSuccess currentStatus={order.orderStatus.status} /> */}

         <VerticalSpace />

         {order.orderStatus.status === 'onEvaluation' && isAdmin && (
            <>
               <Alert
                  message="Не забудьте указать оценочную стоимость для товаров"
                  type="info"
                  showIcon
               />
               <VerticalSpace />
            </>
         )}

         {orderStatusesWithoutActionButtons.includes(order.orderStatus.status) ? (
            <LastStatusBlock
               status={order.orderStatus.status}
               comment={order.orderStatus.comment}
            />
         ) : (
            <Space size="small" align="end" direction="horizontal">
               {getActionButtons()}
            </Space>
         )}

         {isAdmin && (
            <>
               <VerticalSpace />
               <Divider orientation="left">История изменения статусов</Divider>{' '}
               <VerticalSpace />
               <Timeline
                  style={{ maxWidth: '500px' }}
                  mode="left"
                  items={order.orderStatuses
                     .map((e) => ({
                        label: `${statuses[e.status]?.label}`,
                        color: statuses[e.status]?.color,
                        children: `Комментарий: ${e?.comment || 'Без комментария'}`
                     }))
                     .reverse()}
               />
            </>
         )}
      </div>
   );
}

export default OrderItemData;
