/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { Title, VerticalSpace } from '@shared/ui';
import { useSelector } from 'react-redux';
import {
   Descriptions,
   Button,
   Tag,
   Modal,
   Collapse,
   Row,
   Col,
   Card,
   Form,
   Input,
   Select,
   Divider
} from 'antd';
import { getUserAuthData } from '@entitles/User';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserForm from '@features/user/UserForm';
import statuses from '@shared/const/statuses';
import CanDo from '@shared/lib/CanDo';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';

const { confirm } = Modal;

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const SellerForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const onFinish = (values) => {};

   const onFinishFailed = () => {};

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
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
      >
         <Form.Item
            label="Имя"
            name="firstname"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
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
            ]}
         >
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
            ]}
         >
            <Input
               type="number"
               addonBefore={prefixSelector}
               style={{
                  width: '100%'
               }}
            />
         </Form.Item>

         <Form.Item
            label="Email"
            name="email"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
            <Input />
         </Form.Item>

         <Form.Item
            label="Пароль"
            name="password"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
            <Input type="password" />
         </Form.Item>

         <Form.Item
            label="Повторите пароль"
            name="password2"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}
         >
            <Input.Password />
         </Form.Item>

         <Form.Item
            wrapperCol={{
               offset: 8,
               span: 16
            }}
         >
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Сохранить
            </Button>
         </Form.Item>
      </Form>
   );
};

const ProfilePage = ({ isadmin }) => {
   const userData = useSelector(getUserAuthData);
   const navigate = useNavigate();

   const showConfirm = () => {
      return confirm({
         title: 'Вы точно хотите выйти?',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         onOk() {
            navigate('/logout');
         },
         okText: 'Выйти',
         cancelText: 'Отмена'
      });
   };

   return (
      <div>
         <Divider orientation="left">Профиль</Divider>
         {/* <UserForm /> */}
         <Button onClick={showConfirm}>Выйти</Button>
      </div>
   );
};

export default ProfilePage;
