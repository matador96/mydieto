/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';
import RightArrowIcon from '@shared/assets/icons/RightArrowIcon';

const objTest = {
   title: 'Заедаю стресс фастфудом и сладкой выпечкой',
   marker: 'Похудение'
};

const listOfRecomendations = [
   objTest,
   objTest,
   objTest,
   objTest,
   objTest,
   objTest,
   objTest,
   objTest,
   objTest
];

const AboutRecomendations = () => {
   return (
      <div style={{ margin: '20px 0 ' }}>
         <Container>
            <div className="about-recomendations">
               {listOfRecomendations.map((e, index) => (
                  <div className="about-recomendations_item" key={index}>
                     {' '}
                     <div className="about-recomendations_item_marker">
                        {e.marker}
                     </div>
                     <div className="about-recomendations_item_title">{e.title}</div>
                     <div className="about-recomendations_item_button">
                        Психологи в теме <RightArrowIcon />
                     </div>
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
};

export default AboutRecomendations;
