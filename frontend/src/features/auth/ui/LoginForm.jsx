import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { AuthByLoginAndPassword } from '@features/auth/model/services/AuthByLoginAndPassword';
import { useDispatch } from 'react-redux';
import { userActions, getUserAuthData } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const LoginForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const auth = useSelector(getUserAuthData);
   const isUserAuthorized = !!auth?.id;

   useEffect(() => {
      if (isUserAuthorized) {
         navigate('/dashboard');
      }
   }, []);

   const onFinish = (values) => {
      setIsLoading(true);
      AuthByLoginAndPassword(values)
         .then((res) => {
            dispatch(userActions.loginUser(res));
            message.info(`Добро пожаловать ${res.login}!`);
            navigate('/dashboard');
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
            maxWidth: 400,
            minWidth: 320
         }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Логин"
            name="login"
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
   );
};

export default LoginForm;
