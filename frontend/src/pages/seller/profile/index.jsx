/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Title } from '@shared/ui';
import { Button, Modal, Row, Col, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserForm from '@features/user/UserForm';
import ManageSellerAddressesList from '@features/seller/ManageSellerAddressesList';
import EditMySellerForm from '@features/seller/EditMySellerForm';

// import { ExclamationCircleFilled } from '@ant-design/icons';
// import { RoutePath } from '@shared/config/routes';

// const { confirm } = Modal;

const ProfilePage = () => {
   // const navigate = useNavigate();

   // const showConfirm = () => {
   //    return confirm({
   //       title: 'Вы точно хотите выйти?',
   //       icon: <ExclamationCircleFilled />,
   //       maskClosable: true,
   //       onOk() {
   //          navigate(RoutePath.logout);
   //       },
   //       okText: 'Выйти',
   //       cancelText: 'Отмена'
   //    });
   // };

   return (
      <div>
         <Title>Настройки профиля</Title>
         {/* <Button type="primary" danger onClick={showConfirm}>
            Выйти из аккаунта
         </Button> */}
         <Row gutter={24}>
            <Col span={12}>
               <h3
                  style={{
                     color: '#000',

                     fontFamily: 'Inter',
                     fontSize: '16px',
                     fontStyle: 'normal',
                     fontWeight: '600',
                     lineHeight: '24px'
                  }}>
                  Профиль
               </h3>
               <EditMySellerForm />
            </Col>

            <Col span={12}>
               {/* <Divider orientation="left">Мои адреса доставки</Divider> */}
               <ManageSellerAddressesList />
            </Col>
            {/* <Col span={12}>
               <Divider orientation="left">Данные для входа</Divider>
               <UserForm />
            </Col> */}
         </Row>
         {/* <Button>Сохранить изменения</Button> */}

         {/* <Row gutter={24}>
            <Col span={24}>
               <Divider orientation="left">Мои адреса доставки</Divider>
               <ManageSellerAddressesList />
            </Col>
         </Row> */}
      </div>
   );
};

export default ProfilePage;
