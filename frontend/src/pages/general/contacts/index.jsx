/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import Container from '@widgets/Container/ui/Container';
import TitleOfBlocks from '../main/components/TitleOfBlocks';

const ContactsPage = () => {
   return (
      <Content>
         <TitleOfBlocks title="Контакты" />
         <Container> Какие то контакты</Container>
      </Content>
   );
};

export default ContactsPage;
