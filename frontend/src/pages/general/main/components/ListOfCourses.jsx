/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';

const items = [
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      isPopular: true,
      expDate: '2 недели',
      title: 'Антихрупкость мозга',
      description:
         'Омолоди свой мозг и сделай его антихрупким с нашими видеуроками. Присоединяйся и тренируй не только тело, но и разум.'
   },
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      isPopular: true,
      expDate: '2 недели',
      title: 'Антихрупкость мозга',
      description:
         'Омолоди свой мозг и сделай его антихрупким с нашими видеуроками. Присоединяйся и тренируй не только тело, но и разум.'
   },
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      isPopular: true,
      expDate: '2 недели',
      title: 'Антихрупкость мозга',
      description:
         'Омолоди свой мозг и сделай его антихрупким с нашими видеуроками. Присоединяйся и тренируй не только тело, но и разум.'
   },
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      isPopular: true,
      expDate: '2 недели',
      title: 'Антихрупкость мозга',
      description:
         'Омолоди свой мозг и сделай его антихрупким с нашими видеуроками. Присоединяйся и тренируй не только тело, но и разум.'
   }
];

const CourseCard = ({
   firstName,
   lastName,
   post,
   isPopular,
   expDate,
   title,
   description
}) => {
   return (
      <div className="course-card">
         <div className="course-card_tag">{isPopular ? 'Популярное' : null}</div>

         <div className="course-card_author">
            <div className="course-card_author-avatar"></div>
            <div>
               <div className="course-card_author-name">
                  {firstName} {lastName}
               </div>
               <div className="course-card_author-post">{post}</div>
            </div>
         </div>

         <div>
            <div className="course-card_title">{title}</div>
            <div className="course-card_description">{description}</div>
         </div>

         <Button className="course-card_button" type="primary">
            Подробнее о курсе
         </Button>

         <div className="course-card_exp">Срок прохождения: {expDate}</div>
      </div>
   );
};

const ListOfCourses = () => {
   return (
      <Container>
         <div className="list-of-courses">
            {items.map((item, index) => (
               <CourseCard key={index} {...item} />
            ))}
         </div>

         <div className="list-all-button">
            <Button type="link">Все программы</Button>
         </div>
      </Container>
   );
};

export default ListOfCourses;
