import React, { useState } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { statusesOfReviews } from '@shared/const/statuses';

import { Row, Col, Space, Rate } from 'antd';
const { TextArea } = Input;

const ReviewForm = (props) => {
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
            <Space
               direction="horizontal"
               style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '15px'
               }}>
               <Form.Item
                  name="rating"
                  rules={[
                     {
                        required: true,
                        message: 'Поставьте оценку'
                     },
                     {
                        type: 'number',
                        min: 0.1,
                        message: 'Поставьте оценку выше.'
                     }
                  ]}>
                  <Rate
                     className="rate-big"
                     allowHalf
                     allowClear={true}
                     defaultValue={0}
                     value={form.getFieldValue('rating')}
                  />
               </Form.Item>
            </Space>
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
                  defaultValue={statusesOfReviews.active}>
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
                     options={Object.values(statusesOfReviews)}
                  />
               </Form.Item>
            </Col>

            <Col span={12}>
               <Form.Item
                  name="courseId"
                  label="Айди курса"
                  rules={[
                     {
                        required: true,
                        message: 'Введите название'
                     }
                  ]}>
                  <Input type="number" />
               </Form.Item>
            </Col>
         </Row>

         <Row gutter={24}>
            <Col span={24}>
               <Form.Item
                  name="comment"
                  label="Описание"
                  rules={[
                     {
                        required: true,
                        message: 'Заполните поле'
                     }
                  ]}>
                  <TextArea
                     rows={12}
                     placeholder="Максимум 400 символов"
                     maxLength={400}
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

export default ReviewForm;
