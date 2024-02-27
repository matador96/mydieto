import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditArticle from './CreateOrEditArticle';

const ModalArticleForm = ({ selectedCategory, closeModal }) => {
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
         width={920}>
         {isHaveData && (
            <CreateOrEditArticle
               id={selectedCategory.id}
               callbackOnSuccess={closeModal}
            />
         )}
      </Modal>
   );
};

export default ModalArticleForm;
