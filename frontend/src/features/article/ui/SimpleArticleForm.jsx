import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { CreateArticle } from '../model/services/CreateArticle';
import { Col, Row, message } from 'antd';

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

const SimpleArticleForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isDisabledButton, setIsDisabledButton] = useState(true);
   const { initialValues, callbackOnSuccess, isEditForm } = props;
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue(initialValues);
   }, [form, initialValues]);

   const onFinish = (values) => {
      setIsLoading(true);
      console.log(values);

      CreateArticle(values)
         .then(() => {
            callbackOnSuccess();
            message.success('Статья создана');
         })
         .catch((e) => message.error(e.message))
         .finally(() => setIsLoading(false));
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
                  label="Краткое описание"
                  rules={[
                     {
                        required: true,
                        message: 'Заполните поле'
                     }
                  ]}>
                  <TextArea
                     rows={4}
                     placeholder="Максимум 200 символов"
                     maxLength={200}
                  />
               </Form.Item>
            </Col>
         </Row>

         <Row gutter={24}>
            <Col span={24}>
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

export default SimpleArticleForm;
