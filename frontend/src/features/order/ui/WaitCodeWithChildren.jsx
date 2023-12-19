import { Button, Modal, Input, Space, message, Alert } from 'antd';
import { VerticalSpace } from '@shared/ui';
import {
   sendCodeToSellerOrderById,
   checkCodeToSellerOrderById
} from '@shared/api/all/orders';
import { useState } from 'react';

const WaitCodeWithChildren = ({ children, id }) => {
   const [isShow, setIsShow] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [text, setText] = useState(null);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const sendCode = () => {
      setIsLoading(true);

      sendCodeToSellerOrderById(id)
         .then(() => {
            message.success('Код отправлен');
            setIsLoading(false);
            showModal();
         })
         .catch((e) => message.error(e.message))
         .finally(() => setIsLoading(false));
   };

   const checkCode = () => {
      setIsLoading(true);

      checkCodeToSellerOrderById(id, text)
         .then(() => {
            setIsShow(true);
            message.success('Код верен, можете закрывать заказ');
            setIsLoading(false);
         })
         .catch((e) => message.error(e.message))
         .finally(() => setIsLoading(false));
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   if (isShow) {
      return children;
   }

   return (
      <>
         <Alert
            message="Чтобы закрыть заказ нужно подтвердить, кодом который придет на почту продавца"
            description={
               <div>
                  <Button type="primary" onClick={sendCode} loading={isLoading}>
                     Отправить код
                  </Button>
               </div>
            }
            type="info"
            showIcon
         />

         <Modal
            open={isModalOpen}
            onOk={null}
            onCancel={handleCancel}
            title={`Подтвердите код`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <Input
               placeholder="Введите код"
               style={{ width: '100%' }}
               value={text}
               onChange={(e) => setText(e.target.value)}
            />
            <VerticalSpace />
            <Space size="small">
               <Button type="primary" onClick={checkCode} loading={isLoading}>
                  Проверить код
               </Button>
               <Button onClick={handleCancel}>Отмена</Button>
            </Space>
         </Modal>
      </>
   );
};

export default WaitCodeWithChildren;
