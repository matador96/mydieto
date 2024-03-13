/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';

import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';

const InstructorsPage = () => {
   return (
      <Content>
         <JoinToBlock
            title="Курсы"
            description="у нас можно найти полезные статьи, видео и блоги экспертов и подобрать индивидуальный план питания"
         />

         <ListOfTags />

         <TitleWithCounts />

         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default InstructorsPage;
