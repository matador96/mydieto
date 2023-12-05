import React from 'react';
import { Input, Button } from 'antd';

const CourierForm = () => {
   return (
      <div style={{ color: '#474a53;' }}>
         <h3>Оформление курьера</h3>
         <label>Фактическая стоимость заказа</label>
         <div className="input-wrapper">
            <Input
               size="large"
               placeholder="Фактическая стоимость заказа"
               className="with-icon"
            />
            <Button
               style={{ backgroundColor: 'rgb(32, 178, 170)', marginLeft: '8px' }}>
               Заказ выполнен
            </Button>
         </div>
         <label>Причина отказа</label>
         <div id="input-refusal" className="input-wrapper">
            <Input
               size="large"
               placeholder="Введите причину отказа"
               className="with-icon"
            />
            <Button style={{ backgroundColor: 'red', marginLeft: '8px' }}>
               Отклонить заказ
            </Button>
         </div>
      </div>
   );
};

export default CourierForm;
