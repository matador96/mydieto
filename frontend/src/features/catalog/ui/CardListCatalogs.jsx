import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Divider, Space, Input } from 'antd';
import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';
import { GetCatalogsListByParentId } from '../model/services/GetCatalogsListByParentId';
import CategoriesList from '@shared/ui/FilterCategory';
import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';
import { debounce } from 'lodash';

const CatalogCardsByParentId = ({ items }) => {
   return (
      <div className="custom-row">
         <Row gutter={24}>
            {items.map((item) => (
               <div className="custom-col" key={`${item.id}-${item.name}`}>
                  {/* <Col className="custom-col" span={6} key={`${item.id}-${item.name}`}> */}
                  <Card
                     className="custom-card"
                     cover={
                        <div className="image-name-container">
                           <div
                              className="card-background-image"
                              style={{
                                 backgroundImage: `url(${
                                    item.imgUrl || defaulPhotoCard
                                 })`
                              }}
                           />
                           <h3 className="image-name-container-name">{item.name}</h3>
                        </div>
                     }
                     hoverable
                     actions={[
                        <AddToCartWithQuantity
                           key={`ke${item.id}`}
                           catalogId={item.id}
                           unit={item.unit}
                        />
                     ]}></Card>
                  {/* </Col> */}
               </div>
            ))}
         </Row>
      </div>
   );
};

const CardListCatalogs = () => {
   const [initialData, setInitialData] = useState([]);
   const [data, setData] = useState([]);
   const [searchStr, setSearchStr] = useState('');

   useEffect(() => {
      fetchMainCatalog();
   }, []);

   const fetchMainCatalog = () => {
      GetCatalogsListByParentId(0, {
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then(async (res) => {
         const mainData = res?.data || [];
         const promises = [];
         const dataArr = [];

         mainData.forEach((e) =>
            promises.push(
               GetCatalogsListByParentId(e.id, {
                  page: 1,
                  limit: 1000,
                  sort: 'priority',
                  order: 'asc'
               }).then((res) => dataArr.push({ ...e, items: res?.data || [] }))
            )
         );

         await Promise.all(promises).then(() => {
            setData(dataArr);
            setInitialData(dataArr);
         });
      });
   };

   const filterData = (search) => {
      if (!search) {
         return setData(initialData);
      }

      const filtered = initialData.map((e) => {
         return {
            ...e,
            items: e.items.filter((item) =>
               item.name.toLowerCase().includes(search.toLowerCase())
            )
         };
      });

      setData(filtered);
   };

   const debouncedSearch = debounce((searchValue) => {
      filterData(searchValue);
   }, 300);

   const handleSearchChange = (e) => {
      const value = e.target.value;

      setSearchStr(value);
      debouncedSearch(value);
   };

   return (
      <div
         style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         {/* <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <Input
               placeholder="Поиск по каталогу"
               value={searchStr}
               style={{ width: '400px' }}
               size="large"
               onChange={handleSearchChange}
            />
         </Space> */}
         <div className="general-page">
            <CategoriesList data={data} setData={setData} />
            <div style={{ width: '80%', flexGrow: '1' }}>
               {data.map((item) => (
                  <React.Fragment key={`${item.id}-${item.name}`}>
                     {item?.items.length ? (
                        <>
                           <h2>{item.name}</h2>
                           <CatalogCardsByParentId
                              id={item.id}
                              items={item?.items || []}
                           />
                        </>
                     ) : null}
                  </React.Fragment>
               ))}
            </div>
         </div>
      </div>
   );
};

export default CardListCatalogs;
