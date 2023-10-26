import React from 'react';
import TableUsers from '@features/list-user/ui/TableUsers';
import { Title } from '@shared/ui';

const UsersPage = () => {
   return (
      <div>
         <Title>Список пользователей</Title>
         <TableUsers />
      </div>
   );
};

export default UsersPage;
