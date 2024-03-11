import { Button, Drawer } from 'antd';
import { useState } from 'react';
import CreateOrEditFaq from './CreateOrEditFaq';

import { PlusOutlined } from '@ant-design/icons';

const ModalButtonFaqCreate = ({ closeModal }) => {
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
            Создать
         </Button>
         <Drawer
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            onClose={handleCancel}
            title={`Создать faq`}
            footer={null}
            width={800}
            destroyOnClose={true}
            extra={<Button onClick={handleCancel}>Закрыть</Button>}>
            <CreateOrEditFaq id={null} callbackOnSuccess={handleCancel} />
         </Drawer>
      </>
   );
};

export default ModalButtonFaqCreate;
