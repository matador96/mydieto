import { Button, Drawer } from 'antd';
import { useState, useEffect } from 'react';

import CreateOrEditInstructor from './CreateOrEditInstructor';

const ModalInstructorForm = ({ selectedUser, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      setIsModalOpen(!!selectedUser?.id);
   }, [selectedUser]);

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const isHaveData = !!selectedUser?.id;

   return (
      <Drawer
         title={`Редактировать инструктора № ${selectedUser?.id}`}
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         onClose={handleCancel}
         footer={null}
         width={800}
         destroyOnClose={true}
         extra={<Button onClick={handleCancel}>Закрыть</Button>}>
         {isHaveData && (
            <CreateOrEditInstructor
               id={selectedUser?.id}
               callbackOnSuccess={handleCancel}
            />
         )}
      </Drawer>
   );
};

export default ModalInstructorForm;
