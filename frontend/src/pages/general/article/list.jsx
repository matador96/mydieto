/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import TitleOfBlocks from '../main/components/TitleOfBlocks';
import ListOfArticles from '@features/article/ui/ListOfArticles';
import { VerticalSpace } from '@shared/ui';

const ArticleList = () => {
   return (
      <Content>
         <Container>
            <TitleOfBlocks title="Статьи" />
            <VerticalSpace />
            <ListOfArticles />
         </Container>
      </Content>
   );
};

export default ArticleList;
