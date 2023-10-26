import React from 'react';
import { Layout, Content } from '@shared/ui';
import Container from '@widgets/Container';

const DefaultLayout = (props) => (
   <Layout>
      <Content>
         <Container>{props.children}</Container>
      </Content>
   </Layout>
);

export default DefaultLayout;
