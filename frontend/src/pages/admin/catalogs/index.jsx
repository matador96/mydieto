import React from 'react';
import TableCatalogs from '@features/catalog/ui/TableCatalogs';
import { Title } from '@shared/ui';

const ManageCatalogsPage = () => {
   return (
      <div>
         <Title>Каталог плат и деталей</Title>
         <TableCatalogs />
      </div>
   );
};

export default ManageCatalogsPage;
