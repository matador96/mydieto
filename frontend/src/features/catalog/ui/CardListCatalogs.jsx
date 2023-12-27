import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
   Card,
   Row,
   Col,
   Divider,
   Space,
   Input,
   Badge,
   Modal,
   Typography
} from 'antd';
import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';
import { GetCatalogsList } from '../model/services/GetCatalogsList';
import FilterCategory from '@shared/ui/FilterCategory';
import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';
import { extraActions, getSearchCatalog, getFilterCatalog } from '@entitles/Extra';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

const { Text, Link } = Typography;

const info = (content) => {
   Modal.info({
      title: 'Подробнее',
      width: 1200,
      maskClosable: true,
      closeIcon: true,
      content: <div dangerouslySetInnerHTML={{ __html: content }} />,
      onOk() {},
      okText: 'Закрыть'
   });
};

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
                  ]}>
                  {item.about ? (
                     <Link href="#" onClick={() => info(item.about)}>
                        Подробнее
                     </Link>
                  ) : null}
               </Card>
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
   const catalogFilter = useSelector(getFilterCatalog);

   useEffect(() => {
      fetchMainCatalog();
   }, []);

   useEffect(() => {
      filterData(searchText, catalogFilter);
   }, [searchText, catalogFilter]);

   const fetchMainCatalog = () => {
      GetCatalogsList({
         page: 1,
         parentId: 0,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then(async (res) => {
         const mainData = res?.data || [];
         const promises = [];
         const dataArr = [];

         mainData.forEach((e) =>
            promises.push(
               GetCatalogsList({
                  page: 1,
                  parentId: e.id,
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

   const filterData = (search, ctlgFilter) => {
      if (!search && ctlgFilter.length === 0) {
         return setData(initialData);
      }

      const filtered = initialData.map((e) => {
         return {
            ...e,
            items: e.items.filter((item) => {
               if (search) {
                  return item.name.toLowerCase().includes(search.toLowerCase());
               }

               if (ctlgFilter.length > 0) {
                  console.log();
                  return ctlgFilter.includes(item.parentId);
               }
            })
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
         <FilterCategory data={data} />
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
