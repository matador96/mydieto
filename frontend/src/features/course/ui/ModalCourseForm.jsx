import { Drawer, Button } from 'antd';
import { useState, useEffect } from 'react';
import CreateOrEditCourse from './CreateOrEditCourse';

const ModalCourseForm = ({ selectedEntity, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selectedEntity?.id);
   }, [selectedEntity]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selectedEntity?.id;

   return (
      <Drawer
         title={`Редактировать ${selectedEntity?.name}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         onClose={handleCancel}
         footer={null}
         width={1200}
         destroyOnClose={true}
         extra={<Button onClick={handleCancel}>Закрыть</Button>}>
         {isHaveData && (
            <CreateOrEditCourse
               id={selectedEntity.id}
               callbackOnSuccess={closeModal}
            />
         )}
      </Drawer>
   );
};

export default ModalCourseForm;
