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
import ListOfSpecialists from './components/ListOfSpecialists';

const MainPage = () => {
   return (
      <Content>
         <JoinToBlock />
         <ThreeItemsWithUrl />
         <TitleOfBlocks />
         <ListOfTags />
         <ListOfCourses />

         <TitleOfBlocks />
         <ListOfTags />

         <ListOfSpecialists />
         <TitleWithCounts />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default MainPage;
