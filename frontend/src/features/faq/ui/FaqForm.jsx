import React, { useState } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { statusesOfFaqs } from '@shared/const/statuses';

import { Row, Col } from 'antd';
const { TextArea } = Input;

const FaqForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const { initialValues, onSuccess, isEditForm } = props;
   const [form] = Form.useForm();

   const onFinish = (values) => {
      onSuccess(values, setIsLoading).then(() => {
         if (isEditForm) {
            return;
         }

         // form.resetFields();
      });
   };

   const onFinishFailed = (errorInfo) => {
      setIsLoading(false);
      console.log('Failed:', errorInfo);
   };

   return (
      <Form
         style={{
            minWidth: 320
         }}
         form={form}
         initialValues={initialValues}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         hideRequiredMark
         layout="vertical">
         <Col span={24}>
            <Form.Item
               name="title"
               label="Заголовок"
               rules={[
                  {
                     required: true,
                     message: 'Поле пропущено!'
                  }
               ]}>
               <Input
                  placeholder="Введите заголовок"
                  style={{
                     width: '100%'
                  }}
               />
            </Form.Item>
         </Col>
         <Row gutter={16}>
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
                  defaultValue={statusesOfFaqs.active}>
                  <Select
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
                     options={Object.values(statusesOfFaqs)}
                  />
               </Form.Item>
            </Col>

            <Col span={12}>
               <Form.Item name="priority" label="Приоритет">
                  <Input
                     style={{
                        width: '100%'
                     }}
                     placeholder="Введите приоритет"
                     type="number"
                  />
               </Form.Item>
            </Col>
         </Row>

         <Row gutter={24}>
            <Col span={24}>
               <Form.Item
                  name="description"
                  label="Описание"
                  rules={[
                     {
                        required: true,
                        message: 'Заполните поле'
                     }
                  ]}>
                  <TextArea
                     rows={12}
                     placeholder="Максимум 1000 символов"
                     maxLength={1000}
                  />
               </Form.Item>
            </Col>
         </Row>

         <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               {isEditForm ? 'Сохранить' : 'Создать'}
            </Button>
         </Form.Item>
      </Form>
   );
};

export default FaqForm;
