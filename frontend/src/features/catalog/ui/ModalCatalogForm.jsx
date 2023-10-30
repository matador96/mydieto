import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditCatalog from './CreateOrEditCatalog';

const ModalCatalogForm = ({ selectedCategory, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selectedCategory?.id);
   }, [selectedCategory]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selectedCategory?.id;

   return (
      <Modal
         title={`Редактировать ${selectedCategory?.name}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         footer={null}
         destroyOnClose={true}
         width={600}>
         {isHaveData && (
            <CreateOrEditCatalog
               id={selectedCategory.id}
               callbackOnSuccess={closeModal}
            />
         )}
      </Modal>
   );
};

export default ModalCatalogForm;
