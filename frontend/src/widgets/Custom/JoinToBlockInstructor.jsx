/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowCircleWhite from '@shared/assets/icons/RightArrowCircleWhite';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import RonaldoPhoto from '@shared/assets/images/ronaldo.png';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const JoinToBlockInstructor = ({
   firstName,
   lastName,
   experience,
   posts,
   countOfCourses = 4
}) => {
   const navigate = useNavigate();
   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div
               className="join-to-block-instructor"
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
                        title: 'Эксперты',
                        href: '/instructors'
                     },
                     {
                        title: `${firstName} ${lastName}`
                     }
                  ]}
               />

               <div className="join-to-block-instructor_title">{`${firstName} ${lastName}`}</div>
               <div className="join-to-block-instructor_posts">
                  {posts.join(', ')}
               </div>
               <div className="join-to-block-instructor_stats">
                  <div className="join-to-block-instructor_stats_experience">
                     <div className="join-to-block-instructor_stats_count">
                        {experience}
                        <span className="join-to-block-instructor_stats_count_extra">
                           лет
                        </span>
                     </div>
                     <div className="join-to-block-instructor_stats_label">Опыт</div>
                  </div>
                  <div className="join-to-block-instructor_stats_courses">
                     <div className="join-to-block-instructor_stats_count">
                        {countOfCourses}
                     </div>
                     <div className="join-to-block-instructor_stats_label">
                        Курсов
                     </div>
                  </div>
                  <div className="join-to-block-instructor_stats_clients">
                     <div className="join-to-block-instructor_stats_count">
                        200
                        <div className="count-with-title_count_plus">+</div>
                     </div>
                     <div className="join-to-block-instructor_stats_label">
                        Клиентов
                     </div>
                  </div>
               </div>

               <div className="join-to-block-instructor_button">
                  Присоединиться <RightArrowCircleWhite />
               </div>
            </div>
         </Container>
      </div>
   );
};

export default JoinToBlockInstructor;
