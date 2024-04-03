import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@shared/ui';
import { Spin } from 'antd';
import { GetCoursesList } from '@features/course/model/services/GetCoursesList';
import Container from '@widgets/Container/ui/Container';
import { truncateText } from '@shared/utils/text';
import { useNavigate } from 'react-router-dom';
import { getDurationInDaysOrWeeks } from '@shared/utils/tsToTime';
import Slider from 'react-slick';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const CourseCard = ({
   instructor,
   isPopular,
   duration,
   title,
   description,
   marker,
   id
}) => {
   const navigate = useNavigate();

   return (
      <div className="course-card">
         {marker && <div className="course-card_tag">{marker}</div>}

         {instructor && (
            <div className="course-card_author">
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
         )}

         <div style={{ width: '100%' }}>
            <div className="course-card_title">{title}</div>
            <div className="course-card_description">
               {truncateText(description, 70)}
            </div>
         </div>

         <div className="course-card_exp">
            Срок прохождения: {getDurationInDaysOrWeeks(duration)}
         </div>

         <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
               className="course-card_button"
               type="primary"
               onClick={() => navigate(`/courses/${id}`)}>
               Подробнее о курсе
            </Button>
         </div>
      </div>
   );
};

const ListOfCoursesSlider = ({ className, min = 2 }) => {
   const sliderRef = useRef(null);
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);

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

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = (choosedTag) => {
      setIsLoading(true);
      GetCoursesList(
         {
            page: 1,
            limit: 10
            // status: 'active'
         },
         choosedTag ? `{"tags":{"$like":"%25${choosedTag}%25"}}` : null
      ).then((res) => {
         setData(res?.data ? res?.data : []);
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '350px'
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
         <div
            className={`list-of-courses-slider ${className}`}
            style={{ mihHeight: '350px' }}>
            <Slider {...settings} ref={sliderRef}>
               {data.map((item, index) => (
                  <CourseCard key={index} {...item} />
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

export default ListOfCoursesSlider;
