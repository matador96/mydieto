/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const TitleOfBlocks = ({
   title,
   description,
   buttonTitle,
   buttonUrl,
   isCentered = false
}) => {
   const navigate = useNavigate();

   return (
      <div className="title-of-blocks">
         <Container>
            <div className="title-of-blocks-block">
               <div
                  className={`title-of-blocks-block_left ${
                     description ? '' : 'width100'
                  } 
                  ${isCentered ? 'center' : ''}`}>
                  {title}
               </div>
               {description && (
                  <div className="title-of-blocks-block_right">
                     <div className="title-of-blocks-block_right-description">
                        {description}
                     </div>
                     {buttonUrl ? (
                        <div className="title-of-blocks-block_right-button">
                           <Button type="link" onClick={() => navigate(buttonUrl)}>
                              {buttonTitle} <ArrowRightOutlined />
                           </Button>
                        </div>
                     ) : null}
                  </div>
               )}
            </div>
         </Container>
      </div>
   );
};

export default TitleOfBlocks;
