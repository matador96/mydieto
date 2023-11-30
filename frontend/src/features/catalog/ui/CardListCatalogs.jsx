import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider } from 'antd';

import { GetCatalogsListByParentId } from '../model/services/GetCatalogsListByParentId';

import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';

const CatalogCardsByParentId = ({ id }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetCatalogsListByParentId(id, {
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then((res) => {
         setIsLoading(false);
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   return (
      <>
         <Row gutter={24}>
            {data.map((item) => (
               <Col span={6} key={`${item.id}-${item.name}`}>
                  <Card
                     loading={isLoading}
                     cover={
                        item.imgUrl ? (
                           <img alt="item.name" src={item.imgUrl} />
                        ) : null
                     }
                     hoverable
                     actions={[
                        <AddToCartWithQuantity
                           key={`ke${item.id}`}
                           catalogId={item.id}
                        />
                     ]}>
                     {item.name}
                  </Card>
               </Col>
            ))}
         </Row>
      </>
   );
};

const CardListCatalogs = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      GetCatalogsListByParentId(0, {
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then((res) => {
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   return (
      <>
         {data.map((item) => (
            <React.Fragment key={`${item.id}-${item.name}`}>
               <Divider orientation="center">{item.name}</Divider>
               <CatalogCardsByParentId id={item.id} />
            </React.Fragment>
         ))}
      </>
   );
};

export default CardListCatalogs;
