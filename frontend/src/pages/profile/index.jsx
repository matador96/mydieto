/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Title, VerticalSpace } from '@shared/ui';
import { useSelector } from 'react-redux';
import { Descriptions, Button, Tag, Modal, Collapse, Row, Col, Card } from 'antd';
import { getUserAuthData } from '@entitles/User';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import statuses from '@shared/const/statuses';
import CanDo from '@shared/lib/CanDo';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';
const { confirm } = Modal;

const ProfilePage = () => {
   const userData = useSelector(getUserAuthData);
   const navigate = useNavigate();

   const showConfirm = () => {
      return confirm({
         title: 'Вы точно хотите выйти?',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         onOk() {
            navigate('/logout');
         },
         okText: 'Выйти',
         cancelText: 'Отмена'
      });
   };

   return (
      <div>
         <Title>Мой профиль</Title>
         {/* <VerticalSpace /> */}

         <Card></Card>
         <Title>Мои адреса</Title>
         <Card style={{ marginTop: '25px' }}>
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
                  весть каталог или отдельные позиции по самой выгодной цене на рынке
               </li>
            </ul>{' '}
         </Card>
         {[userData].map((user) => (
            <Row gutter={[16, 24]} key={`user${user.id}`}>
               <Col
                  className="gutter-row"
                  span={24}
                  className="stats-card-count-col">
                  <Descriptions bordered>
                     <Descriptions.Item label="Логин">
                        {user.login}
                     </Descriptions.Item>
                     <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                     <Descriptions.Item label="Роль">
                        <Tag color={userRolesColors[user.role]} key={user.role}>
                           {userRolesLabels[user.role]}
                        </Tag>
                     </Descriptions.Item>
                     <Descriptions.Item label="Имя">
                        {user.firstName}
                     </Descriptions.Item>
                     <Descriptions.Item label="Фамилия">
                        {user.lastName}
                     </Descriptions.Item>
                     <Descriptions.Item label="Должность">
                        {user.post}
                     </Descriptions.Item>

                     <Descriptions.Item label="Почта">
                        {user.email}
                     </Descriptions.Item>

                     <Descriptions.Item label="Статус">
                        <Tag color={statuses[user.status]?.color}>
                           {statuses[user.status]?.label}
                        </Tag>
                     </Descriptions.Item>

                     <Descriptions.Item label="">
                        <Button type="primary" onClick={showConfirm}>
                           Выйти
                        </Button>
                     </Descriptions.Item>
                  </Descriptions>
               </Col>
            </Row>
         ))}
      </div>
   );
};

export default ProfilePage;
