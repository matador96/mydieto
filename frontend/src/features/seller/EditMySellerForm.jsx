import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { Col, Row } from 'antd';
import SelectAddress from '@widgets/FormItems/SelectAddress';
import { GetMySellerProfile } from './model/GetMySellerProfile';

const { TextArea } = Input;

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const EditMySellerForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
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
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Имя"
            name="firstname"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}>
            <Input />
         </Form.Item>

         <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}>
            <Input />
         </Form.Item>

         <Form.Item
            label="Телефон"
            name="mobile"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}>
            <Input
               type="number"
               addonBefore={prefixSelector}
               style={{
                  width: '100%'
               }}
            />
         </Form.Item>

         {/* <Form.Item
            wrapperCol={{
               offset: 8,
               span: 16
            }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Сохранить изменения
            </Button>
         </Form.Item> */}
      </Form>
   );
};

export default EditMySellerForm;
