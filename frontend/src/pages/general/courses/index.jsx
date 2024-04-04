/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input } from 'antd';
import { Content } from '@shared/ui';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';
import Reviews from '@widgets/Custom/Reviews';

import ListOfSpecialistsSlider from '@features/list-instructor/ui/ListOfSpecialistsSlider';
import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import Container from '@widgets/Container/ui/Container';
import SearchCard from '@widgets/Filters/SearchCard';
import CheckBoxTagsCard from '@widgets/Filters/CheckBoxTagsCard';
import ListOfCourses from '@pages/general/main/components/ListOfCourses';
import { VerticalSpace } from '@shared/ui';

import { getTags } from '@shared/api/all/tags';

const ListOfCoursesWithFilters = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [dataTags, setDataTags] = useState([]);
   const [filterParams, setFilterParams] = useState({
      search: '',
      tags: [],
      duration: []
   });

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      getTags('course').then((res) => {
         let result = res?.json?.data
            ? res?.json.data.map((item) => ({
                 label: item,
                 key: item,
                 value: item,
                 active: false
              }))
            : [];
         setDataTags((e) => [...e, ...result]);
         setIsLoading(false);
      });
   };

   const onChangeSearch = (e) => {
      setFilterParams({ ...filterParams, search: e.target.value });
   };

   const onChangeCheckBox = (type, checkedValues) => {
      setFilterParams({ ...filterParams, [type]: checkedValues });
   };

   return (
      <Container>
         <Row gutter={24}>
            <Col span={8}>
               <SearchCard onChange={onChangeSearch} />
               <VerticalSpace />
               <VerticalSpace />
               <CheckBoxTagsCard
                  title={'Направления'}
                  list={dataTags}
                  onChange={(checkedValues) =>
                     onChangeCheckBox('tags', checkedValues)
                  }
               />
               <VerticalSpace />
               <VerticalSpace />
               <CheckBoxTagsCard
                  title={'Срок обучения'}
                  onChange={(checkedValues) =>
                     onChangeCheckBox('duration', checkedValues)
                  }
                  list={[
                     { label: 'до 1 недели', value: 7 * 8 },
                     { label: 'до 2 недель', value: 7 * 8 * 2 },
                     { label: 'до 3 недель', value: 7 * 8 * 3 }
                  ]}
               />
            </Col>

            <Col span={16}>
               <ListOfCourses
                  className="fullwidth"
                  showMore={true}
                  filterParams={filterParams}
               />
            </Col>
         </Row>
      </Container>
   );
};

const CoursesPage = () => {
   return (
      <Content>
         <JoinToBlock
            title="Курсы"
            description="у нас можно найти полезные статьи, видео и блоги экспертов и подобрать индивидуальный план питания"
            buttonUrl="/register"
         />{' '}
         <VerticalSpace />
         {/* <ListOfTags type="instructor" /> */}
         {/* <VerticalSpace /> */}
         <ListOfCoursesWithFilters />
         <VerticalSpace /> <VerticalSpace />
         <Reviews /> <VerticalSpace />
         <VerticalSpace />
         <TitleWithCounts />
         <ListOfSpecialistsSlider min={4} />
         <VerticalSpace />
         <VerticalSpace />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default CoursesPage;
