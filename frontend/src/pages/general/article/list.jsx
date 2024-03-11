/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content, Title } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import ListOfArticles from '@features/article/ui/ListOfArticles';

const ArticleList = () => {
   return (
      <Content>
         <Container>
            <Title>Статьи</Title>
            <ListOfArticles />
         </Container>
      </Content>
   );
};

export default ArticleList;
