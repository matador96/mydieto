import React from 'react';
import { Content, Title, VerticalSpace } from '@shared/ui';
import { Row } from 'antd';
import TableLogs from '@features/list-log/ui/TableLogs';

const LogsPage = () => {
   return (
      <>
         <Title>Сегодняшние логи</Title>

         <VerticalSpace />

         <Row gutter={[16, 24]}>
            <TableLogs />
         </Row>
      </>
   );
};

export default LogsPage;
