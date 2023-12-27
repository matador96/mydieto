import React, { useState } from 'react';
import {
   Descriptions,
   Table,
   Divider,
   Tag,
   Space,
   Alert,
   Steps,
   Button,
   InputNumber
} from 'antd';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { unitSettings } from '@shared/const/units';
import { VerticalSpace } from '@shared/ui';
import defaulPhotoCard from '@shared/assets/images/platy-meta.jpeg';
import { Typography } from 'antd';
import statuses from '@shared/const/statuses';
import OrderItemPriceInput from './OrderItemPriceInput';
import OrderItemQuantityInput from './OrderItemQuantityInput';
import OrderItemCapacityInput from './OrderItemCapacityInput';

import { statuseTextOfUsersOrders } from '@shared/const/statuses';

import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';
// import OrderProcessingComponent from './OrderProcessingComponent';
import CancelOrderModalButton from './CancelOrderModalButton';
import AcceptOrderModalButton from './AcceptOrderModalButton';
import OrderItemDeleteModalButton from './OrderItemDeleteModalButton';
import OrderItemAddModalButton from './OrderItemAddModalButton';
import WaitCodeWithChildren from './WaitCodeWithChildren';

const { Text } = Typography;

const LastStatusBlock = ({ status, comment, price }) => {
   return (
      <Alert
         description={
            <div>
               <div>
                  <Text type="secondary">
                     {status === 'canceled' ? 'Причина: ' : 'Комментарий: '}
                     {comment || 'Не указано'}
                  </Text>{' '}
               </div>{' '}
               <div>
                  {status === 'finished' ? (
                     <Text>Цена сделки: {price} руб</Text>
                  ) : null}
               </div>
            </div>
         }
         type={status === 'canceled' ? 'error' : 'success'}
         showIcon
      />
   );
};

