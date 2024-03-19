/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';

const TitleOfBlocks = ({ title, description, buttonTitle, buttonUrl }) => {
   return (
      <div className="title-of-blocks">
         <Container>
            <div className="title-of-blocks-block">
               <div className="title-of-blocks-block_left">{title}</div>
               <div className="title-of-blocks-block_right">
                  <div className="title-of-blocks-block_right-description">
                     {description}
                  </div>
                  <div className="title-of-blocks-block_right-button">
                     <Button type="primary">{buttonTitle}</Button>
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default TitleOfBlocks;
