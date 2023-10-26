import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditMaterialCategory from './CreateOrEditMaterialCategory';

const ModalMaterialCategoryForm = ({ selectedCategory, closeModal }) => {
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
         width={600}
      >
         {isHaveData && (
            <CreateOrEditMaterialCategory
               id={selectedCategory.id}
               callbackOnSuccess={closeModal}
            />
         )}
      </Modal>
   );
};

export default ModalMaterialCategoryForm;
