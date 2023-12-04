import { Button, Modal } from 'antd';
import { useState } from 'react';
import CreateOrEditCatalog from './CreateOrEditCatalog';
import { PlusOutlined } from '@ant-design/icons';

const ModalButtonCatalogCreate = ({ closeModal }) => {
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
            title={`Создать каталог`}
            footer={null}
            width={600}
            destroyOnClose={true}
         >
            <CreateOrEditCatalog callbackOnSuccess={handleCancel} />
         </Modal>
      </>
   );
};

export default ModalButtonCatalogCreate;
