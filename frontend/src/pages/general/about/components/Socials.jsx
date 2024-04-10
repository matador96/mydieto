/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import TelegramCircleIcon from '@shared/assets/icons/TelegramCircleIcon';
import VkBlueCircleIcon from '@shared/assets/icons/VkBlueCircleIcon';
import Container from '@widgets/Container/ui/Container';

const Socials = () => {
   return (
      <div style={{ margin: '30px 0 30px 0' }}>
         <Container>
            <div className="socials-block">
               <div className="socials-block_title">
                  Больше интересных статей в соцсетях
               </div>
               <div className="socials-block_list">
                  <div className="socials-block_list-item">
                     <VkBlueCircleIcon />
                     Наша страница в VK
                  </div>{' '}
                  <div className="socials-block_list-item">
                     <TelegramCircleIcon />
                     Telegram канал
                  </div>
               </div>
            </div>
         </Container>
      </div>
   );
};

export default Socials;
