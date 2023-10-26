import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import CreateUserForm from '@features/create-user/ui/CreateUserForm';
import CreateResult from '@features/create-user/ui/CreateResult';

import { PlusOutlined } from '@ant-design/icons';

const ModalButtonUserCreate = ({ closeModal }) => {
   const [generatedUser, setGeneratedUser] = useState({});
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setGeneratedUser({});
   }, [isModalOpen]);

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
         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={`Создать пользователя`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <CreateUserForm setGeneratedUser={setGeneratedUser} />
            <CreateResult generatedUser={generatedUser} />
         </Modal>
      </>
   );
};

export default ModalButtonUserCreate;
