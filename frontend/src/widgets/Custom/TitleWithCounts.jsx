/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Button } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import CountUp from 'react-countup';

const CountWithTitle = ({ count, title, minWidth = 'auto' }) => {
   return (
      <div className="count-with-title">
         <div className="count-with-title_count" style={{ minWidth }}>
            <CountUp end={count} />{' '}
            <div className="count-with-title_count_plus">+</div>
         </div>
         <div className="count-with-title_title">{title}</div>
      </div>
   );
};

const TitleWithCounts = () => {
   return (
      <Container>
         <div className="title-of-blocks-with-count">
            <div className="title-of-blocks-with-count_left">
               <CountWithTitle count={200} minWidth={'165px'} title="Тренеров" />
               <CountWithTitle
                  count={15000}
                  minWidth={'260px'}
                  title="Постоянных клиентов"
               />
            </div>
            <div className="title-of-blocks-with-count_right">
               <div className="title-of-blocks-with-count_right-description">
                  у нас можно получить индивидуальные советы и планы <br /> питания,
                  выбрав специалиста в соответствии с вашими <br /> потребностями и
                  целями
               </div>
               <div className="title-of-blocks-with-count_right-button">
                  <Button type="primary">Присоединиться</Button>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default TitleWithCounts;
