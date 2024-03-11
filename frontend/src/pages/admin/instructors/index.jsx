import React from 'react';
import TableInstructors from '@features/list-instructor/ui/TableInstructors';
import { Title } from '@shared/ui';

const InstructorsPage = () => {
   return (
      <div>
         <Title>Список экспертов</Title>
         <TableInstructors />
      </div>
   );
};

export default InstructorsPage;
