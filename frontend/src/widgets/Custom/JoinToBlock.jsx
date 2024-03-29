/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import Container from '@widgets/Container/ui/Container';
import { useNavigate } from 'react-router-dom';

const JoinToBlock = ({
   title = `MyDieto`,
   description = `уникальный маркетплейс, созданный для тех, кто стремится \n
к правильному питанию и заботится о своём здоровье`,
   buttonUrl = '/'
}) => {
   const navigate = useNavigate();

   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div
               className="join-to-block"
               style={{
                  backgroundImage: `url(${joinToPhoto})`
               }}>
               <div className="join-to-block_title">{title}</div>
               <div className="join-to-block_description">{description}</div>

               <div
                  className="join-to-block_button"
                  onClick={() => navigate(buttonUrl)}>
                  Присоединиться <RightArrowIcon />
               </div>
            </div>
         </Container>
      </div>
   );
};

export default JoinToBlock;
