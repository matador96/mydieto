import React, { useState } from 'react';
import { Space, InputNumber, Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from '@shared/ui';

import { AddToStorage } from '@features/storage/model/AddToStorage';
import { message } from 'antd';
import { unitSettings } from '@shared/const/units';

const AddToCartWithQuantity = ({ catalogId, unit }) => {
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
      <Space
         style={{
            padding: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            height: '86px',
            justifyContent: 'space-between'
         }}>
         <div
            style={{
               width: '215px',
               display: 'flex',
               justifyContent: 'space-around'
            }}>
            <MinusOutlined
               disabled={quantity === 1}
               onClick={() => setQuantity((prev) => prev - 1)}
               style={{
                  color: 'rgba(29, 27, 32, 1)',

                  fontSize: '20px'
               }}
            />

            <Input
               style={{ width: '100px', textAlign: 'center' }}
               min={1}
               default={1}
               // addonAfter={unitSettings.find((e) => e.value === unit).shortLabel}
               value={quantity}
               disabled={isLoading && quantity === 1}
               onChange={(v) => setQuantity(v)}
            />

            <PlusOutlined
               onClick={() => setQuantity((prev) => prev + 1)}
               style={{
                  color: 'rgba(29, 27, 32, 1)',

                  fontSize: '20px'
               }}
            />
         </div>
         <Button
            style={{
               backgroundColor: 'rgba(47, 148, 97, 1)',
               borderRadius: '10px',
               width: '210px',
               height: '40px',
               boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.12)',

               boxShadow: '0px 0px 0px 1px rgba(103, 110, 118, 0.16)',

               boxShadow: '0px 2px 5px 0px rgba(103, 110, 118, 0.08)'
            }}
            type="primary"
            loading={isLoading}
            onClick={addToStorage}>
            Добавить на склад
         </Button>
      </Space>
   );
};

export default AddToCartWithQuantity;
