/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState, useRef } from 'react';
import { Spin } from 'antd';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { GetInstructorList } from '@features/list-instructor/model/GetInstructorList';
import ModalMakeAnApointmet from '@widgets/Custom/ModalMakeAnApointmet';

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

         <ModalMakeAnApointmet
            instructorId={id}
            button={
               <Button className="specialist-card-button" type="primary">
                  Записаться
               </Button>
            }
         />

         <Button
            className="specialist-card-button"
            type="link"
            onClick={() => navigate(`/instructors/${id}`)}>
            Подробнее{' '}
         </Button>
      </div>
   );
};

const ListOfSpecialistsSlider = ({ post, min = 3 }) => {
   const navigate = useNavigate();
   const sliderRef = useRef(null);
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      fetchData(post);
   }, [post]);

   const minimalSlides = min;
   const slidesToScroll = 1;
   const slidesToShow = data.length < minimalSlides ? data.length : minimalSlides;

   const settings = {
      // dots: false,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 3,
      // slidesToScroll: 1,
      // arrows: true,
      // pauseOnHover: true,
      // pauseOnFocus: true,
      // pauseOnDotsHover: true
      arrows: false,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToScroll,
      infinite: false,
      speed: 200,
      autoplay: false,
      beforeChange: (currentSlide, nextSlide) => {
         setCurrentIndex(nextSlide);
      },

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 700,
            settings: {
               slidesToShow: 1
            }
         },
         {
            breakpoint: 500,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   };

   const fetchData = (choosedPost) => {
      setIsLoading(true);
      GetInstructorList(
         {
            page: 1,
            limit: 8
            // sort: 'id',
            // order: 'desc',
            // op: 'or',
            // status: 'active'
         },
         choosedPost ? `{"posts":{"$like":"%25${choosedPost}%25"}}` : null
      ).then((res) => {
         setData(res?.data ? res?.data : []);
         setTimeout(() => {
            setIsLoading(false);
         }, 1000);
      });
   };

   if (isLoading) {
      return (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '450px'
            }}>
            <Spin size="large" />
         </div>
      );
   }

   const blockClick = (arrow, func) => {
      // have some lags, when click an arrow on limit
      const howManySlidesShowed = currentIndex * slidesToScroll + minimalSlides;
      if (arrow === 'prev' && currentIndex === 0) {
         return;
      }

      if (arrow === 'next' && howManySlidesShowed === data.length) {
         return;
      }

      func();
   };

   return (
      <Container>
         <div className={`list-of-specialist-slider-${min}`}>
            <Slider {...settings} ref={sliderRef}>
               {data.map((item, index) => (
                  <SpecialistCard key={index} {...item} />
               ))}
            </Slider>
         </div>

         <div className="controls">
            <button
               onClick={() => blockClick('prev', sliderRef?.current?.slickPrev)}>
               <ArrowLeftOutlined />
            </button>
            <button
               onClick={() => blockClick('next', sliderRef?.current?.slickNext)}>
               <ArrowRightOutlined />
            </button>
         </div>
      </Container>
   );
};

export default ListOfSpecialistsSlider;
