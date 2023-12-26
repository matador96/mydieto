import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Divider, Space, Input, Badge } from 'antd';
import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';
import { GetCatalogsListByParentId } from '../model/services/GetCatalogsListByParentId';
import CategoriesList from '@shared/ui/FilterCategory';
import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';
import { extraActions, getSearchCatalog } from '@entitles/Extra';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

const CatalogCardsByParentId = ({ items }) => {
   return (
      <Row gutter={24} className="custom-row">
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
   );
};

const CardListCatalogs = () => {
   const [initialData, setInitialData] = useState([]);
   const [data, setData] = useState([]);
   const [searchStr, setSearchStr] = useState('');
   const dispatch = useDispatch();
   const searchText = useSelector(getSearchCatalog);

   useEffect(() => {
      fetchMainCatalog();
   }, []);

   useEffect(() => {
      filterData(searchText);
   }, [searchText]);

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
      <div className="general-page">
         {/* <CategoriesList data={data} setData={setData} /> */}
         <div style={{ width: '100%' }}>
            {data.map((item) => (
               <React.Fragment key={`${item.id}-${item.name}`}>
                  {item?.items.length ? (
                     <>
                        <h2 className="categories-name">
                           {item.name}
                           <Badge
                              className="item-quantity-badge"
                              count={item?.items?.length || 0}
                           />
                        </h2>

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
   );
};

export default CardListCatalogs;
