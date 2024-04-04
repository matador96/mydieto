/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
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
         <Button
            className="specialist-card-button"
            type="link"
            onClick={() => navigate(`/instructors/${id}`)}>
            Подробнее{' '}
         </Button>
      </div>
   );
};

const ListOfSpecialists = ({
   post,
   showMore = false,
   defaultLimit = 3,
   className = '',
   search = ''
}) => {
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [limit, setLimit] = useState(defaultLimit);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData({});
   }, []);

   useEffect(() => {
      fetchData({ choosedPost: post });
   }, [post, search]);

   const fetchData = ({ choosedPost = post, limit = defaultLimit }) => {
      setIsLoading(true);
      let query = '';
      if (search) {
         query = `"$or":[
            {"firstName":{"$like":"%25${search}%25"}},
            {"lastName":{"$like":"%25${search}%25"}}]`;
      }

      if (choosedPost) {
         if (query) {
            query = query + ',';
         }

         query =
            query +
            `"$and":[{
            "posts":{"$like":"%25${choosedPost}%25"}
         }]`;
      }

      if (query) {
         query = `{${query}}`;
      }

      GetInstructorList(
         {
            page: 1,
            limit: limit
            // sort: 'id',
            // order: 'desc',
            // op: 'or',
            // status: 'active'
         },
         query
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
         <div className={`list-of-specialist ${className}`}>
            {data.map((item, index) => (
               <SpecialistCard key={index} {...item} />
            ))}
         </div>

         {showMore && (
            <div className="list-all-button">
               <Button
                  type="link"
                  onClick={() => fetchData({ choosedPost: post, limit: limit + 3 })}>
                  Показать еще
               </Button>
            </div>
         )}
      </Container>
   );
};

export default ListOfSpecialists;
