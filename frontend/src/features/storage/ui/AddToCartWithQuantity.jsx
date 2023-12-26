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
   const [isAdded, setIsAdded] = useState(false);

   const addToStorage = () => {
      setIsLoading(true);
      AddToStorage({ quantity, catalogId }).then(() => {
         setIsLoading(false);
         message.success(`Добавлено ${quantity} шт в склад`);
         setIsAdded(true);

         setTimeout(() => {
            setIsAdded(false);
         }, 3000);
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
               style={{
                  width: '100px',
                  textAlign: 'center',
                  borderRadius: '10px',
                  border: '1px solid #CED2D6',
                  fontFamily: 'Inter'
               }}
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
         {isAdded ? (
            <Button className="add-storage-button added" type="primary">
               Добавлено
            </Button>
         ) : (
            <Button
               className="add-storage-button"
               type="primary"
               loading={isLoading}
               onClick={addToStorage}>
               Добавить на склад
            </Button>
         )}
      </Space>
   );
};

export default AddToCartWithQuantity;
