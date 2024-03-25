/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Button } from '@shared/ui';
import { Spin } from 'antd';
import Container from '@widgets/Container/ui/Container';
import { getTags } from '@shared/api/all/tags';

const ListOfTags = ({ type }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([
      {
         label: 'Все направления',
         key: 'Все направления',
         value: 'Все направления',
         active: true
      }
   ]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      getTags(type).then((res) => {
         let result = res?.json?.data
            ? res?.json.data.map((item) => ({
                 label: item,
                 key: item,
                 value: item,
                 active: false
              }))
            : [];
         setData((e) => [...e, ...result]);
         setIsLoading(false);
      });
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <Container>
         <div className="list-of-tags">
            {data.map((item, index) => (
               <Button key={index} type={item.active ? 'primary' : 'default'}>
                  {item.label}
               </Button>
            ))}
         </div>
      </Container>
   );
};

export default ListOfTags;
