import { Button, Drawer } from 'antd';
import { useState } from 'react';
import CreateOrEditCourse from './CreateOrEditCourse';
import { PlusOutlined } from '@ant-design/icons';

const ModalButtonCourseCreate = ({ closeModal = () => {} }) => {
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
            Написать курс
         </Button>

         <Drawer
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            onClose={handleCancel}
            title={`Создать курс`}
            footer={null}
            width={1200}
            destroyOnClose={true}
            extra={<Button onClick={handleCancel}>Закрыть</Button>}>
            <CreateOrEditCourse id={null} callbackOnSuccess={handleCancel} />
         </Drawer>
      </>
   );
};

export default ModalButtonCourseCreate;