const UnitPriceTag = ({ price, unit }) => {
   // ${
   //    unitSettings.find((e) => e.value === unit).shortLabel
   // }
   return price ? (
      <Tag bordered={false} color="processing">{`${price} руб/кг`}</Tag>
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

const UnitQuantityComponent = (props) => {
   const { value, orderItemId, unit, orderStatus } = props;

   const auth = useSelector(getUserAuthData);

   const isAdmin = auth.type === 'admin';

   if (isAdmin) {
      if (orderStatus === 'waitDelivery') {
         return <OrderItemQuantityInput {...props} />;
      }
   }

   return (
      <>
         {value} {unitSettings.find((e) => e.value === unit).shortLabel}
      </>
   );
};

const OrderItemCapacityComponent = (props) => {
   const { value, orderStatus } = props;

   const auth = useSelector(getUserAuthData);

   const isAdmin = auth.type === 'admin';

   if (isAdmin) {
      if (orderStatus === 'waitDelivery') {
         return <OrderItemCapacityInput {...props} />;
      }
   }

   return <>{value} кг</>;
};

const AutoPriceGenerate = ({ data }) => {
   if (data.capacity === 0 || data.unitPrice === 0) {
      return 0;
   }

   const price = parseInt(data.capacity * data.unitPrice);

   return <>{price} руб.</>;
};

function OrderItemData({ order, fetchOrders }) {
   const orderItems = order.orderItems;
   const auth = useSelector(getUserAuthData);
   const [priceOfOrder, setPriceOfOrder] = useState(0);

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
               className="storage-background-image"
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
         render: (_, record) => (
            <Space direction="vertical">
               <Text>{record.catalog.name}</Text>
               <Text type="secondary">{record.catalog.parentCatalog.name}</Text>

               <OrderItemDeleteModalButton
                  orderItemId={record.id}
                  onDelete={fetchOrders}
                  userType={auth.type}
                  orderStatus={order.orderStatus.status}
               />
            </Space>
         )
      },
      {
         title: 'Объем',
         dataIndex: 'quantity',
         key: 'quantity',
         render: (_, record) => (
            <UnitQuantityComponent
               orderStatus={order.orderStatus.status}
               value={_}
               orderItemId={record.id}
               unit={record.catalog.unit}
               fetchOrders={fetchOrders}
            />
         )
      },
      {
         title: 'Оценочная стоимость',
         dataIndex: 'unitPrice',
         width: 300,
         key: 'unitPrice',
         render: (_, record) => (
            <UnitPriceComponent
               orderStatus={order.orderStatus.status}
               value={_}
               orderItemId={record.id}
               unit={record.catalog.unit}
               fetchOrders={fetchOrders}
            />
         )
      },
      {
         title: 'Вес',
         dataIndex: 'capacity',
         key: 'capacity',
         render: (_, record) => (
            <OrderItemCapacityComponent
               orderStatus={order.orderStatus.status}
               value={_}
               orderItemId={record.id}
               unit={record.catalog.unit}
               fetchOrders={fetchOrders}
            />
         )
      },
      {
         title: 'Сумма',
         dataIndex: 'poschitat',
         width: 180,
         key: 'poschitat',
         render: (_, record) => <AutoPriceGenerate data={record} />
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
            price={priceOfOrder}
         />
      );

      const CustomAcceptButton = (
         <WaitCodeWithChildren id={order.id}>{AcceptButton}</WaitCodeWithChildren>
      );

      const buttons = {
         seller: {
            onConfirmation: [AcceptButton, CancelButton]
         },
         admin: {
            onEvaluation: [AcceptButton, CancelButton],
            waitDelivery: [CustomAcceptButton, CancelButton]
         }
      };

      return buttons[auth.type][order.orderStatus.status];
   };

   const getStatusOfStep = (curStat) => {
      if (curStat === 'finished') {
         return 'finish';
      }

      if (curStat === 'canceled') {
         return 'error';
      }

      return 'process';
   };

   const getTitleOfStatus = (curStat) => {
      let type = isSeller ? 'seller' : 'admin';

      return statuseTextOfUsersOrders?.[type][curStat] || curStat;
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
         {isAdmin && order.orderStatus.status === 'waitDelivery' ? (
            <>
               <OrderItemAddModalButton order={order} onAdd={fetchOrders} />
               <VerticalSpace />
            </>
         ) : null}
         <Table
            columns={columns}
            dataSource={orderItems}
            bordered={false}
            pagination={false}
            rowKey={(record) => `record-${record.id}${record.createdAt}`}
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
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {order.orderStatus.status === 'waitDelivery' && isAdmin && (
               <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <label style={{ marginRight: '10px' }}> Цена сделки: </label>
                     <InputNumber
                        addonAfter="руб"
                        defaultValue={0}
                        value={priceOfOrder}
                        onChange={(v) => setPriceOfOrder(v)}
                     />
                  </div>
                  <VerticalSpace />
               </>
            )}

            {orderStatusesWithoutActionButtons.includes(order.orderStatus.status) ? (
               <LastStatusBlock
                  status={order.orderStatus.status}
                  comment={order.orderStatus.comment}
                  price={order.price}
               />
            ) : (
               <Space size="small" align="end" direction="horizontal">
                  {getActionButtons()}
               </Space>
            )}
         </div>
         <VerticalSpace />
         <Divider orientation="left">История изменения статусов</Divider>{' '}
         <VerticalSpace />
         <Steps
            direction="vertical"
            current={order.orderStatuses.length}
            status="process"
            items={order.orderStatuses
               .map((e) => ({
                  title: getTitleOfStatus(e.status),
                  color: statuses[e.status]?.color,
                  status: getStatusOfStep(e.status),
                  description: `Комментарий: ${e?.comment || 'Без комментария'}`
               }))
               .reverse()}
         />
         {/* <Timeline
                  style={{ maxWidth: '500px' }}
                  mode="left"
                  items={order.orderStatuses
                     .map((e) => ({
                        label: `${statuses[e.status]?.label}`,
                        color: statuses[e.status]?.color,
                        children: `Комментарий: ${e?.comment || 'Без комментария'}`
                     }))
                     .reverse()}
               /> */}
         {/* )} */}
      </div>
   );
}

export default OrderItemData;
