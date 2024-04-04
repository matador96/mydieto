import React, { useState, useEffect } from 'react';
import { Space, Card, Row, Col, Button, Flex } from 'antd';
import { VerticalSpace } from '@shared/ui';
import { GetArticlesList } from '../model/services/GetArticlesList';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import { timestampToNormalDDMMYY } from '@shared/utils/tsToTime';
import { useNavigate } from 'react-router-dom';

const truncate = (input, maxLength) =>
   input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;

const TableArticles = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const navigate = useNavigate();
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = (
      current = pagination.current,
      pageSize = pagination.pageSize
   ) => {
      setIsLoading(true);
      GetArticlesList({
         page: current,
         limit: pageSize
      }).then((res) => {
         setIsLoading(false);
         setPagination((prev) => ({
            ...prev,
            total: res.count,
            current,
            pageSize
         }));

         setData(res.data);
      });
   };

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   return (
      <>
         <div className="list-of-courses">
            {data.map((item) => (
               <div className="article-card" key={item.id}>
                  <div>
                     <div className="article-card_title">
                        {truncate(item.title, 74)}
                     </div>
                     <div className="article-card_description">
                        {truncate(item.description, 220)}
                     </div>
                  </div>

                  <Button
                     className="article-card_button"
                     type="primary"
                     onClick={() => navigate(`/articles/${item.id}`)}>
                     Открыть статью
                  </Button>

                  <div className="article-card_views">Просмотров: {item.views}</div>
                  <div className="article-card_created">
                     Дата создания: {timestampToNormalDDMMYY(item.createdAt)}
                  </div>
               </div>
            ))}
         </div>

         <VerticalSpace />

         {!!pagination.total && (
            <Pagination
               pagination={pagination}
               onChangePagination={onChangePagination}
               isLoading={isLoading}
            />
         )}
      </>
   );
};

export default TableArticles;
