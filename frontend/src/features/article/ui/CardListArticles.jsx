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
import { GetArticlesList } from '../model/services/GetArticlesList';
import FilterCategory from '@shared/ui/FilterCategory';
import AddToCartWithQuantity from '@features/storage/ui/AddToCartWithQuantity';
import SpinnerInContainer from '@shared/ui/SpinnerInContainer';
import { extraActions, getSearchArticle, getFilterArticle } from '@entitles/Extra';
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

const ArticleCardsByParentId = ({ items }) => {
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
                        articleId={item.id}
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

const CardListArticles = () => {
   const [initialData, setInitialData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState([]);
   const [searchStr, setSearchStr] = useState('');
   const dispatch = useDispatch();
   const searchText = useSelector(getSearchArticle);
   const articleFilter = useSelector(getFilterArticle);

   useEffect(() => {
      fetchMainArticle();
   }, []);

   useEffect(() => {
      filterData(searchText, articleFilter);
   }, [searchText, articleFilter]);

   const fetchMainArticle = () => {
      setLoading(true);
      GetArticlesList({
         page: 1,
         limit: 1000,
         order: 'asc'
      }).then(async (res) => {
         const mainData = res?.data || [];
         const promises = [];
         const dataArr = [];

         mainData.forEach((e) =>
            promises.push(
               GetArticlesList({
                  page: 1,
                  limit: 1000,
                  order: 'asc'
               }).then((res) => dataArr.push({ ...e, items: res?.data || [] }))
            )
         );

         await Promise.all(promises).then(() => {
            setData(dataArr);
            setInitialData(dataArr);
            setLoading(false);
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

   if (loading) {
      return <SpinnerInContainer />;
   }

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

                        <ArticleCardsByParentId
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

export default CardListArticles;
