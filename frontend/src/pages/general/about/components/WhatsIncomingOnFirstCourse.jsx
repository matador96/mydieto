/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import joinToPhoto from '@shared/assets/images/joinTo.png';
import Container from '@widgets/Container/ui/Container';

const WhatsIncomingOnFirstCourse = () => {
   return (
      <div style={{ margin: '65px 0 30px 0' }}>
         <Container>
            <div
               className="join-to-block join-to-block_incoming"
               style={{
                  backgroundImage: `url(${joinToPhoto})`
               }}>
               <div className="join-to-block_title">Что будет на первой сессии</div>
               <div className="join-to-block_incoming_list">
                  {[
                     'Познакомитесь с психологом',
                     'Уточните запрос',
                     'Лучше поймёте свою ситуацию',
                     'Получите поддержку'
                  ].map((e, index) => (
                     <div key={e} className="join-to-block_incoming_list-item">
                        <div className="join-to-block_incoming_list-item-count">
                           {index + 1}
                        </div>
                        {e}
                     </div>
                  ))}
               </div>

               <div className="join-to-block_description">
                  Перед первой сессией мы всегда присылаем памятку, которая помогает
                  легче начать свой путь в психотерапии
               </div>
            </div>
         </Container>
      </div>
   );
};

export default WhatsIncomingOnFirstCourse;
