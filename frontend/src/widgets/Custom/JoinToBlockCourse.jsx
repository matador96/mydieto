/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowCircleWhite from '@shared/assets/icons/RightArrowCircleWhite';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import RonaldoPhoto from '@shared/assets/images/ronaldo.png';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const JoinToBlockCourse = ({
   title = `Антихрупкость мозга`,
   instructor = {
      firstName: 'Иван',
      lastName: 'Иванов',
      posts: ['Доктор медицинских наук']
   }
}) => {
   const navigate = useNavigate();
   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div
               className="join-to-block-course"
               style={{
                  backgroundImage: `url(${RonaldoPhoto})`
               }}>
               <Breadcrumb
                  separator=">"
                  items={[
                     {
                        title: 'Главная',
                        href: '/'
                     },
                     {
                        title: 'Курсы',
                        href: '/courses'
                     },
                     {
                        title: title
                     }
                  ]}
               />

               <div className="join-to-block-course_title">{title}</div>

               <div
                  className="course-card_author jointoblockcourse"
                  style={{ marginTop: '24px', marginBottom: '60px' }}>
                  <div className="course-card_author-avatar"></div>
                  <div>
                     <div className="course-card_author-name">
                        {instructor.firstName} {instructor.lastName}
                     </div>
                     {instructor.posts && (
                        <div className="course-card_author-post">
                           {instructor.posts.join(', ')}
                        </div>
                     )}
                  </div>
               </div>

               <div className="join-to-block-course_button">
                  Присоединиться <RightArrowCircleWhite />
               </div>
            </div>
         </Container>
      </div>
   );
};

export default JoinToBlockCourse;
