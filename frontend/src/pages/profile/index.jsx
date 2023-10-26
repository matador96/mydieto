/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Title, VerticalSpace } from '@shared/ui';
import { useSelector } from 'react-redux';
import { Descriptions, Button, Tag, Modal, Collapse, Row, Col } from 'antd';
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

   const generatePermissionsList = (arr) => {
      const html = [];

      arr.map((v) =>
         html.push(
            <div>
               {v
                  .replaceAll('_', ' ')
                  .replace('can', 'Может')
                  .replace('edit', 'редактировать')
                  .replace('delete', 'удалять')
                  .replace('create', 'создавать')
                  .replace('reset password of', 'сбрасывать пароль')
                  .replace('view', 'просматривать')
                  .replace('drivers', 'водителей')
                  .replace('leads', 'заявки')
                  .replace('users', 'пользователей')
                  .replace('sellers', 'продавцов')
                  .replace('categories', 'категории')
                  .replace('routes', 'маршруты')
                  .replace('addresses', 'адреса продавцов')
                  .replace('faqs', 'faqs')
                  .replace('acceptances', 'приемки')
                  .replace('auctions', 'торги')
                  .replace('images', 'картинки')}
            </div>
         )
      );
      return html;
   };

   return (
      <div>
         <Title>Профиль</Title>
         <VerticalSpace />
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
               <Col className="gutter-row" span={8} className="stats-card-count-col">
                  <Collapse
                     items={[
                        {
                           key: '1',
                           label: 'Все разрешения пользователя',
                           children: generatePermissionsList(user.permissions)
                        }
                     ]}
                  />
               </Col>

               <CanDo permission="can_view_userlogs">
                  <Col
                     className="gutter-row"
                     span={2}
                     className="stats-card-count-col">
                     <Button danger onClick={() => navigate('/logs')}>
                        Логи
                     </Button>
                  </Col>
               </CanDo>
            </Row>
         ))}
      </div>
   );
};

export default ProfilePage;
