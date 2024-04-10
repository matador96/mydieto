/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import CountUp from 'react-countup';

const eachCharInPixel = 50;

const listOfStats = [
   {
      number: '95',
      suffix: '%',
      description: 'обратившихся находят своего психолога с первого раза'
   },
   {
      label: 'лет',
      number: '7',
      description: 'средний опыт работы специалистов'
   },
   {
      number: '22434',
      description: 'человек получили поддержку за год'
   }
];

const AboutStats = () => {
   return (
      <div style={{ margin: '20px 0 ' }}>
         <Container>
            <div className="about-status">
               {listOfStats.map((e, index) => (
                  <div className="about-status_item" key={index}>
                     <div className="about-status_item-value">
                        {e?.number ? (
                           <span
                              style={{
                                 minWidth: `${e.number.length * eachCharInPixel}px`,
                                 display: 'inline-block'
                              }}>
                              <CountUp end={e.number} separator=" " />
                           </span>
                        ) : null}

                        {e?.label ? (
                           <span style={{ marginLeft: '10px' }}>{e.label}</span>
                        ) : null}
                        {e?.suffix ? (
                           <div className="about-status_item-value-suffix">
                              {e.suffix}
                           </div>
                        ) : null}
                     </div>
                     <div className="about-status_item-description">
                        {e.description}
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
};

export default AboutStats;
