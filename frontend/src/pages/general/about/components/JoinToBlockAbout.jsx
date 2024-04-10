/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';

const JoinToBlockAbout = ({
   title = `Подберём психолога под ваш запрос`,
   description = `Поможем быстро найти подходящего специалиста`,
   buttonUrl = '/instructors'
}) => {
   const navigate = useNavigate();
   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div
               className="join-to-block join-to-block_about"
               style={{
                  backgroundImage: `url(${joinToPhoto})`
               }}>
               <div className="join-to-block_title">{title}</div>
               <div className="join-to-block_description">{description}</div>

               <div
                  className="join-to-block_button"
                  onClick={() => navigate(buttonUrl)}>
                  Подоборать психолога <RightArrowIcon />
               </div>
            </div>
         </Container>
      </div>
   );
};

export default JoinToBlockAbout;
