import React, { useState } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { CreateUser } from '@features/create-user/model/services/CreateUser';
import { russianOneWordRequired } from '@shared/config/fieldValidatorSettings';

import { message } from 'antd';
import { Row, Col } from 'antd';

const CreateForm = ({ setGeneratedUser, callbackOnSuccess = () => {} }) => {
   const [isLoading, setIsLoading] = useState(false);

   const onFinish = async (values) => {
      setIsLoading(true);

      await CreateUser(values)
         .then((res) => {
            setGeneratedUser(res);
            callbackOnSuccess();
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

   return (
      <Form
         name="basic"
         hideRequiredMark
         layout="vertical"
         style={{
            maxWidth: 720,
            minWidth: 320
         }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Row gutter={16}>
            <Col span={12}>
               <Form.Item
                  label="Роль"
                  name="role"
                  rules={[
                     {
                        required: true,
                        message: 'Выберите статус'
                     }
                  ]}>
                  <Select
                     placeholder="Выберите роль"
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
                           label: 'Супер Admin'
                        }
                     ]}
                  />
               </Form.Item>
            </Col>

            <Col span={12}>
               <Form.Item
                  name="post"
                  label="Должность"
                  rules={russianOneWordRequired()}>
                  <Input placeholder="Должность" />
               </Form.Item>
            </Col>
         </Row>
         <Row gutter={16}>
            <Col span={12}>
               <Form.Item
                  name="firstName"
                  label="Имя"
                  rules={russianOneWordRequired()}>
                  <Input placeholder="Имя" />
               </Form.Item>
            </Col>

            <Col span={12}>
               <Form.Item
                  name="lastName"
                  label="Фамилия"
                  rules={russianOneWordRequired()}>
                  <Input placeholder="Фамилия" />
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
                  ]}>
                  <Input placeholder="Почта" />
               </Form.Item>
            </Col>
         </Row>

         <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Создать
            </Button>
         </Form.Item>
      </Form>
   );
};

export default CreateForm;
