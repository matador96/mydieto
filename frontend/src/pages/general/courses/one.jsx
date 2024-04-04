/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Spin, Button, Space } from 'antd';
import { Content } from '@shared/ui';
import TitleWithCounts from '@widgets/Custom/TitleWithCounts';
import ListOfTags from '@widgets/Custom/ListOfTags';
import Reviews from '@widgets/Custom/Reviews';
import { getDurationInDaysOrWeeks } from '@shared/utils/tsToTime';
import { GetCourse } from '@features/course/model/services/GetCourse';
import ListOfCoursesSlider from '@pages/general/main/components/ListOfCoursesSlider';

import RightArrowCircleWhite from '@shared/assets/icons/RightArrowCircleWhite';
import { useParams } from 'react-router-dom';
import ListOfSpecialistsSlider from '@features/list-instructor/ui/ListOfSpecialistsSlider';
import FaqTitle from '@widgets/Custom/FaqTitle';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import JoinToBlockCourse from '@widgets/Custom/JoinToBlockCourse';
import Container from '@widgets/Container/ui/Container';
import SearchCard from '@widgets/Filters/SearchCard';
import CheckBoxTagsCard from '@widgets/Filters/CheckBoxTagsCard';
import TitleOfBlocks from '../main/components/TitleOfBlocks';
import ListOfCourses from '@pages/general/main/components/ListOfCourses';
import { VerticalSpace } from '@shared/ui';

import { getTags } from '@shared/api/all/tags';

const CoursePage = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const { id } = useParams();

   useEffect(() => {
      fetchData(id);
   }, [id]);

   const fetchData = (id) => {
      setIsLoading(true);
      GetCourse(id).then((res) => {
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
            <>
               <JoinToBlockCourse title={item.title} instructor={item.instructor} />{' '}
               <VerticalSpace />
               <TitleOfBlocks title="О курсе" />
               <VerticalSpace />
               <VerticalSpace />
               <Container>
                  <div className="two-blocks-50" style={{ minHeight: '350px' }}>
                     <div className="two-blocks-50-left"></div>

                     <div className="two-blocks-50-right description-typography">
                        {item.description}
                        <VerticalSpace />
                        <Space
                           direction="horizontal"
                           size="small"
                           style={{ gap: '20px' }}>
                           {item.tags.map((post) => (
                              <Button key={post} type="default">
                                 {post}
                              </Button>
                           ))}
                           <Button
                              key={'duration'}
                              type="default"
                              style={{ textTransform: 'lowercase' }}>
                              {getDurationInDaysOrWeeks(item.duration)}
                           </Button>
                        </Space>
                     </div>
                  </div>

                  <div className="course-videos">
                     <div className="course-videos_item">
                        <div className="course-videos_item_preview">
                           <div className="course-videos_item_duration">21:23</div>
                        </div>

                        <div className="course-videos_item_title">
                           Название видео
                        </div>
                     </div>{' '}
                     <div className="course-videos_item">
                        <div className="course-videos_item_preview">
                           <div className="course-videos_item_duration">21:23</div>
                        </div>

                        <div className="course-videos_item_title">
                           Название видео
                        </div>
                     </div>{' '}
                     <div className="course-videos_item">
                        <div className="course-videos_item_preview">
                           <div className="course-videos_item_duration">21:23</div>
                        </div>

                        <div className="course-videos_item_title">
                           Название видео
                        </div>
                     </div>
                  </div>
               </Container>
               <VerticalSpace />
               <TitleWithCounts />
               <TitleOfBlocks title="Об эксперте" />
               <VerticalSpace /> <VerticalSpace />
               <Container>
                  <div className="two-blocks-50">
                     <div className="two-blocks-50-left"></div>

                     <div className="two-blocks-50-right description-typography">
                        {item.instructor.about}
                        <VerticalSpace />
                        <div
                           className="join-to-block-course_button"
                           style={{ width: '300px' }}>
                           Другие курсы эксперта <RightArrowCircleWhite />
                        </div>
                     </div>
                  </div>
               </Container>
            </>
         ))}

         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <VerticalSpace />
         <Reviews />
         <VerticalSpace />

         <TitleOfBlocks title="Другие курсы" />
         <VerticalSpace />
         <VerticalSpace />

         <ListOfCoursesSlider className="twoelements" min={2} />
         <VerticalSpace />
         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default CoursePage;
