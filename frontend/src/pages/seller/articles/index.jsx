import React from 'react';
import CardListArticles from '@features/article/ui/CardListArticles';
import { Title } from '@shared/ui';

const ArticlesPage = () => {
   return (
      <>
         <Title style={{ marginBottom: '10px' }}>Каталог плат и деталей</Title>
         <CardListArticles />
      </>
   );
};

export default ArticlesPage;
