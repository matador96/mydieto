import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from '@shared/ui';
import { Col, Row, Upload } from 'antd';
import { GetCatalogsListByParentId } from '../model/services/GetCatalogsListByParentId';
import { statusesOfCategories } from '@shared/const/statuses';
import { unitSettings } from '@shared/const/units';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const normFile = (e) => {
   if (Array.isArray(e)) {
      return e;
   }
   return e?.fileList;
};

const CatalogForm = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   // eslint-disable-next-line no-unused-vars
   const [isLoadingCategories, setIsLoadingCategories] = useState(false);
   const [isDisabledButton, setIsDisabledButton] = useState(true);
   const [categories, setCategories] = useState([]);
   const { initialValues, onSuccess, isEditForm } = props;
   const [form] = Form.useForm();

   const [fileList, setFileList] = useState([]);

   const fetchCategories = () => {
      setIsLoadingCategories(true);
      GetCatalogsListByParentId(
         0, // Main categories
         {
            page: 1,
            limit: 1000,
            sort: 'priority',
            order: 'asc'
         }
      ).then((res) => {
         setCategories(res.data);
         setIsLoadingCategories(false);
      });
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   useEffect(() => {
      form.setFieldsValue(initialValues);
   }, [form, initialValues]);

   const onFinish = (values) => {
      console.log(values);
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

   const isDisabledCategoryChoose = isEditForm && initialValues.parentId === 0; // Если это редактируемая форма, и категория является главной то ее нельзя менять

   const fetchImage = async (file) => {
      setFileList((prev) => [
         ...prev,
         {
            uid: file.uid,
            name: file.name,
            status: 'finished'
         }
      ]);
   };

   const uploadButton = (
      <div>
         {initialValues?.img ? <ReloadOutlined /> : <PlusOutlined />}
         <div
            style={{
               marginTop: 8
            }}
         >
            {initialValues?.img ? `Заменить картинку` : `Загрузить картинку`}
         </div>
      </div>
   );

   return (
      <Form
         name="basic"
         style={{
            maxWidth: 720,
            minWidth: 320
         }}
         form={form}
         initialValues={initialValues}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         onValuesChange={() => setIsDisabledButton(false)}
         hideRequiredMark
         layout="vertical"
      >
         <Row gutter={16}>
            <Col span={24}>
               <Form.Item
                  name="name"
                  label="Название"
                  rules={[
                     {
                        required: true,
                        message: 'Введите название'
                     }
                  ]}
               >
                  <Input />
               </Form.Item>
            </Col>
         </Row>
         {initialValues.parentId !== 0 && (
            <Row gutter={16}>
               <Col span={24}>
                  <Form.Item name="parentId" label="Категория">
                     <Select
                        placeholder="Выберите категорию"
                        label="role"
                        name="parentId"
                        allowClear
                        onFocus={() => fetchCategories()}
                        disabled={isDisabledCategoryChoose}
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}
                        fieldNames={{
                           label: 'name',
                           value: 'id'
                        }}
                        options={categories}
                     />
                  </Form.Item>
               </Col>
            </Row>
         )}

         <Row gutter={16}>
            <Col span={16}>
               <Form.Item
                  name="unit"
                  label="Единица измерения"
                  rules={[
                     {
                        required: true,
                        message: 'Пропустили поле'
                     }
                  ]}
               >
                  <Select
                     defaultValue="kg"
                     style={{
                        width: '100%'
                     }}
                     options={unitSettings}
                  />
               </Form.Item>
            </Col>
         </Row>

         <Row gutter={16}>
            <Col span={8}>
               <Form.Item
                  label="Картинка"
                  name="image"
                  valuePropName="image"
                  getValueFromEvent={normFile}
               >
                  <Upload
                     accept="image/png, image/jpeg"
                     listType="picture-card"
                     fileList={fileList}
                     className="upload-catalog-img"
                     beforeUpload={fetchImage}
                     onPreview={null}
                     onRemove={null}
                     maxCount={1}
                  >
                     {fileList.length >= 1 ? null : <span>{uploadButton}</span>}
                  </Upload>
               </Form.Item>
            </Col>
         </Row>

         <Row gutter={16}>
            <Col span={8}>
               <Form.Item
                  name="priority"
                  label="Приоритет"
                  rules={[
                     {
                        required: true,
                        message: 'Укажите приоритет'
                     }
                  ]}
               >
                  <Input
                     style={{
                        width: '100%'
                     }}
                     type="number"
                  />
               </Form.Item>
            </Col>
            <Col span={8}>
               <Form.Item
                  name="status"
                  label="Статус"
                  rules={[
                     {
                        required: true,
                        message: 'Выберите статус'
                     }
                  ]}
                  defaultValue={statusesOfCategories.active}
               >
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
                     options={Object.values(statusesOfCategories)}
                  />
               </Form.Item>
            </Col>
         </Row>

         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               loading={isLoading}
               disabled={isDisabledButton}
            >
               {isEditForm ? 'Сохранить' : 'Создать'}
            </Button>
         </Form.Item>
      </Form>
   );
};

export default CatalogForm;
