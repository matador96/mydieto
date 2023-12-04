import React, { useState } from 'react';
import { Space, InputNumber } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button } from '@shared/ui';

import { AddToStorage } from '@features/storage/model/AddToStorage';
import { message } from 'antd';

const AddToCartWithQuantity = ({ catalogId }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [quantity, setQuantity] = useState(1);

   const addToStorage = () => {
      setIsLoading(true);
      AddToStorage({ quantity, catalogId }).then(() => {
         setIsLoading(false);
         message.success(`Добавлено ${quantity} шт в склад`);
      });
   };

   return (
      <Space>
         <InputNumber
            min={1}
            max={100}
            default={1}
            value={quantity}
            disabled={isLoading}
            onChange={(v) => setQuantity(v)}
         />

         <Button
            type="primary"
            icon={<InboxOutlined />}
            loading={isLoading}
            onClick={addToStorage}
         >
            В склад
         </Button>
      </Space>
   );
};

export default AddToCartWithQuantity;
