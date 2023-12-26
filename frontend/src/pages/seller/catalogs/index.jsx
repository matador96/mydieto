import React from 'react';
import CardListCatalogs from '@features/catalog/ui/CardListCatalogs';
import { Title } from '@shared/ui';

const CatalogsPage = () => {
   return (
      <>
         <Title style={{ marginBottom: '10px' }}>Каталог плат и деталей</Title>
         <CardListCatalogs />
      </>
   );
};

export default CatalogsPage;
