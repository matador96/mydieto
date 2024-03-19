import React, { useState, useEffect } from 'react';
import { Button } from '@shared/ui';
import { Spin } from 'antd';
import { GetCoursesList } from '@features/course/model/services/GetCoursesList';
import Container from '@widgets/Container/ui/Container';
import { truncateText } from '@shared/utils/text';

const CourseCard = ({ instructor, isPopular, duration, title, description }) => {
   return (
      <div className="course-card">
         {isPopular && <div className="course-card_tag">Популярное</div>}

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

         <div className="course-card_exp">Срок прохождения: {duration}</div>

         <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button className="course-card_button" type="primary">
               Подробнее о курсе
            </Button>
         </div>
      </div>
   );
};

const ListOfCourses = ({ className }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetCoursesList({
         page: 1,
         limit: 4,
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
         <div className={`list-of-courses ${className}`}>
            {data.map((item, index) => (
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
