import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { Col, Row } from 'antd';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

const modules = {
   toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
   ]
};

const formats = [
   'header',
   'bold',
   'italic',
   'underline',
   'strike',
   'blockquote',
   'list',
   'bullet',
   'indent',
   'link',
   'image'
];

const ArticleForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isDisabledButton, setIsDisabledButton] = useState(true);
   const { initialValues, onSuccess, isEditForm } = props;
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue(initialValues);
   }, [form, initialValues]);

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
         style={{
            maxWidth: 920,
            minWidth: 320
         }}
         form={form}
         initialValues={initialValues}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         onValuesChange={() => setIsDisabledButton(false)}
         hideRequiredMark
         layout="vertical">
         <Row gutter={16}>
            <Col span={24}>
               <Form.Item
                  name="title"
                  label="Название"
                  rules={[
                     {
                        required: true,
                        message: 'Введите название'
                     }
                  ]}>
                  <Input />
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
                     rows={6}
                     placeholder="Максимум 400 символов"
                     maxLength={400}
                  />
               </Form.Item>

               <Form.Item name="content" label="Статья">
                  <ReactQuill theme="snow" modules={modules} formats={formats} />
               </Form.Item>
            </Col>
         </Row>

         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               loading={isLoading}
               disabled={isDisabledButton}>
               {isEditForm ? 'Сохранить' : 'Создать'}
            </Button>
         </Form.Item>
      </Form>
   );
};

export default ArticleForm;
