import React, { useEffect } from 'react';
import LoginForm from '@features/auth/ui/LoginForm';
import RegisterForm from '@features/auth/ui/RegisterForm';
import { Content, Title, Button } from '@shared/ui';
import { userActions } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
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
                        onClick={() => navigate('/register')}
                        style={{ padding: '0 3px' }}
                     >
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
                        onClick={() => navigate('/login')}
                        style={{ padding: '0 3px' }}
                     >
                        <span style={{ textDecoration: 'underline' }}>
                           авторизуемся!
                        </span>
                     </Button>
                  </>
               )}
            </Card>

            <Card
               style={{ marginTop: '25px' }}
               title="Экориум - ваш личный онлайн каталог электронного лома"
            >
               Вы сможете:
               <ul>
                  <li>
                     легко организовать свои онлайн каталог в личном интернет
                     пространстве
                  </li>
                  <li>
                     получить доступ ко всему рынку Покупатетей электронного лома
                     продать
                  </li>
                  <li>
                     весть каталог или отдельные позиции по самой выгодной цене на
                     рынке
                  </li>
               </ul>{' '}
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

         navigate('/login');
      });
   }, []);

   return (
      <Content>
         <Title>Выход из аккаунта</Title>
      </Content>
   );
};

export { AuthPage, LogoutPage };
