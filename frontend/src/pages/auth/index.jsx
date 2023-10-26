import React, { useEffect } from 'react';
import LoginForm from '@features/auth/ui/LoginForm';
import { Content, Title } from '@shared/ui';
import { userActions } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@features/auth/model/services/AuthByLoginAndPassword';

import { useDispatch } from 'react-redux';

const AuthPage = () => {
   return (
      <Content>
         <Title>Авторизация</Title>
         <LoginForm />
      </Content>
   );
};

const LogoutPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      Logout().then(() => {
         dispatch(userActions.logoutUser());
         navigate('/auth');
      });
   }, []);

   return (
      <Content>
         <Title>Выход из аккаунта</Title>
      </Content>
   );
};

export { AuthPage, LogoutPage };
