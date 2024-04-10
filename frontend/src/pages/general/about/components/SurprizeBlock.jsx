/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';
import Container from '@widgets/Container/ui/Container';
import { Button } from '@shared/ui';

const SurprizeBlock = () => {
   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div className="surprice-block">
               <div className="surprice-block_title">Подарочный сертификат</div>
               <div className="surprice-block_description">
                  Позаботьтесь о близких — подарите сертификат на любой номинал
               </div>
               <div>
                  <Button className="button-style-3">
                     Выбрать подарок <RightArrowIcon />
                  </Button>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default SurprizeBlock;
