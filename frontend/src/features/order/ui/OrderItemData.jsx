import React from 'react';
import { Descriptions, Table, Divider, Tag } from 'antd';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { unitSettings } from '@shared/const/units';
import statuses from '@shared/const/statuses';
// import OrderProcessingComponent from './OrderProcessingComponent';
import CourierForm from './OrderProcessingComponent';
import OrderCostForm from './OrderCostForm';

function OrderItemData({ order }) {
   const orderItems = order.orderItems.map((item) => ({ ...item, ...item.catalog }));

   const columns = [
      {
         title: 'Наименование',
         dataIndex: 'name',
         key: 'name'
      },
      {
         title: 'Объем',
         dataIndex: 'capacity',
         key: 'capacity',
         render: (_, record) => (
            <>
               {_} {unitSettings.find((e) => e.value === record.unit).shortLabel}
            </>
         )
      }
   ];

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

            <Descriptions.Item key={`Статус`} label="Статус">
               <Tag color={statuses[order.status]?.color}>
                  {statuses[order.status]?.label}
               </Tag>
            </Descriptions.Item>

            {order.price && (
               <Descriptions.Item
                  key={`Оценочная стоимость`}
                  label="Оценочная стоимость"
               >
                  {order.price} руб.
               </Descriptions.Item>
            )}

            {order.factPrice && (
               <Descriptions.Item
                  key={`Фактическая стоимость`}
                  label="Фактическая стоимость"
               >
                  {order.factPrice} руб.
               </Descriptions.Item>
            )}
         </Descriptions>

         <Table
            columns={columns}
            dataSource={orderItems}
            bordered={false}
            pagination={false}
         />
         <CourierForm style={{ marginBottom: '50px' }} />
      </div>
   );
}

export default OrderItemData;
