/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';

import { Row, Col, Input, Spin, Button, Space } from 'antd';
import { Content } from '@shared/ui';
import Title from '@widgets/Custom/Title';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';
import Reviews from '@widgets/Custom/Reviews';
import { VerticalSpace } from '@shared/ui';
import ListOfSpecialists from '@pages/general/main/components/ListOfSpecialists';

import RightArrowCircleWhite from '@shared/assets/icons/RightArrowCircleWhite';
import Container from '@widgets/Container/ui/Container';
import JoinToBlockInstructor from '@widgets/Custom/JoinToBlockInstructor';
import { GetInstructorById } from '@features/list-instructor/model/GetInstructorById';
import ListOfCourses from '@pages/general/main/components/ListOfCourses';
import ListOfSpecialistsSlider from '@features/list-instructor/ui/ListOfSpecialistsSlider';
import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlock from '@widgets/Custom/JoinToBlock';
import { useParams } from 'react-router-dom';
import TitleOfBlocks from '../main/components/TitleOfBlocks';
import SearchInstructorBlock from './components/SearchInstructorBlock';

const InstructorPage = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const { id } = useParams();

   useEffect(() => {
      fetchData(id);
   }, [id]);

   const fetchData = (id) => {
      setIsLoading(true);
      GetInstructorById(id).then((res) => {
         console.log(res);
         let result = res?.id ? [res] : [];
         setData(result);
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <Content>
         {data.map((item) => (
            <React.Fragment key={item.id}>
               <JoinToBlockInstructor {...item} /> <VerticalSpace />
               <TitleOfBlocks title="Об эксперте" />
               <VerticalSpace />
               <Container>
                  <div className="two-blocks-50" style={{ minHeight: '350px' }}>
                     <div className="two-blocks-50-left"></div>

                     <div className="two-blocks-50-right description-typography">
                        {item.about}
                        <VerticalSpace />
                        <div
                           className="join-to-block-course_button"
                           style={{ width: '300px' }}>
                           Другие курсы эксперта <RightArrowCircleWhite />
                        </div>
                     </div>
                  </div>
               </Container>
            </React.Fragment>
         ))}
         <VerticalSpace />
         <VerticalSpace />
         <TitleOfBlocks title="Курсы" />
         <VerticalSpace />
         <ListOfCourses className="twoelements" defaultLimit={2} />
         <VerticalSpace />
         <VerticalSpace /> <VerticalSpace />
         <Reviews />
         <VerticalSpace />
         <VerticalSpace />
         <TitleWithCounts />
         <VerticalSpace />
         <VerticalSpace />
         <TitleOfBlocks title="Другие эксперты" />
         <ListOfSpecialists
            className="fourElements"
            showMore={false}
            defaultLimit={4}
         />
         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default InstructorPage;
