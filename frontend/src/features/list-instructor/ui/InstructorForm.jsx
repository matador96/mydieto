/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { Col, Row, Alert, InputNumber, Flex, Upload } from 'antd';
import AvatarIcon from '@shared/assets/icons/AvatarIcon';

import { PlusOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const getBase64 = (file) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });

const InstructorForm = (props) => {
   const [loading, setLoading] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [image, setImage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const { initialValues, onSuccess, isEditForm, errorMessage } = props;
   const [form] = Form.useForm();

   const onFinish = (values) => {
      const formDataCreate = new FormData();

      for (let key in values) {
         formDataCreate.append(key, values[key]);
      }

      if (image && image?.originFileObj) {
         formDataCreate.append('image', image.originFileObj, image.name);
      }

      onSuccess(formDataCreate, setIsLoading).then(() => {
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

   const img = initialValues?.imageUrl;

   useEffect(() => {
      if (img) {
         setPreviewImage(img);
         setImage(true);
      }
   }, [img]);

   const handleChange = async ({ fileList }) => {
      if (fileList.length === 0) {
         return;
      }

      const file = fileList[0];

      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }

      setPreviewImage(file.url || file.preview);
      setImage(file);
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
         <Row gutter={24}>
            <Col span={24}>
               <Form.Item name="image" valuePropName="image">
                  <Flex
                     gap="middle"
                     style={{ margin: '0 0 20px 0' }}
                     justify="center"
                     align="center">
                     <Upload
                        name="image"
                        listType="picture-circle"
                        className="avatar-uploader"
                        onPreview={() => {}}
                        onChange={handleChange}
                        accept="image/png, image/jpeg"
                        onRemove={null}
                        fileList={[]}
                        showUploadList={false}
                        multiple={false}
                        beforeUpload={() => false}
                        maxCount={1}>
                        {image ? (
                           <>
                              <div
                                 className="preview-of-avatar"
                                 style={{
                                    backgroundImage: `url(${previewImage})`
                                 }}></div>

                              <div className="avatar-button-actions">
                                 <Button icon={<EditOutlined />}></Button>
                              </div>
                           </>
                        ) : (
                           <div>
                              <div className="avatar-button-actions">
                                 <Button
                                    icon={
                                       loading ? (
                                          <LoadingOutlined />
                                       ) : (
                                          <PlusOutlined />
                                       )
                                    }></Button>
                              </div>
                              <Flex gap="middle" justify="center" align="center">
                                 <AvatarIcon />
                              </Flex>
                           </div>
                        )}
                     </Upload>
                  </Flex>
               </Form.Item>
            </Col>
         </Row>

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
               <Row gutter={24}>
                  <Col span={12}>
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
                  </Col>
                  <Col span={12}>
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
               </Row>
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
