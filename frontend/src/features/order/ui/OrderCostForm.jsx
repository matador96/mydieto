import React from 'react';
import { Input, Button } from 'antd';

const OrderCostForm = () => {
   return (
      <div>
         <h3>Оценка заказа</h3>
         <p>
            Оцените предварительно заказ на основе данных, которые предоставил
            продавец. Или откажите в покупке с указанием причины.
         </p>
         <div className="input-wrapper">
            <Input
               size="large"
               placeholder="Оценочная стоимость заказа"
               className="with-icon"
            />
            <Button
               style={{ backgroundColor: 'rgb(32, 178, 170)', width: '' }}
               type="primary">
               Отправить предложение продавцу
            </Button>
         </div>
         <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
            className="input-wrapper">
            <Input size="large" className="with-icon" placeholder="Причина отказа" />
            <Button style={{ backgroundColor: 'red' }} type="danger">
               Отклонить заказ
            </Button>
         </div>
      </div>
   );
};

export default OrderCostForm;
