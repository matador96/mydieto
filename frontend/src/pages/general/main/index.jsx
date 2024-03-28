/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
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
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import ListOfSpecialists from './components/ListOfSpecialists';

const CourseMainPageComponent = () => {
   const [tag, setTag] = useState(null);
   const navigate = useNavigate();

   return (
      <>
         <ListOfTags type="course" setChoosed={setTag} />
         <VerticalSpace />
         <ListOfCourses tag={tag} />
         <div className="list-all-button" onClick={() => navigate('/courses')}>
            <Button type="link">Все курсы</Button>
         </div>
      </>
   );
};

const InstructorMainPageComponent = () => {
   const navigate = useNavigate();
   const [post, setPost] = useState(null);
   return (
      <>
         <ListOfTags type="instructor" setChoosed={setPost} />
         <VerticalSpace />
         <ListOfSpecialists post={post} />
         <div className="list-all-button">
            <Button type="link" onClick={() => navigate('/instructors')}>
               Все эксперты
            </Button>
         </div>
      </>
   );
};

const MainPage = () => {
   return (
      <Content>
         <JoinToBlock buttonUrl="/register" />
         {/* <ThreeItemsWithUrl /> */}
         <TitleOfBlocks
            title="Курсы"
            description={
               <>
                  у нас можно найти полезные статьи, видео и блоги <br /> экспертов
                  и подобрать индивидуальный план питания
               </>
            }
            buttonTitle="Выбрать курс"
            buttonUrl="/courses"
         />

         <CourseMainPageComponent />

         <TitleWithCounts />
         <TitleOfBlocks
            title="Эксперты"
            description="на нашем сайте вы найдёте лучших диетологов и нутрициологов, готовых поделиться своими знаниями и опытом"
            buttonTitle="Выбрать эксперта"
            buttonUrl="/instructors"
         />

         <InstructorMainPageComponent />

         <FaqTitle />
         <FaqCollapse />
      </Content>
   );
};

export default MainPage;
