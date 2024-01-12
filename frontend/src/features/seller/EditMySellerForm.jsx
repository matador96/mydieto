import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { Modal, message } from 'antd';
import { GetSellersList } from '@features/storage/model/GetSellersList';

import { GetMySellerProfile } from './model/GetMySellerProfile';
import { UpdateMySellerProfile } from './model/UpdateMySellerProfile';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { RoutePath } from '@shared/config/routes';

const { confirm } = Modal;

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const EditMySellerForm = () => {
   const [initialValues, setInitialValues] = useState({});
   const [isEdited, setIsEdited] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [form] = Form.useForm();
   const navigate = useNavigate();

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
   const showConfirm = () => {
      return confirm({
         title: 'Вы точно хотите выйти?',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         onOk() {
            navigate(RoutePath.logout);
         },
         okText: 'Выйти',
         cancelText: 'Отмена'
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
      <div style={{ marginTop: '40px', maxWidth: '300px' }}>
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
               className="custom-input-container"
               rules={[
                  {
                     required: true,
                     message: 'Поле не может быть пустым'
                  }
               ]}>
               <Input className="custom-input" />
            </Form.Item>

            <Form.Item
               label="Фамилия"
               className="custom-input-container"
               name="lastName"
               rules={[
                  {
                     required: true,
                     message: 'Поле не может быть пустым'
                  }
               ]}>
               <Input className="custom-input" />
            </Form.Item>

            <Form.Item
               label="Телефон"
               className="custom-input-container"
               name="mobile"
               rules={[
                  {
                     required: true,
                     message: 'Поле не может быть пустым'
                  },
                  {
                     pattern: /^[0-9]{11}$/,
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
                  className="custom-input"
                  // type="number"
                  // addonBefore={prefixSelector}
                  style={{
                     width: '100%'
                  }}
               />
            </Form.Item>
            <Form.Item
               className="custom-input-container"
               hasFeedback={false}
               help={
                  <div
                     style={{
                        margin: '4px 0 0 16px',
                        width: '300px',
                        color: '#cd3636'
                     }}>
                     Вы не можете изменять почту
                  </div>
               }
               label="Почта"
               name="email"
               rules={[
                  {
                     message: 'Нельзя менять почту'
                  }
               ]}>
               <Input
                  className="custom-input"
                  type="email"
                  style={{
                     width: '100%'
                  }}
                  disabled={true}
               />
            </Form.Item>

            <div className="save-and-exit-container">
               <Button
                  className="profile-save-button"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={!isEdited}>
                  Сохранить изменения
               </Button>
               <Button
                  className="profile-save-button danger-button"
                  type="button"
                  danger
                  onClick={(e) => {
                     e.stopPropagation();
                     showConfirm();
                  }}>
                  Выйти
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default EditMySellerForm;
