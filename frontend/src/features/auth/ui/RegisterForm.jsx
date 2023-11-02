import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { AuthByLoginAndPassword } from '@features/auth/model/services/AuthByLoginAndPassword';
import { useDispatch } from 'react-redux';
import { userActions, getUserAuthData } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const prefixSelector = <Form.Item noStyle>+7</Form.Item>;

const RegisterForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const auth = useSelector(getUserAuthData);
   const isUserAuthorized = !!auth?.id;
   const userType = auth?.type;

   useEffect(() => {
      if (isUserAuthorized) {
         navigate(`/${userType}/dashboard`);
      }
   }, []);

   const onFinish = (values) => {
      setIsLoading(true);
      AuthByLoginAndPassword(values)
         .then((res) => {
            dispatch(userActions.loginUser(res));
            message.info(`Добро пожаловать ${res.login}!`);
            navigate(`/${res.type}/dashboard`);
         })
         .catch((e) => message.error(e.message))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onFinishFailed = () => {
      setIsLoading(false);
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
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Имя"
            name="firstname"
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
            ]}>
            <Input.Password />
         </Form.Item>

         <Form.Item
            wrapperCol={{
               offset: 8,
               span: 16
            }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Зарегистрироваться
            </Button>
         </Form.Item>
      </Form>
   );
};

export default RegisterForm;
