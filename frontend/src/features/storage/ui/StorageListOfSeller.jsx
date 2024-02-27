/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { List, Divider } from 'antd';
import { unitSettings } from '@shared/const/units';

import { GetStorageWithParams } from '../model/GetStorageWithParams';

import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';

const StorageListOfSeller = ({ sellerId }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetStorageWithParams({
         page: 1,
         limit: 1000,
         sellerId,
         sort: 'id',
         order: 'asc'
      }).then((res) => {
         const storageData = res.data;
         setData(storageData);
         setIsLoading(false);
      });
   };

   return (
      <div>
         <List
            itemLayout="horizontal"
            dataSource={data}
            loading={isLoading}
            className="list-my-storage"
            renderItem={(item) => (
               <>
                  {item.quantity !== 0 ? (
                     <List.Item>
                        {item.article.imgUrl ? (
                           <img alt={item.article.name} src={item.article.imgUrl} />
                        ) : (
                           <img alt="default image" src={defaulPhotoCard} />
                        )}

                        <List.Item.Meta
                           key={`${item.id}-`}
                           title={item.article.name}
                           description={
                              <>
                                 {item.quantity}{' '}
                                 {
                                    unitSettings.find(
                                       (e) => e.value === item.article.unit
                                    ).shortLabel
                                 }
                              </>
                           }
                        />
                     </List.Item>
                  ) : null}
               </>
            )}
         />
      </div>
   );
};

export default StorageListOfSeller;
