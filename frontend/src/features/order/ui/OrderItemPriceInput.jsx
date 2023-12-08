import React from 'react';
import { InputNumber, message } from 'antd';
import { unitSettings } from '@shared/const/units';
import { UpdateOrderItem } from './../model/services/UpdateOrderItem';

const OrderItemPriceInput = ({ value, orderItemId, unit }) => {
   const onChange = (value) => {
      const isInteger = /^[0-9]+$/;

      if (!isInteger.test(value)) {
         message.warning('Ошибка сохранения, введите целое число');
         return;
      }

      UpdateOrderItem(orderItemId, { unitPrice: value })
         .then(() => {
            message.success('Цена выставлена');
         })
         .catch((e) => message.error(e.message));
   };

   const unitText = `руб/${unitSettings.find((e) => e.value === unit).shortLabel}`;

   return (
      <InputNumber
         min={1}
         step="1"
         defaultValue={value}
         onChange={onChange}
         addonAfter={unitText}
      />
   );
};

export default OrderItemPriceInput;
