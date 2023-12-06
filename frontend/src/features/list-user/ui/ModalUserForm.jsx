import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { Form, Input, Select } from '@shared/ui';
import { UpdateUser } from '../model/UpdateUser';
import { ResetUserPassword } from '../model/ResetUserPassword';
import { message } from 'antd';
import { Space } from 'antd';
import { Row, Col } from 'antd';
import { Alert } from '@shared/ui';
import statuses from '@shared/const/statuses';
import _ from 'lodash';
import CanDo from '@shared/lib/CanDo';

const russianOneWordRequired = [
   {
      required: true,
      message: 'Обязательное поле'
   },
   {
      max: 50,
      message: 'Максимально 50 символов'
   },
   {
      pattern: /^([А-Яа-яЁё]+)$/,
      message: 'Только русские буквы'
   }
];

const ModalUserForm = ({ selectedUser, closeModal }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isDisabledButton, setIsDisabledButton] = useState(true);
   const [resetPassword, setResetPassword] = useState('');
   const [form] = Form.useForm();

   const onFinish = async (values) => {
      setIsLoading(true);
      setResetPassword('');

      const mergedObj = { ...selectedUser, ...values };
      const updatedFields = _.pickBy(
         mergedObj,
         (v, k) => !_.isEqual(selectedUser[k], v)
      );

      await UpdateUser(updatedFields, selectedUser.id)
         .then(() => {
            handleCancel();
            message.success('Пользователь изменен');
         })
         .catch((e) => message.error(e.message))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onFinishFailed = (errorInfo) => {
      setIsLoading(false);
      console.log('Failed:', errorInfo);
   };

   useEffect(() => {
      form.setFieldsValue(selectedUser);
   }, [form, selectedUser]);

   useEffect(() => {
      setIsModalOpen(!!selectedUser?.login);
      setIsDisabledButton(true);
      setResetPassword('');
   }, [selectedUser]);

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const onClickResetPassword = async () => {
      const res = await ResetUserPassword(selectedUser.id);
      setResetPassword(res.password);
   };

   return (
      <Modal
         title={`Редактировать ${selectedUser?.login} `}
         open={isModalOpen}
         onCancel={handleCancel}
         footer={null}
         width={600}
         destroyOnClose={true}
      >
         <Form
            hideRequiredMark
            layout="vertical"
            style={{
               maxWidth: 720,
               minWidth: 320
            }}
            name={selectedUser?.login + 'form-name'}
            initialValues={selectedUser}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            onValuesChange={() => setIsDisabledButton(false)}
         >
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     name="firstName"
                     label="Имя"
                     rules={russianOneWordRequired}
                  >
                     <Input placeholder="Имя" />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     name="lastName"
                     label="Фамилия"
                     rules={russianOneWordRequired}
                  >
                     <Input placeholder="Фамилия" />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     name="role"
                     label="Роль"
                     rules={[
                        {
                           required: true,
                           message: 'Роль'
                        }
                     ]}
                  >
                     <Select
                        placeholder="Выберите роль"
                        label="role"
                        name="role"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}
                        options={[
                           {
                              value: 'manager',
                              label: 'Менеджер'
                           },
                           {
                              value: 'support',
                              label: 'Поддержка'
                           },
                           {
                              value: 'admin',
                              label: 'Админ'
                           },
                           {
                              value: 'superadmin',
                              label: 'Супер Админ'
                           }
                        ]}
                     />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     name="status"
                     label="Статус"
                     rules={[
                        {
                           required: true,
                           message: 'Выберите статус'
                        }
                     ]}
                     defaultValue={statuses.active}
                  >
                     <Select
                        allowClear
                        style={{
                           width: '100%'
                        }}
                        placeholder="Выберите статус"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым '
                           }
                        ]}
                        options={[statuses.active, statuses.blocked]}
                     />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     name="login"
                     label="Логин"
                     rules={[
                        {
                           required: true,
                           message: 'Поле не может быть пустым '
                        },
                        {
                           min: 4,
                           message: 'Минимум 4 символов'
                        },
                        {
                           max: 20,
                           message: 'Максимально 20 символов'
                        }
                     ]}
                  >
                     <Input placeholder="Логин" />
                  </Form.Item>
               </Col>

               <Col span={12}>
                  <Form.Item
                     name="post"
                     label="Должность"
                     rules={russianOneWordRequired}
                  >
                     <Input placeholder="Должность" />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     name="email"
                     label="E-mail"
                     rules={[
                        {
                           type: 'email',
                           message: 'Не похоже на почту!'
                        }
                     ]}
                  >
                     <Input placeholder="Почта" />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item>
                     <Space size="small">
                        <Button
                           type="primary"
                           htmlType="submit"
                           loading={isLoading}
                           disabled={isDisabledButton}
                        >
                           Сохранить
                        </Button>

                        <CanDo permission="can_reset_password_of_users">
                           <Button danger onClick={() => onClickResetPassword()}>
                              Сбросить пароль
                           </Button>
                        </CanDo>
                     </Space>
                  </Form.Item>
               </Col>
            </Row>
            {resetPassword && (
               <Space size="small">
                  <Alert
                     message="Пароль сброшен и сохранен"
                     description={<div>Новый пароль: {resetPassword}</div>}
                     type="success"
                     showIcon
                  />
               </Space>
            )}
         </Form>
      </Modal>
   );
};

export default ModalUserForm;
