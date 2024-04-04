/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
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

const ListOfInstructorsWithFilters = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [post, setPost] = useState(null);
   const [search, setSearch] = useState('');
   const [filterParams, setFilterParams] = useState({
      search: '',
      tags: [],
      duration: []
   });

   const onChangeSearch = (e) => {
      setFilterParams({ ...filterParams, search: e.target.value });
   };

   const onChangeCheckBox = (type, value) => {
      setFilterParams({ ...filterParams, [type]: value });
   };

   return (
      <>
         <SearchInstructorBlock setSearch={setSearch} />
         <ListOfTags type="instructor" setChoosed={setPost} />
         <VerticalSpace />
         <ListOfSpecialists
            showMore={true}
            defaultLimit={6}
            post={post}
            search={search}
         />
      </>
      // <Container>
      //    <Row gutter={24}>
      //       <Col span={8}>
      //          <SearchCard onChange={onChangeSearch} />
      //          <VerticalSpace />
      //          <VerticalSpace />
      //          <CheckBoxTagsCard
      //             title={'Направления'}
      //             list={dataTags}
      //             onChange={onChangeCheckBox}
      //          />
      //          <VerticalSpace />
      //          <VerticalSpace />
      //          <CheckBoxTagsCard
      //             title={'Срок обучения'}
      //             onChange={onChangeCheckBox}
      //             list={[
      //                { label: 'до 1 недели', value: '100' },
      //                { label: 'до 2 недель', value: '200' },
      //                { label: 'до 3 недель', value: '300' }
      //             ]}
      //          />
      //       </Col>

      //       <Col span={16}>
      //          <ListOfCourses className="fullwidth" showMore={true} />
      //       </Col>
      //    </Row>
      // </Container>
   );
};

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
         <ListOfInstructorsWithFilters />
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
