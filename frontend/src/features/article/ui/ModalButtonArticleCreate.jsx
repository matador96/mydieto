import { Button, Modal } from 'antd';
import { useState } from 'react';
import SimpleArticleForm from './SimpleArticleForm';
import { PlusOutlined } from '@ant-design/icons';

const ModalButtonArticleCreate = ({ closeModal = () => {} }) => {
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
            Написать статью
         </Button>
         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            title={`Написать статью`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <SimpleArticleForm callbackOnSuccess={handleCancel} />
         </Modal>
      </>
   );
};

export default ModalButtonArticleCreate;
