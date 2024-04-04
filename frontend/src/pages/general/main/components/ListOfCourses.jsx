import React, { useState, useEffect } from 'react';
import { Button } from '@shared/ui';
import { Spin } from 'antd';
import { GetCoursesList } from '@features/course/model/services/GetCoursesList';
import Container from '@widgets/Container/ui/Container';
import { truncateText } from '@shared/utils/text';
import { useNavigate } from 'react-router-dom';
import { getDurationInDaysOrWeeks } from '@shared/utils/tsToTime';

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

         <div>
            <div className="course-card_title">{title}</div>
            <div className="course-card_description">
               {truncateText(description, 110)}
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

const ListOfCourses = ({
   className,
   filterParams,
   showMore = false,
   defaultLimit = 4
}) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [limit, setLimit] = useState(defaultLimit);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      fetchData({ ...filterParams, limit: defaultLimit });
   }, [filterParams]);

   const fetchData = (params) => {
      setIsLoading(true);

      let queryParams = [];

      // Кривовато работает

      if (params?.search) {
         queryParams.push(`"$and":[{"title":{"$like":"%25${params.search}%25"}}]`);
      }

      if (params?.tags && params?.tags?.length) {
         params?.tags.map((e) => {
            queryParams.push(`"$or":[{"tags":{"$like":"%25${e}%25"}}]`);
         });
      }

      if (params?.duration && params?.duration?.length) {
         params?.duration.map((e) => {
            queryParams.push(`"$or":[{"duration":{"$lte":"${e}"}}]`);
         });
      }

      GetCoursesList(
         {
            page: 1,
            limit: params?.limit || defaultLimit
            // status: 'active'
         },
         `{${queryParams.join(',')}}`
      ).then((res) => {
         setData(res?.data ? res?.data : []);
         setLimit(limit);
         setIsLoading(false);
      });
   };

   // if (isLoading) {
   //    return <Spin />;
   // }

   return (
      <Container>
         <div
            className={`list-of-courses ${className}`}
            style={{ mihHeight: '700px' }}>
            {data.map((item, index) => (
               <CourseCard key={index} {...item} />
            ))}
         </div>

         {showMore && data.length ? (
            <div className="list-all-button">
               <Button
                  type="link"
                  onClick={() => fetchData({ ...filterParams, limit: limit + 3 })}>
                  Показать еще
               </Button>
            </div>
         ) : null}
      </Container>
   );
};

export default ListOfCourses;
