import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Space, Input } from 'antd';
import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';
import { GetCatalogsListByParentId } from '../model/services/GetCatalogsListByParentId';

import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';
import { debounce } from 'lodash';
const { Search } = Input;

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
               <Col className="custom-col" span={6} key={`${item.id}-${item.name}`}>
                  <Card
                     className="custom-card"
                     loading={isLoading}
                     cover={
                        <div
                           className="card-background-image"
                           style={{
                              backgroundImage: `url(${
                                 item.imgUrl || defaulPhotoCard
                              })`
                           }}
                        />
                     }
                     hoverable
                     actions={[
                        <AddToCartWithQuantity
                           key={`ke${item.id}`}
                           catalogId={item.id}
                           unit={item.unit}
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
   const [filteredData, setFilteredData] = useState([]);
   const [searchCatalog, setSearchTCatalog] = useState('');

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
         setFilteredData(tableData); // Устанавливаем отфильтрованные данные
      });
   };
   console.log(data);
   // Функция для фильтрации данных
   const filterData = (search) => {
      const filtered = data.filter(
         (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.id === 0
      );
      setFilteredData(filtered);
   };

   // Функция debounce для задержки фильтрации
   const debouncedSearch = debounce((searchValue) => {
      filterData(searchValue);
   }, 300); // 300 мс задержка

   // Обработчик изменения ввода в поле поиска
   const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTCatalog(value);
      debouncedSearch(value);
   };

   return (
      <>
         <Space>
            <Search
               placeholder="Поиск по каталогу"
               value={searchCatalog}
               onChange={handleSearchChange}
            />
         </Space>
         {filteredData.map((item) => (
            <React.Fragment key={`${item.id}-${item.name}`}>
               <Divider orientation="center">{item.name}</Divider>
               <CatalogCardsByParentId id={item.id} />
            </React.Fragment>
         ))}
      </>
   );
};

export default CardListCatalogs;
