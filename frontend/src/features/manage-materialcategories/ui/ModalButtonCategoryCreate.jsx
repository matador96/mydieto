import { Button, Modal } from 'antd';
import { useState } from 'react';
import CreateOrEditMaterialCategory from './CreateOrEditMaterialCategory';
import { PlusOutlined } from '@ant-design/icons';

const ModalButtonCategoryCreate = ({ closeModal }) => {
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
         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={`Создать категорию`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <CreateOrEditMaterialCategory callbackOnSuccess={handleCancel} />
         </Modal>
      </>
   );
};

export default ModalButtonCategoryCreate;
