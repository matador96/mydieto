/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Title } from '@shared/ui';
import { Row, Col } from 'antd';
import ManageSellerAddressesList from '@features/seller/ManageSellerAddressesList';
import EditMySellerForm from '@features/seller/EditMySellerForm';

const ProfilePage = () => {
   return (
      <div>
         <Title>Настройки профиля</Title>
         <Row style={{ position: 'relative', marginLeft: '0px' }} gutter={24}>
            <Col style={{ padding: '0' }} span={12}>
               <h3 className="profile-title">Профиль</h3>
               <EditMySellerForm />
            </Col>
            <div className="vertical-line"></div>
            <Col
               style={{ padding: '0', display: 'flex', justifyContent: 'flex-end' }}
               span={12}>
               <ManageSellerAddressesList />
            </Col>
         </Row>
      </div>
   );
};

export default ProfilePage;
