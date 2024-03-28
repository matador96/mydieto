/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Button } from '@shared/ui';
import { Spin } from 'antd';
import Container from '@widgets/Container/ui/Container';
import { getTags } from '@shared/api/all/tags';

const ListOfTags = ({ type, setChoosed = () => {} }) => {
   const [isLoading, setIsLoading] = useState(false);
   const label = type === 'instructor' ? 'Все эксперты' : 'Все направления';
   const [data, setData] = useState([
      {
         label: label,
         key: '',
         value: label,
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

   const onClick = (k) => {
      let newData = data.map((item) => ({
         ...item,
         active: item.key === k
      }));
      setData(newData);
      setChoosed(k);
   };

   if (isLoading) {
      return <Spin />;
   }

   return (
      <Container>
         <div className="list-of-tags">
            {data.map((item, index) => (
               <Button
                  key={index}
                  type={item.active ? 'primary' : 'default'}
                  onClick={() => onClick(item.key)}>
                  {item.label}
               </Button>
            ))}
         </div>
      </Container>
   );
};

export default ListOfTags;
