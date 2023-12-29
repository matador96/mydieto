import React from 'react';
import { InputNumber, message } from 'antd';
import _ from 'lodash';
import { unitSettings } from '@shared/const/units';
import { UpdateOrderItem } from './../model/services/UpdateOrderItem';

const OrderItemQuantityInput = ({ value, orderItemId, unit, fetchOrders }) => {
   const save = (value) => {
      // const isInteger = /^[0-9]+$/;

      // if (!isInteger.test(value)) {
      //    message.warning('Ошибка сохранения, введите целое число');
      //    return;
      // }

      UpdateOrderItem(orderItemId, { quantity: value })
         .then(() => {
            message.success('Объем изменен');
            fetchOrders();
         })
         .catch((e) => message.error(e.message));
   };

   const unitText = `${unitSettings.find((e) => e.value === unit).shortLabel}`;
   const debouncedChange = _.debounce(save, 500);

   return (
      <InputNumber
         style={{ width: '130px' }}
         min={0}
         defaultValue={value}
         step="1"
         onChange={(value) => debouncedChange(value)}
         addonAfter={unitText}
      />
   );
};

export default OrderItemQuantityInput;
