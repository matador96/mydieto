/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import { GetInstructorList } from '@features/list-instructor/model/GetInstructorList';

const SpecialistCard = ({ firstName, lastName, posts, marker, age, experience }) => {
   return (
      <div className="specialist-card">
         {marker ? <div className="specialist-card_tag">{marker}</div> : null}

         <div className="specialist-card-avatar"></div>

         <div className="specialist-card-name">
            {firstName} {lastName}
         </div>
         {posts && <div className="specialist-card-post">{posts.join(', ')}</div>}

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
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetInstructorList({
         page: 1,
         limit: 3,
         sort: 'id',
         order: 'desc',
         op: 'or',
         status: 'active'
      }).then((res) => {
         setData(res?.data ? res?.data : []);
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <Container>
         <div className="list-of-specialist">
            {data.map((item, index) => (
               <SpecialistCard key={index} {...item} />
            ))}
         </div>

         <div className="list-all-button">
            <Button type="link" onClick={() => navigate('/instructors')}>
               Все эксперты
            </Button>
         </div>
      </Container>
   );
};

export default ListOfSpecialists;
