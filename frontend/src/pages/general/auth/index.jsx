import React, { useEffect } from 'react';
import LoginForm from '@features/auth/ui/LoginForm';
import RegisterForm from '@features/auth/ui/RegisterForm';
import { Content, Title, Button } from '@shared/ui';
import { userActions } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

import { RoutePath } from '@shared/config/routes';
import { Logout } from '@features/auth/model/services/AuthByLoginAndPassword';

import { useDispatch } from 'react-redux';

const AuthPage = ({ isLoginForm = true }) => {
   const navigate = useNavigate();

   return (
      <Row className="auth-page" gutter={[16, 24]}>
         <Col className="auth-page_left" span={24}>
            <Card title={isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}>
               {isLoginForm ? (
                  <>
                     <LoginForm />
                     Нет логина и пароля? Тогда давайте
                     <Button
                        type="link"
                        onClick={() => navigate(RoutePath.register)}
                        style={{ padding: '0 3px' }}>
                        <span style={{ textDecoration: 'underline' }}>
                           зарегистрируемся!
                        </span>
                     </Button>
                  </>
               ) : (
                  <>
                     <RegisterForm />
                     Уже зарегистрированы? Давайте
                     <Button
                        type="link"
                        onClick={() => navigate(RoutePath.login)}
                        style={{ padding: '0 3px' }}>
                        <span style={{ textDecoration: 'underline' }}>
                           авторизуемся!
                        </span>
                     </Button>
                  </>
               )}
            </Card>
         </Col>
      </Row>
   );
};

const LogoutPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      Logout().then(() => {
         dispatch(userActions.logoutUser());

         navigate(RoutePath.login);
      });
   }, []);

   return (
      <Content>
         <Title>Выход из аккаунта</Title>
      </Content>
   );
};

export { AuthPage, LogoutPage };
