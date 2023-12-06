import React from 'react';
import { Descriptions, Table, Divider, Tag } from 'antd';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { unitSettings } from '@shared/const/units';
import statuses from '@shared/const/statuses';

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
         dataIndex: 'quantity',
         key: 'quantity',
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
                  label="Оценочная стоимость">
                  {order.price} руб.
               </Descriptions.Item>
            )}

            {order.facticalPrice && (
               <Descriptions.Item
                  key={`Фактическая стоимость`}
                  label="Фактическая стоимость">
                  {order.facticalPrice} руб.
               </Descriptions.Item>
            )}
         </Descriptions>

         <Divider orientation="left">Товары</Divider>

         <Table
            columns={columns}
            dataSource={orderItems}
            bordered={false}
            pagination={false}
         />
      </div>
   );
}

export default OrderItemData;
