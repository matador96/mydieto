import React from 'react';
import TableCatalogs from '@features/catalog/ui/TableCatalogs';
import { Title } from '@shared/ui';

const ManageOrdersPage = () => {
   return (
      <div>
         <Title>Заказы</Title>
         <TableCatalogs />
      </div>
   );
};

export default ManageOrdersPage;
