import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { AuthByLoginAndPassword } from '@features/auth/model/services/AuthByLoginAndPassword';
import { useDispatch } from 'react-redux';
import { userActions, isUserAuthorized } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Space, Alert } from 'antd';
import PasswordRecoveryForm from './PasswordRecoveryForm';

const LoginForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [modalVisible, setModalVisible] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isAuthorized = useSelector(isUserAuthorized);

   useEffect(() => {
      if (isAuthorized) {
         navigate(`/`);
      }
   }, [isAuthorized]);

   const onFinish = (values) => {
      setErrorMessage('');
      setIsLoading(true);
      AuthByLoginAndPassword(values)
         .then((res) => {
            dispatch(userActions.loginUser(res));
            message.info(`Добро пожаловать ${res.email}!`);
            navigate(`/`);
         })
         .catch((e) => {
            setErrorMessage(e?.message || 'Ошибка');
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onFinishFailed = () => {
      setIsLoading(false);
   };

   const handleForgotPassword = () => {
      setModalVisible(true);
   };

   const handleCancel = () => {
      setModalVisible(false);
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
            minWidth: 320,
            position: 'relative'
         }}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Email"
            name="email"
            rules={[
               {
                  type: 'email',
                  message: 'Введите правильную почту'
               },
               {
                  required: true,
                  message: 'Поле не может быть пустым'
               }
            ]}>
            <Input type="email" placeholder={'Введите почту'} />
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
            <Input.Password placeholder={'Введите пароль'} />
         </Form.Item>

         <PasswordRecoveryForm visible={modalVisible} onCancel={handleCancel} />
         <Form.Item
            wrapperCol={{
               offset: 8,
               span: 16
            }}>
            <Space direction="vertical">
               {errorMessage ? (
                  <Alert message={errorMessage} type="error" showIcon />
               ) : null}

               {/* <Button
                  type="link"
                  onClick={handleForgotPassword}
                  style={{ padding: '0 3px' }}>
                  <span style={{ textDecoration: 'underline' }}>Забыли пароль?</span>
               </Button> */}

               <Button type="primary" htmlType="submit" loading={isLoading}>
                  Войти
               </Button>
            </Space>
         </Form.Item>
      </Form>
   );
};

export default LoginForm;
