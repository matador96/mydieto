import React from 'react';
import { message, Button } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { DeleteOrderItemById } from './../model/services/DeleteOrderItemById';

const { confirm } = Modal;

const OrderItemDeleteModalButton = ({
   orderItemId,
   onDelete,
   userType,
   orderStatus
}) => {
   const isAdmin = userType === 'admin';

   const showConfirm = () => {
      confirm({
         title: 'Подтвердите удаление',
         icon: <ExclamationCircleFilled />,
         okText: 'Удалить',
         onOk() {
            deleteOrderItem();
         },
         onCancel() {}
      });
   };

   const deleteOrderItem = () => {
      DeleteOrderItemById(orderItemId)
         .then(() => {
            message.success('Объем изменен');
            onDelete();
         })
         .catch((e) => message.error(e.message));
   };

   if (isAdmin && orderStatus === 'waitDelivery') {
      return (
         <Button type="primary" danger onClick={showConfirm}>
            Удалить
         </Button>
      );
   }

   return <></>;
};

export default OrderItemDeleteModalButton;
