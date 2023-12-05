import { Button, Modal } from 'antd';
import { useState } from 'react';
import CreateOrEditAddress from './CreateOrEditAddress';

import { PlusOutlined } from '@ant-design/icons';

const ModalButtonAddressCreate = ({ closeModal = () => {} }) => {
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
            Добавить адрес
         </Button>
         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={`Добавить адрес`}
            footer={null}
            width={600}
            destroyOnClose={true}
         >
            <CreateOrEditAddress id={null} callbackOnSuccess={handleCancel} />
         </Modal>
      </>
   );
};

export default ModalButtonAddressCreate;
