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

const ListOfCourses = ({ className, tag, showMore = false, defaultLimit = 4 }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   useEffect(() => {
      fetchData(tag);
   }, [tag]);

   const fetchData = (choosedTag) => {
      setIsLoading(true);
      GetCoursesList(
         {
            page: 1,
            limit: defaultLimit
            // status: 'active'
         },
         choosedTag ? `{"tags":{"$like":"%25${choosedTag}%25"}}` : null
      ).then((res) => {
         setData(res?.data ? res?.data : []);
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

         {showMore && (
            <div className="list-all-button">
               <Button type="link">Показать еще</Button>
            </div>
         )}
      </Container>
   );
};

export default ListOfCourses;
