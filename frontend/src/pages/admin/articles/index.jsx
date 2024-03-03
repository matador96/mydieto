import React from 'react';
import TableArticles from '@features/article/ui/TableArticles';
import { Title } from '@shared/ui';

const ManageArticlesPage = () => {
   return (
      <div>
         <Title>Список статей</Title>
         <TableArticles />
      </div>
   );
};

export default ManageArticlesPage;
