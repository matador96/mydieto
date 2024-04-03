/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Title from '@widgets/Custom/Title';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';
import Reviews from '@widgets/Custom/Reviews';
import { VerticalSpace } from '@shared/ui';
import ListOfSpecialists from '@pages/general/main/components/ListOfSpecialists';

import ListOfCoursesSlider from '@pages/general/main/components/ListOfCoursesSlider';
import ListOfSpecialistsSlider from '@features/list-instructor/ui/ListOfSpecialistsSlider';
import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import SearchInstructorBlock from './components/SearchInstructorBlock';

const InstructorsPage = () => {
   return (
      <Content>
         <JoinToBlock
            title="Эксперты"
            buttonUrl="/register"
            description="на нашем сайте вы найдёте лучших диетологов и нутрициологов, готовых поделиться своими знаниями и опытом"
         />{' '}
         <VerticalSpace />
         <Title>Популярное</Title>
         <VerticalSpace />
         <VerticalSpace />
         <ListOfSpecialistsSlider showMore={true} min={4} />
         <VerticalSpace />
         <VerticalSpace />
         <TitleWithCounts />
         <SearchInstructorBlock />
         <ListOfTags type="instructor" />
         <VerticalSpace />
         <ListOfSpecialists showMore={true} defaultLimit={9} />
         <VerticalSpace />
         <VerticalSpace />
         <Reviews />
         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <ListOfCoursesSlider className="twoelements" min={2} />
         <VerticalSpace />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default InstructorsPage;
