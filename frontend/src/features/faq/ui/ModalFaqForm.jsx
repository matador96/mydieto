import { Drawer, Button } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditFaq from './CreateOrEditFaq';

const ModalFaqForm = ({ selectedFaq, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selectedFaq?.id);
   }, [selectedFaq]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selectedFaq?.id;

   return (
      <Drawer
         title={`Редактировать faq № ${selectedFaq?.id}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         onClose={handleCancel}
         footer={null}
         width={900}
         destroyOnClose={true}
         extra={<Button onClick={handleCancel}>Закрыть</Button>}>
         {isHaveData && (
            <CreateOrEditFaq id={selectedFaq?.id} callbackOnSuccess={handleCancel} />
         )}
      </Drawer>
   );
};

export default ModalFaqForm;
