/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import Container from '@widgets/Container/ui/Container';

const JoinToBlock = () => {
   return (
      <Container>
         <div
            className="join-to-block"
            style={{
               backgroundImage: `url(${joinToPhoto})`
            }}>
            <div className="join-to-block_title">MyDieto</div>
            <div className="join-to-block_description">
               уникальный маркетплейс, созданный для тех, кто стремится <br />
               к правильному питанию и заботится о своём здоровье
            </div>

            <div className="join-to-block_button">
               Присоединиться <RightArrowIcon />
            </div>
         </div>
      </Container>
   );
};

export default JoinToBlock;
