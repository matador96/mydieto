import React from 'react';
import { InputNumber, message } from 'antd';
import _ from 'lodash';
import { UpdateOrderItem } from './../model/services/UpdateOrderItem';

const OrderItemCapacityInput = ({ value, orderItemId }) => {
   const save = (value) => {
      // const isInteger = /^[0-9]+$/;

      // if (!isInteger.test(value)) {
      //    message.warning('Ошибка сохранения, введите целое число');
      //    return;
      // }

      UpdateOrderItem(orderItemId, { capacity: value })
         .then(() => {
            message.success('Вес изменен');
         })
         .catch((e) => message.error(e.message));
   };

   const unitText = `кг`;
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

export default OrderItemCapacityInput;
