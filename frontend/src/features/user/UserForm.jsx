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
   Select
} from 'antd';
import { getUserAuthData } from '@entitles/User';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import statuses from '@shared/const/statuses';
import CanDo from '@shared/lib/CanDo';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';

const UserForm = () => {
   const userData = useSelector(getUserAuthData);
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

   const onFinish = (values) => {};

   const onFinishFailed = () => {};

   return (
      <div>
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
            onFinishFailed={onFinishFailed}>
            <Form.Item
               label="Email"
               name="email"
               rules={[
                  {
                     required: true,
                     message: 'Поле не может быть пустым'
                  }
               ]}>
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
               ]}>
               <Input.Password />
            </Form.Item>

            <Form.Item
               wrapperCol={{
                  offset: 8,
                  span: 16
               }}>
               <Button type="primary" htmlType="submit" loading={isLoading}>
                  Войти
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default UserForm;
