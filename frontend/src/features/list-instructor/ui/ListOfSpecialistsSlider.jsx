/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { GetInstructorList } from '@features/list-instructor/model/GetInstructorList';

const SpecialistCard = ({
   firstName,
   lastName,
   posts,
   marker,
   age,
   experience,
   id
}) => {
   const navigate = useNavigate();

   return (
      <div className="specialist-card" style={{ minWidth: '276px' }}>
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
         <Button
            className="specialist-card-button"
            type="link"
            onClick={() => navigate(`/instructors/${id}`)}>
            Подробнее{' '}
         </Button>
      </div>
   );
};

const ListOfSpecialistsSlider = ({ post }) => {
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      fetchData(post);
   }, [post]);

   const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      pauseOnDotsHover: true
   };

   const fetchData = (choosedPost) => {
      setIsLoading(true);
      GetInstructorList(
         {
            page: 1,
            limit: 4
            // sort: 'id',
            // order: 'desc',
            // op: 'or',
            // status: 'active'
         },
         choosedPost ? `{"posts":{"$like":"%25${choosedPost}%25"}}` : null
      ).then((res) => {
         setData(res?.data ? res?.data : []);
         setIsLoading(false);
      });
   };

   // if (isLoading) {
   //    return <Spin />;
   // }

   //  <div>
   // <Slider {...settings}>

   return (
      <Container>
         <div className="list-of-specialist">
            {data.map((item, index) => (
               <SpecialistCard key={index} {...item} />
            ))}
         </div>
      </Container>
   );
};

export default ListOfSpecialistsSlider;
