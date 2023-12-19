import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { message } from 'antd';
import { GetSellersList } from '@features/storage/model/GetSellersList';

import { GetMySellerProfile } from './model/GetMySellerProfile';
import { UpdateMySellerProfile } from './model/UpdateMySellerProfile';
import _ from 'lodash';

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const EditMySellerForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [isEdited, setIsEdited] = useState(false);

   const [initialValues, setInitialValues] = useState({});
   const [form] = Form.useForm();

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      GetMySellerProfile().then((res) => {
         // form.setFieldsValue(res);
         console.log(res);
         setInitialValues(res);
      });
   };

   const onFinish = (values) => {
      const differenceValuesKeys = _.reduce(
         values,
         function (result, value, key) {
            return _.isEqual(value, initialValues[key])
               ? result
               : result.concat(key);
         },
         []
      );

      const objValue = {};
      differenceValuesKeys.map((e) => (objValue[e] = values[e]));

      UpdateMySellerProfile(objValue)
         .then(() => {
            setIsEdited(false);
            message.success('Изменения профиля сохранились');
         })
         .catch((e) => message.error(e))
         .finally(() => setIsEdited(false));
   };

   const onFinishFailed = (errorInfo) => {
      setIsLoading(false);
      console.log('Failed:', errorInfo);
   };

   if (Object?.values(initialValues)?.length === 0) {
      return <></>;
   }

   const checkNumberIsExist = async (val) => {
      const res = await GetSellersList({
         page: 1,
         limit: 10,
         order: 'desc',
         mobile: val
      });

      if (val === initialValues.mobile) {
         return false;
      }

      if (res?.count > 0) {
         return true;
      }

      return false;
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
         initialValues={initialValues}
         form={form}
         hideRequiredMark
         onFieldsChange={() => setIsEdited(true)}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Имя"
            name="firstName"
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
               },
               {
                  pattern: /^[0-9]{10}$/,
                  message: 'Неверный формат номера телефона'
               },
               {
                  validator: async (_, val) => {
                     const isExist = await checkNumberIsExist(val);

                     if (isExist) {
                        return Promise.reject('Такой номер уже есть в базе');
                     }

                     return Promise.resolve();
                  }
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
         <Form.Item
            hasFeedback={false}
            help="Вы не можете изменять почту"
            label="Почта"
            name="email"
            rules={[
               {
                  message: 'Нельзя менять почту'
               }
            ]}>
            <Input
               type="email"
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
            }}>
            <Button
               type="primary"
               htmlType="submit"
               loading={isLoading}
               disabled={!isEdited}>
               Сохранить
            </Button>
         </Form.Item>
      </Form>
   );
};

export default EditMySellerForm;
