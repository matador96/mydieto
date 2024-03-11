import React from 'react';
import TableFaqs from '@features/faq/ui/TableFaqs';
import { Title } from '@shared/ui';

const ManageFaqsPage = () => {
   return (
      <div>
         <Title>Список faq</Title>
         <TableFaqs />
      </div>
   );
};

export default ManageFaqsPage;
