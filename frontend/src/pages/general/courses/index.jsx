/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Row, Col, Input } from 'antd';
import { Content } from '@shared/ui';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';

import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import Container from '@widgets/Container/ui/Container';
import SearchCard from '@widgets/Filters/SearchCard';
import CheckBoxTagsCard from '@widgets/Filters/CheckBoxTagsCard';
import ListOfCourses from '@pages/general/main/components/ListOfCourses';
import { VerticalSpace } from '@shared/ui';

const InstructorsPage = () => {
   return (
      <Content>
         <JoinToBlock
            title="Курсы"
            description="у нас можно найти полезные статьи, видео и блоги экспертов и подобрать индивидуальный план питания"
         />

         <ListOfTags />
         <VerticalSpace />

         <Container>
            <Row gutter={24}>
               <Col span={8}>
                  <SearchCard />
                  <VerticalSpace />
                  <VerticalSpace />
                  <CheckBoxTagsCard title={'Направления'} />
                  <VerticalSpace />
                  <VerticalSpace />
                  <CheckBoxTagsCard title={'Срок обучения'} />
               </Col>

               <Col span={16}>
                  <ListOfCourses className="fullwidth" />
               </Col>
            </Row>
         </Container>

         <TitleWithCounts />

         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default InstructorsPage;
