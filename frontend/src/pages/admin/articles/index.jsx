import React from 'react';
import TableArticles from '@features/article/ui/TableArticles';
import { Title } from '@shared/ui';

const ManageArticlesPage = () => {
   return (
      <div>
         <Title>Каталог плат и деталей</Title>
         <TableArticles />
      </div>
   );
};

export default ManageArticlesPage;
