/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowIconWhite from '@shared/assets/icons/RightArrowIconWhite';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import Container from '@widgets/Container/ui/Container';

const items = [
   { label: 'Витамины', url: '/food' },
   { label: 'Спорт', url: '/food' },
   { label: 'Анализы', url: '/food' }
];

const ThreeItemsWithUrl = () => {
   return (
      <div className="three-items-with-url">
         <Container>
            <div className="three-items-with-url-block">
               <div className="three-items-with-url-block_left">
                  {items.map((item, index) => (
                     <div
                        key={index}
                        className="three-items-with-url-block_left-item">
                        {item.label}
                     </div>
                  ))}
               </div>
               <div className="three-items-with-url-block_right">
                  <div className="three-items-with-url-block_right-title">
                     Что необходимо твоему телу?
                  </div>
                  <div className="three-items-with-url-block_right-button">
                     <RightArrowIconWhite />
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default ThreeItemsWithUrl;
