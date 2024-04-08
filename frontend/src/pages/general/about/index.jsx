/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import TitleOfBlocks from '../main/components/TitleOfBlocks';

const AboutPage = () => {
   return (
      <Content>
         <TitleOfBlocks title="О нас" />
         <Container> Какие то контакты</Container>
      </Content>
   );
};

export default AboutPage;
