import { Modal, Form, Input } from 'antd';

function PasswordRecoveryForm({ visible, onCancel }) {
   const [form] = Form.useForm();

   return (
      <>
         <Modal open={visible} title="Восстановление пароля" onCancel={onCancel}>
            <Form form={form}>
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
            </Form>
         </Modal>
      </>
   );
}

export default PasswordRecoveryForm;
