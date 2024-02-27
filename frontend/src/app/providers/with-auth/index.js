import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@entitles/User';
import { CheckAuth } from '@features/auth/model/services/AuthByLoginAndPassword';
import { Content, Title } from '@shared/ui';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@features/auth/model/services/AuthByLoginAndPassword';
import { Modal, Alert } from 'antd';
import { RoutePath } from '@shared/config/routes';

const AuthProvider = (props) => {
   const dispatch = useDispatch();
   const [isLoaded, setIsLoaded] = useState(false);
   const [isBlocked, setIsBlocked] = useState(false);
   const [isHaveError, setIsHaveError] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (isLoaded) return;
      fetchData();
   }, []);

   const fetchData = () => {
      // CheckAuth()
      //    .then((res) => {
      //       if (res?.status === 423) {
      //          setIsLoaded(true);
      //          logout();
      //          Modal.error({
      //             title: res.json.error.message
      //          });
      //          return;
      //       }
      //       if (res?.json?.data?.email) {
      //          dispatch(userActions.loginUser(res?.json?.data));
      //       }
      //       setIsLoaded(true);
      //       setIsHaveError(false);
      //    })
      //    .catch((e) => {
      //       if (isHaveError) {
      //          setIsHaveError(false);
      //       }
      //       if (e.message !== '401') setIsHaveError(true);
      //       setIsLoaded(true);
      //    });
      setIsLoaded(true);
   };

   const logout = () => {
      Logout().then(() => {
         dispatch(userActions.logoutUser());
         setIsBlocked(false);
         navigate(RoutePath.login);
      });
   };

   if (isBlocked) {
      return (
         <Content style={{ padding: 20 }}>
            <Title>Вы заблокированы</Title>
            <Button icon={<LogoutOutlined />} onClick={logout}>
               Выйти
            </Button>
         </Content>
      );
   }

   if (isHaveError) {
      return (
         <Content style={{ padding: 20 }}>
            <Alert message="Ошибка, сервер недоступен" type="error" showIcon />
            <br />
            <Button icon={<LogoutOutlined />} onClick={() => fetchData()}>
               Обновить
            </Button>
         </Content>
      );
   }

   return <>{isLoaded && props.children}</>;
};

export default AuthProvider;
