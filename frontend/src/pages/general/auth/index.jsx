import React, { useEffect } from 'react';
import LoginForm from '@features/auth/ui/LoginForm';
import RegisterForm from '@features/auth/ui/RegisterForm';
import { Content, Title, Button } from '@shared/ui';
import { userActions } from '@entitles/User';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { RoutePath } from '@shared/config/routes';
import { Logout } from '@features/auth/model/services/AuthByLoginAndPassword';

import { useDispatch } from 'react-redux';

const LoginBlock = () => {
   return (
      <div className="auth-block">
         <div className="auth-block_title">Вход</div>
         <LoginForm />
      </div>
   );
};

const RegisterBlock = () => {
   return (
      <div className="auth-block">
         <div className="auth-block_title">Регистрация</div>
         <RegisterForm />
      </div>
   );
};

const AuthPage = ({ isLoginForm = true }) => {
   const navigate = useNavigate();

   return (
      <Container>
         {isLoginForm ? <LoginBlock /> : null}
         {!isLoginForm ? <RegisterBlock /> : null}

         {/* <Row className="auth-page" gutter={[16, 24]}>
            <Col className="auth-page_left" span={24}>
               <>
                  <Button
                     icon={<ArrowLeftOutlined />}
                     onClick={() => navigate(-1)}
                     style={{ marginRight: '10px' }}></Button>
                  {isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}
               </>

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
            </Col>
         </Row> */}
      </Container>
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
