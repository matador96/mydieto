/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Title from '@widgets/Custom/Title';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';

import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import SearchInstructorBlock from './components/SearchInstructorBlock';

const InstructorsPage = () => {
   return (
      <Content>
         <JoinToBlock
            title="Эксперты"
            description="на нашем сайте вы найдёте лучших диетологов и нутрициологов, готовых поделиться своими знаниями и опытом"
         />
         <Title>Популярное</Title>

         <TitleWithCounts />
         <SearchInstructorBlock />

         <ListOfTags type="instructor" />

         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default InstructorsPage;
