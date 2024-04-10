/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import Reviews from '@widgets/Custom/Reviews';
import { Button } from '@shared/ui';
import JoinToBlockAbout from '@pages/general/about/components/JoinToBlockAbout';
import TitleOfBlocks from '../main/components/TitleOfBlocks';
import { VerticalSpace } from '@shared/ui';
import FaqCollapse from '@widgets/Custom/FaqCollapse';
import { useNavigate } from 'react-router-dom';
import Socials from '@pages/general/about/components/Socials';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';
import AboutRecomendations from '@pages/general/about/components/AboutRecomendations';
import ListOfSpecialistsSlider from '@features/list-instructor/ui/ListOfSpecialistsSlider';
import SurprizeBlock from '@pages/general/about/components/SurprizeBlock';
import AboutStats from '@pages/general/about/components/AboutStats';
import WhatsIncomingOnFirstCourse from '@pages/general/about/components/WhatsIncomingOnFirstCourse';
import AboutSchemaWithArrows from '@pages/general/about/components/AboutSchemaWithArrows';
import { Flex } from 'antd';
import ListOfCoursesSlider from '@pages/general/main/components/ListOfCoursesSlider';

const InstructorMainPageComponent = () => {
   const navigate = useNavigate();
   return (
      <>
         <ListOfSpecialistsSlider />
         {/* <ListOfSpecialists post={post} /> */}
         <div className="list-all-button">
            <Button type="link" onClick={() => navigate('/instructors')}>
               Все эксперты
            </Button>
         </div>
      </>
   );
};

const ButtonCentered = ({ label }) => {
   return (
      <Container>
         <Flex justify={'center'} align={'center'}>
            <Button className="button-style-2">
               {label} <RightArrowIcon />
            </Button>
         </Flex>
      </Container>
   );
};

const TwoBlocks = () => {
   return (
      <Container>
         <div className="two-blocks-50">
            <div className="two-blocks-50-left"></div>

            <div className="two-blocks-50-right description-typography">
               <p>
                  Длинное рыбное описание курса и чего то ещё Длинное рыбное описание
                  курса и чего то ещё Длинное рыбное описание курса и чего
                  то ещё Длинное рыбное описание курса и чего то ещё
               </p>
               <p>
                  Длинное рыбное описание курса и чего то ещё Длинное рыбное описание
                  курса и чего то ещё Длинное рыбное описание курса и чего
                  то ещё Длинное рыбное описание курса и чего то ещё
               </p>{' '}
               <p>
                  Длинное рыбное описание курса и чего то ещё Длинное рыбное описание
                  курса и чего то ещё Длинное рыбное описание курса и чего
                  то ещё Длинное рыбное описание курса и чего то ещё
               </p>
               <VerticalSpace />
            </div>
         </div>
      </Container>
   );
};

const AboutPage = () => {
   return (
      <Content>
         <JoinToBlockAbout />
         <VerticalSpace />
         <VerticalSpace />
         <AboutStats />
         <VerticalSpace />
         <VerticalSpace />

         <TitleOfBlocks title="Психологи YouTalk поймут и поддержат в трудное время" />
         <VerticalSpace />
         <AboutRecomendations />
         <VerticalSpace />
         <TitleOfBlocks title="Что говорят о терапии с психологом наши клиенты" />

         <VerticalSpace />
         <VerticalSpace />
         <Reviews />
         <VerticalSpace />
         <VerticalSpace />
         <ButtonCentered label="Выбрать эксперта" />
         <VerticalSpace />
         <VerticalSpace />

         <VerticalSpace />
         <TitleOfBlocks title="Как это будет в YouTalk" isCentered />

         <VerticalSpace />
         <VerticalSpace />
         <AboutSchemaWithArrows />
         <VerticalSpace />
         <VerticalSpace />
         <WhatsIncomingOnFirstCourse />

         <TitleOfBlocks
            title="С кем мы работаем"
            description="Команда опытных психотерапевтов проводит интервью с каждым кандидатом, где оценивает его профессионализм"
         />

         <VerticalSpace />
         <VerticalSpace />
         <TwoBlocks />

         <VerticalSpace />
         <VerticalSpace />

         <VerticalSpace />
         <InstructorMainPageComponent />
         <VerticalSpace />
         <TitleOfBlocks title="Ответы на частые вопросы" isCentered />
         <FaqCollapse />

         <SurprizeBlock />

         <TitleOfBlocks
            title="Полезные статьи о терапии"
            description="Познакомьтесь с популярными материалами"
         />
         <VerticalSpace />

         <ListOfCoursesSlider className="twoelements" min={2} />
         <VerticalSpace />

         <ButtonCentered label="Читать наш блог" />

         <VerticalSpace />
         <VerticalSpace />
         <Socials />
      </Content>
   );
};

export default AboutPage;
