import { Drawer, Button } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditReview from './CreateOrEditReview';

const ModalReviewForm = ({ selected, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selected?.id);
   }, [selected]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selected?.id;

   return (
      <Drawer
         title={`Редактировать отзыв № ${selected?.id}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         onClose={handleCancel}
         footer={null}
         width={900}
         destroyOnClose={true}
         extra={<Button onClick={handleCancel}>Закрыть</Button>}>
         {isHaveData && (
            <CreateOrEditReview id={selected?.id} callbackOnSuccess={handleCancel} />
         )}
      </Drawer>
   );
};

export default ModalReviewForm;
