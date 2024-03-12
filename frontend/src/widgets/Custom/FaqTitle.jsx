/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import RightArrowIconWhite from '@shared/assets/icons/RightArrowIconWhite';

const FaqTitle = () => {
   return (
      <div className="faq-title">
         <Container>
            <div className="faq-title-block">
               <div className="faq-title-block_title">
                  Остались вопросы? Оставили ответы на самые популярные
               </div>

               <div className="faq-title-block_icon">
                  <RightArrowIconWhite />
               </div>
            </div>
         </Container>
      </div>
   );
};

export default FaqTitle;
