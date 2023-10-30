import React from 'react';
import TableCatalogs from '@features/catalog/ui/TableCatalogs';
import { Title } from '@shared/ui';

const CatalogsPage = () => {
   return (
      <div>
         <Title>Каталог</Title>
         <TableCatalogs />
      </div>
   );
};

export default CatalogsPage;
