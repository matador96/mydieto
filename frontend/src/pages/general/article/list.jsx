/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content, Title } from '@shared/ui';
import ListOfArticles from '@features/article/ui/ListOfArticles';

const ArticleList = () => {
   return (
      <Content>
         <Title>Блог</Title>
         <ListOfArticles />
      </Content>
   );
};

export default ArticleList;
