import { Button, Drawer } from 'antd';
import { useState } from 'react';
import CreateOrEditInstructor from './CreateOrEditInstructor';

import { PlusOutlined } from '@ant-design/icons';

const ModalButtonInstructorCreate = ({ closeModal = () => {} }) => {
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
            title={`Создать инструктора`}
            footer={null}
            width={800}
            destroyOnClose={true}
            extra={<Button onClick={handleCancel}>Закрыть</Button>}>
            <CreateOrEditInstructor id={null} callbackOnSuccess={handleCancel} />
         </Drawer>
      </>
   );
};

export default ModalButtonInstructorCreate;
