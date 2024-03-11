import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import CanDo from '@shared/lib/CanDo';
import { message, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const DeleteEntityButton = (props) => {
   const [loading, setLoading] = useState(false);
   const {
      id,
      callbackFetch = () => {},
      update = () => {},
      buttonText = <DeleteOutlined />
   } = props;

   const deleteEntity = () => {
      setLoading(true);

      callbackFetch(id)
         .then(() => {
            update();
            message.success('Удалено');
            setLoading(false);
         })
         .catch((e) => {
            message.error(e.message);
            setLoading(false);
         });
   };

   const showConfirm = () => {
      return confirm({
         title: 'Подтвердите действие',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         onOk() {
            deleteEntity();
         },
         okText: 'Удалить',
         cancelText: 'Отмена'
      });
   };

   return (
      <Button onClick={showConfirm} loading={loading} type="primary" danger>
         {buttonText}
      </Button>
   );
};

export default DeleteEntityButton;
