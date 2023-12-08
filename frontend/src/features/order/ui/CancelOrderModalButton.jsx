import { Button, Modal, Input, Space, message } from 'antd';
import { VerticalSpace } from '@shared/ui';
import { UpdateOrder } from './../model/services/UpdateOrder';
import { useState } from 'react';

const { TextArea } = Input;

const CancelOrderModalButton = ({ orderId, OnCloseModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [text, setText] = useState(null);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const sendUpdate = () => {
      setIsLoading(true);

      const sendObj = {
         status: 'canceled'
      };

      if (text) {
         sendObj.statusComment = text;
      }

      UpdateOrder(sendObj, orderId).then(() => {
         setIsLoading(false);
         setText(null);
         message.success('Заказ отклонен');
         handleCancel();
      });
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      OnCloseModal();
   };

   return (
      <>
         <Button type="primary" onClick={showModal} danger loading={isLoading}>
            Отклонить заказ
         </Button>
         <Modal
            open={isModalOpen}
            onOk={null}
            onCancel={handleCancel}
            title={`Отклонить заказ`}
            footer={null}
            width={600}
            destroyOnClose={true}
         >
            <TextArea
               placeholder="Укажите причину отказа"
               style={{ width: '100%' }}
               value={text}
               onChange={(e) => setText(e.target.value)}
               rows={2}
            />
            <VerticalSpace />
            <Space size="small">
               <Button
                  type="primary"
                  danger
                  onClick={sendUpdate}
                  loading={isLoading}
               >
                  Отклонить заказ
               </Button>
               <Button onClick={handleCancel}>Отмена</Button>
            </Space>
         </Modal>
      </>
   );
};

export default CancelOrderModalButton;
