import React from 'react';
import { Layout, Content } from '@shared/ui';

import { Space } from 'antd';

const CenteredLayout = (props) => (
   <Layout>
      <Content>
         <div className="space-align-block">
            <Space
               align="center"
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '95vh'
               }}
            >
               {props.children}
            </Space>
         </div>
      </Content>
   </Layout>
);

export default CenteredLayout;
