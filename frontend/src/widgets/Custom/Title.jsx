/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Container from '@widgets/Container/ui/Container';

const Title = ({ title = `Популярное` }) => {
   return (
      <Container>
         <div className="title">{title}</div>
      </Container>
   );
};

export default Title;
