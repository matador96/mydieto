import React from 'react';
import TableCategories from '@features/manage-materialcategories/ui/TableCategories';
import { Title } from '@shared/ui';

const MaterialCategoriesPage = () => {
   return (
      <div>
         <Title>Список категорий сырья</Title>
         <TableCategories />
      </div>
   );
};

export default MaterialCategoriesPage;
