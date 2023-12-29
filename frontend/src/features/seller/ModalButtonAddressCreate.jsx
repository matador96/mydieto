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
         <div style={{ width: '143px' }}>
            <PlusOutlined
               onClick={showModal}
               style={{
                  color: 'rgba(47, 148, 97, 1)',
                  marginRight: '6px',
                  cursor: 'pointer'
               }}
            />
            <span
               style={{
                  color: 'rgba(47, 148, 97, 1)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  cursor: 'pointer'
               }}
               type="primary"
               onClick={showModal}>
               Добавить адрес
            </span>
         </div>
         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={`Добавить адрес`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <CreateOrEditAddress id={null} callbackOnSuccess={handleCancel} />
         </Modal>
      </>
   );
};

export default ModalButtonAddressCreate;
