import React, { useState } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { Col, Row } from 'antd';
import SelectAddress from '@widgets/FormItems/SelectAddress';

const { TextArea } = Input;

const AddressForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const { initialValues, onSuccess, isEditForm } = props;
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

   return (
      <Form
         style={{
            maxWidth: 720,
            minWidth: 320
         }}
         form={form}
         initialValues={initialValues}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         hideRequiredMark
         layout="vertical">
         <Form.Item
            label="Адрес"
            name={'address'}
            rules={[{ required: true, message: 'Укажите адрес' }]}>
            <SelectAddress />
         </Form.Item>

         <Form.Item
            name="name"
            label="Название адреса"
            rules={[{ required: true, message: 'Укажите адрес' }]}>
            <Input placeholder="Пометка к адресу" />
         </Form.Item>

         <Form.Item name="comment" label="Комментарий">
            <TextArea rows={3} placeholder="Максимум 500 символов" maxLength={500} />
         </Form.Item>

         <Col className="gutter-row" span={24}>
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={isLoading}>
                  {isEditForm ? 'Сохранить' : 'Создать'}
               </Button>
            </Form.Item>
         </Col>
      </Form>
   );
};

export default AddressForm;
