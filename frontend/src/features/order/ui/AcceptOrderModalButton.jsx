import { Button, Modal, Input, Space, message } from 'antd';
import { VerticalSpace } from '@shared/ui';
import { UpdateOrder } from './../model/services/UpdateOrder';
import { useState } from 'react';

const { TextArea } = Input;

const nextStatuses = {
   onEvaluation: 'onConfirmation',
   onConfirmation: 'waitDelivery',
   waitDelivery: 'finished'
};

const AcceptOrderModalButton = ({ orderId, OnCloseModal, currentStatus, user }) => {
   const isSeller = user.type === 'seller';
   const isAdmin = user.type === 'admin';

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [text, setText] = useState(null);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const sendUpdate = () => {
      setIsLoading(true);

      const sendObj = {
         status: nextStatuses[currentStatus]
      };

      if (text) {
         sendObj.statusComment = text;
      }

      UpdateOrder(sendObj, orderId).then(() => {
         setIsLoading(false);
         setText(null);
         message.success('Заказ переведен в статус на согласование с продавцом');
         handleCancel();
      });
   };
   const handleCancel = () => {
      setIsModalOpen(false);
      OnCloseModal();
   };

   const getText = () => {
      if (isAdmin && currentStatus === 'onEvaluation') {
         return 'Отправить предложение продавцу';
      }

      if (isAdmin && currentStatus === 'waitDelivery') {
         return 'Заказ выполнен';
      }

      if (isSeller && currentStatus === 'onConfirmation') {
         return 'Отлично вызываем курьера';
      }
   };

   return (
      <>
         <Button type="primary" onClick={showModal}>
            {getText()}
         </Button>
         <Modal
            open={isModalOpen}
            onOk={null}
            onCancel={handleCancel}
            title={`Подтвердите свое действие`}
            footer={null}
            width={600}
            destroyOnClose={true}
         >
            <TextArea
               placeholder="Оставьте комментарий если нужно"
               style={{ width: '100%' }}
               value={text}
               onChange={(e) => setText(e.target.value)}
               rows={2}
            />
            <VerticalSpace />
            <Space size="small">
               <Button type="primary" onClick={sendUpdate} loading={isLoading}>
                  {getText()}
               </Button>
               <Button onClick={handleCancel}>Отмена</Button>
            </Space>
         </Modal>
      </>
   );
};

export default AcceptOrderModalButton;
