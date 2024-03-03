/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';

const items = [
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      age: 30,
      experience: 5,
      isNew: true
   },
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      age: 30,
      experience: 5,
      isNew: false
   },
   {
      firstName: 'Алина',
      lastName: 'Маслова',
      post: 'Нутрицолог, психолог, коуч',
      age: 30,
      experience: 5,
      isNew: true
   }
];

const SpecialistCard = ({ firstName, lastName, post, isNew, age, experience }) => {
   return (
      <div className="specialist-card">
         {isNew ? <div className="specialist-card_tag">Новый</div> : null}

         <div className="specialist-card-avatar"></div>

         <div className="specialist-card-name">
            {firstName} {lastName}
         </div>
         <div className="specialist-card-post">{post}</div>

         <div className="specialist-card-extra">{`${age} лет | Опыт ${experience} лет`}</div>

         <Button className="specialist-card-button" type="primary">
            Записаться
         </Button>
         <Button className="specialist-card-button" type="link">
            Подробнее{' '}
         </Button>
      </div>
   );
};

const ListOfSpecialists = () => {
   return (
      <Container>
         <div className="list-of-specialist">
            {items.map((item, index) => (
               <SpecialistCard key={index} {...item} />
            ))}
         </div>

         <div className="list-all-button">
            <Button type="link">Все эксперты</Button>
         </div>
      </Container>
   );
};

export default ListOfSpecialists;
