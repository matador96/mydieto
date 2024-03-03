/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';

const items = [
   {
      label: 'Все направления',
      active: true
   },
   {
      label: 'Похудение'
   },
   {
      label: 'Пилатес'
   },
   {
      label: 'Танцевальные'
   },
   {
      label: 'Для спины'
   },
   {
      label: 'Растяжка'
   },
   {
      label: 'Для новичков'
   },
   {
      label: 'Силовые'
   },
   {
      label: 'Психология'
   },
   {
      label: 'Комплексы'
   }
];

const ListOfTags = () => {
   return (
      <Container>
         <div className="list-of-tags">
            {items.map((item, index) => (
               <Button key={index} type={item.active ? 'primary' : 'default'}>
                  {item.label}
               </Button>
            ))}
         </div>
      </Container>
   );
};

export default ListOfTags;
