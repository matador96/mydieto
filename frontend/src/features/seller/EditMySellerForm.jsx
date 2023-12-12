import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { Col, Row, message } from 'antd';
import SelectAddress from '@widgets/FormItems/SelectAddress';
import { GetMySellerProfile } from './model/GetMySellerProfile';

const { TextArea } = Input;

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const EditMySellerForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const { onSuccess, isEditForm } = props;
   const [form] = Form.useForm();

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      GetMySellerProfile().then((res) => {
         form.setFieldsValue(res);
      });
   };

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

   const handleEdit = () => {
      setIsEditing(true);
   };

   return (
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
            minWidth: 320
         }}
         form={form}
         hideRequiredMark
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
      >
         <Form.Item
            label="Имя"
            name="firstName"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
            <Input type="string" disabled={!isEditing} />
         </Form.Item>

         <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
            <Input disabled={!isEditing} />
         </Form.Item>

         <Form.Item
            label="Телефон"
            name="mobile"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               },
               {
                  pattern: /^[0-9]{10}$/,
                  message: 'Неверный формат номера телефона'
               }
            ]}
         >
            <Input
               disabled={!isEditing}
               type="number"
               addonBefore={prefixSelector}
               style={{
                  width: '100%'
               }}
            />
         </Form.Item>
         <Form.Item
            hasFeedback={false}
            help="Вы не можете изменять почту"
            label="Почта"
            name="email"
            rules={[
               {
                  message: 'Нельзя менять почту'
               }
            ]}
         >
            <Input
               type="Email"
               style={{
                  width: '100%'
               }}
               disabled={true}
            />
         </Form.Item>

         <Form.Item
            wrapperCol={{
               offset: 8,
               span: 16
            }}
         >
            {isEditing ? (
               <Button type="primary" htmlType="submit">
                  Сохранить
               </Button>
            ) : (
               <Button type="primary" onClick={handleEdit}>
                  Редактировать
               </Button>
            )}
         </Form.Item>
      </Form>
   );
};

export default EditMySellerForm;
