import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { AuthByLoginAndPassword } from '@features/auth/model/services/AuthByLoginAndPassword';
import { useDispatch } from 'react-redux';
import { userActions, isUserAuthorized } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Modal, Alert } from 'antd';
import PasswordRecoveryForm from './PasswordRecoveryForm';

const resetPasswort = () => {
   Modal.info({
      title: 'Восстановить пароль',
      width: 400,
      content: <div>Некая форма позже будет</div>,
      onOk() {}
   });
};

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
            setTimeout(() => {
               setIsLoading(false);
            dispatch(userActions.loginUser(res));
            message.info(`Добро пожаловать ${res.email}!`);
            navigate(`/`);
         }, 1000);
         })
         .catch((e) => {
            setIsLoading(false);
            setErrorMessage(e?.message || 'Ошибка');
         })
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
         style={{
            maxWidth: 460,
            minWidth: 320
         }}
         layout="vertical"
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Form.Item
            label="Email"
            required
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
            <Input type="email" placeholder={'Введите e-mail'} />
         </Form.Item>

         <Form.Item
            label="Пароль"
            required
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

         <div
            style={{
               marginBottom: '10px',
               display: 'flex',
               justifyContent: 'flex-end',
               marginTop: '-10px'
            }}>
            <a
               className="login-form-forgot"
               href=""
               onClick={(e) => {
                  e.preventDefault();
                  resetPasswort();
               }}>
               Забыли пароль?
            </a>
         </div>

         <Form.Item>
            {errorMessage ? (
               <Alert
                  message={errorMessage}
                  type="error"
                  showIcon
                  style={{ width: '100%', marginBottom: '15px' }}
               />
            ) : null}
            {/* <Button
                  type="link"
                  onClick={handleForgotPassword}
                  style={{ padding: '0 3px' }}>
                  <span style={{ textDecoration: 'underline' }}>Забыли пароль?</span>
               </Button> */}{' '}
            <Button
               type="primary"
               htmlType="submit"
               loading={isLoading}
               style={{ width: '100%', marginTop: 10 }}>
               Войти
            </Button>
         </Form.Item>
      </Form>
   );
};

export default LoginForm;
