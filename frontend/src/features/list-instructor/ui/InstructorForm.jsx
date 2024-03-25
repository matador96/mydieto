/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { Col, Row, Alert, InputNumber } from 'antd';

const { TextArea } = Input;

const InstructorForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const { initialValues, onSuccess, isEditForm, errorMessage } = props;
   const [form] = Form.useForm();

   const onFinish = (values) => {
      onSuccess(values, setIsLoading).then(() => {
         if (isEditForm) {
            return;
         }
      });
   };

   const onFinishFailed = (errorInfo) => {
      setIsLoading(false);
      console.log('Failed:', errorInfo);
   };

   const modifiedInitialValues = {
      ...initialValues,
      password: isEditForm ? '123456' : '',
      email: initialValues?.user?.email
   };

   return (
      <Form
         style={{
            maxWidth: '100%',
            minWidth: 320
         }}
         form={form}
         initialValues={modifiedInitialValues}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         hideRequiredMark
         layout="vertical">
         <Row gutter={12}>
            <Col span={12}>
               <Form.Item name="firstName" label="Имя">
                  <Input placeholder="Имя" />
               </Form.Item>

               <Form.Item name="lastName" label="Фамилия">
                  <Input placeholder="Фамилия" />
               </Form.Item>

               <Form.Item
                  label="Email"
                  name="email"
                  // rules={[
                  //    {
                  //       type: 'email',
                  //       message: 'Введите правильную почту'
                  //    },
                  //    {
                  //       required: true,
                  //       message: 'Поле не может быть пустым'
                  //    }
                  // ]}
               >
                  <Input
                     disabled={isEditForm}
                     type="email"
                     placeholder={'Введите почту'}
                  />
               </Form.Item>

               <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Поле не может быть пустым'
                     }
                  ]}>
                  <Input.Password
                     disabled={isEditForm}
                     placeholder={'Введите пароль'}
                  />
               </Form.Item>

               <Form.Item name="age" label="Возраст">
                  <InputNumber
                     style={{
                        width: '100%'
                     }}
                     type="number"
                     placeholder="Введите опыт"
                     min="0"
                  />
               </Form.Item>
               <Form.Item name="experience" label="Опыт">
                  <InputNumber
                     style={{
                        width: '100%'
                     }}
                     type="number"
                     placeholder="Введите опыт"
                     min="0"
                  />
               </Form.Item>
            </Col>

            <Col span={12}>
               <Form.Item label="Должности" name="posts">
                  <Select
                     mode="tags"
                     allowClear
                     style={{
                        width: '100%'
                     }}
                     placeholder="Выберите или создайте должности"
                  />
               </Form.Item>

               <Form.Item name="marker" label="Маркер">
                  <Select
                     style={{
                        width: '100%'
                     }}
                     defaultValue=""
                     placeholder="Выберите маркер"
                     options={[
                        { value: '', label: 'Без маркера' },
                        { value: 'Популярный', label: 'Популярный' },
                        { value: 'Новый', label: 'Новый' }
                     ]}
                  />
               </Form.Item>

               <Form.Item name="about" label="О себе">
                  <TextArea
                     rows={4}
                     placeholder="Максимум 500 символов"
                     maxLength={500}
                  />
               </Form.Item>
            </Col>
         </Row>

         {errorMessage && (
            <Col
               className="gutter-row"
               span={24}
               className="stats-card-count-col"
               style={{ marginBottom: '20px' }}>
               <Alert
                  message={errorMessage.replace('Error: ', '')}
                  type="error"
                  showIcon
               />
            </Col>
         )}

         <Col className="gutter-row" span={24} className="stats-card-count-col">
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={isLoading}>
                  {isEditForm ? 'Сохранить' : 'Создать'}
               </Button>
            </Form.Item>
         </Col>
      </Form>
   );
};

export default InstructorForm;
