import React from 'react';
import { InputNumber, message } from 'antd';
import { unitSettings } from '@shared/const/units';
import _ from 'lodash';
import { UpdateOrderItem } from './../model/services/UpdateOrderItem';

const OrderItemPriceInput = ({ value, orderItemId, unit }) => {
   const save = (value) => {
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

   const unitText = `руб/кг`;
   // ${unitSettings.find((e) => e.value === unit).shortLabel}
   const debouncedChange = _.debounce(save, 500);

   return (
      <InputNumber
         min={1}
         step="1"
         defaultValue={value}
         onChange={(value) => debouncedChange(value)}
         addonAfter={unitText}
      />
   );
};

export default OrderItemPriceInput;
