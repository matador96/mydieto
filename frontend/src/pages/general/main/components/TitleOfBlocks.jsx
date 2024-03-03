/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';

const TitleOfBlocks = () => {
   return (
      <div className="title-of-blocks">
         <Container>
            <div className="title-of-blocks-block">
               <div className="title-of-blocks-block_left">Курсы</div>
               <div className="title-of-blocks-block_right">
                  <div className="title-of-blocks-block_right-description">
                     у нас можно найти полезные статьи, видео и блоги экспертов и
                     подобрать индивидуальный план питания
                  </div>
                  <div className="title-of-blocks-block_right-button">
                     <Button type="primary">Выбрать курс</Button>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default TitleOfBlocks;
