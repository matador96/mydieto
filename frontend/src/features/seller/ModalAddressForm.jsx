import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditAddress from './CreateOrEditAddress';

const ModalAddressForm = ({ selectedAddress, closeModal = () => {} }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selectedAddress?.id);
   }, [selectedAddress]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selectedAddress?.id;

   return (
      <Modal
         title={`Редактировать адрес № ${selectedAddress?.id}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         footer={null}
         width={800}
         key={`modal${selectedAddress?.id}`}
         destroyOnClose={true}>
         {isHaveData && (
            <CreateOrEditAddress
               id={selectedAddress?.id}
               callbackOnSuccess={handleCancel}
            />
         )}
      </Modal>
   );
};

export default ModalAddressForm;
