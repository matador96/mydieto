/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import JoinToBlock from './components/JoinToBlock';
import ThreeItemsWithUrl from './components/ThreeItemsWithUrl';
import TitleOfBlocks from './components/TitleOfBlocks';
import ListOfTags from './components/ListOfTags';
import TitleWithCounts from './components/TitleWithCounts';
import FaqTitle from './components/FaqTitle';
import Footer from './components/Footer';
import FaqCollapse from '@features/faq/ui/FaqCollapse';
import ListOfCourses from './components/ListOfCourses';
import ListOfSpecialists from './components/ListOfSpecialists';

const MainPage = () => {
   return (
      <>
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
         <Footer />
      </>
   );
};

export default MainPage;
