import React, { useState, useEffect } from 'react';
import { Space, Card, Row, Col, Button, Flex } from 'antd';
import { VerticalSpace } from '@shared/ui';
import { GetArticlesList } from '../model/services/GetArticlesList';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import { timestampToNormalDate } from '@shared/utils/tsToTime';

const TableArticles = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
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
         <Row
            gutter={{
               xs: 8,
               sm: 16,
               md: 24,
               lg: 32
            }}
            justify="start"
            wrap>
            {data.map((item) => (
               <Col
                  className="gutter-row"
                  span={6}
                  key={item.id}
                  style={{ minWidth: '240px' }}>
                  <Card title={item.title} bordered={false} key={item.id}>
                     <p>{item.description}</p>
                     <div>Создано пользователем: {item.userId}</div>
                     <div>Просмотров: {item.views}</div>
                     <div>
                        Дата создания: {timestampToNormalDate(item.createdAt)}
                     </div>
                     <div>
                        Дата изменения: {timestampToNormalDate(item.updateAt)}
                     </div>
                  </Card>
               </Col>
            ))}
         </Row>

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
