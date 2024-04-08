import { Button, Drawer } from 'antd';
import { useState } from 'react';
import CreateOrEditReview from './CreateOrEditReview';

import { PlusOutlined } from '@ant-design/icons';

const ModalButtonReviewCreate = ({ closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   return (
      <>
         <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Создать
         </Button>
         <Drawer
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            onClose={handleCancel}
            title={`Создать review`}
            footer={null}
            width={800}
            destroyOnClose={true}
            extra={<Button onClick={handleCancel}>Закрыть</Button>}>
            <CreateOrEditReview id={null} callbackOnSuccess={handleCancel} />
         </Drawer>
      </>
   );
};

export default ModalButtonReviewCreate;
