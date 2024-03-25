/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import ThreeItemsWithUrl from './components/ThreeItemsWithUrl';
import TitleOfBlocks from './components/TitleOfBlocks';
import ListOfTags from '@widgets/Custom/ListOfTags';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import ListOfCourses from './components/ListOfCourses';
import { VerticalSpace } from '@shared/ui';

import ListOfSpecialists from './components/ListOfSpecialists';

const MainPage = () => {
   return (
      <Content>
         <JoinToBlock />
         {/* <ThreeItemsWithUrl /> */}
         <TitleOfBlocks
            title="Курсы"
            description="у нас можно получить индивидуальные советы и планы питания, выбрав специалиста в соответствии с вашими потребностями и целями"
            buttonTitle="Выбрать курс"
         />

         <ListOfTags type="course" />
         <VerticalSpace />
         <ListOfCourses />

         <TitleWithCounts />
         <TitleOfBlocks
            title="Эксперты"
            description="на нашем сайте вы найдёте лучших диетологов и нутрициологов, готовых поделиться своими знаниями и опытом"
            buttonTitle="Выбрать эксперта"
         />
         <ListOfTags type="instructor" />

         <ListOfSpecialists />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default MainPage;
