import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Content, Title } from '@shared/ui';
import ListOfArticles from '@features/article/ui/ListOfArticles';

const ArticleById = () => {
   const { id } = useParams();

   return (
      <Content>
         <Title>{id}</Title>
         <ListOfArticles />
      </Content>
   );
};

export default ArticleById;
