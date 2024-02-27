import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { ResetPassword } from './../model/services/ResetPassword';

function PasswordRecoveryForm({ visible, onCancel }) {
   const [isLoading, setIsLoading] = useState(false);

   const onFinish = (values) => {
      setIsLoading(true);

      ResetPassword(values.email)
         .then(() => {
            message.info(`Новый пароль отправлен на почту `);
         })
         .catch((e) => {
            message.error(e.message);
         })
         .finally(() => {
            setIsLoading(false);
            onCancel();
         });
   };

   const onFinishFailed = () => {
      setIsLoading(false);
   };

   return (
      <>
         <Modal
            footer={null}
            open={visible}
            title="Восстановление пароля"
            onCancel={onCancel}>
            <Form
               name="basic"
               labelCol={{
                  span: 8
               }}
               wrapperCol={{
                  span: 16
               }}
               style={{
                  maxWidth: 460,
                  minWidth: 320,
                  position: 'relative'
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}>
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                     {
                        type: 'email',
                        message: 'Введите корректный email'
                     },
                     {
                        required: true,
                        message: 'Введите ваш email'
                     }
                  ]}>
                  <Input />
               </Form.Item>
               <Form.Item
                  wrapperCol={{
                     offset: 8,
                     span: 16
                  }}>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                     Сбросить пароль
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
}

export default PasswordRecoveryForm;
