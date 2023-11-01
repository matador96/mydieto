import React from 'react';
import CardListCatalogs from '@features/catalog/ui/CardListCatalogs';
import { Title } from '@shared/ui';

const CatalogsPage = () => {
   return (
      <div>
         <Title>Каталог плат и деталей</Title>
         <CardListCatalogs />
      </div>
   );
};

export default CatalogsPage;
