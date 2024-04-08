import React from 'react';
import TableReviews from '@features/review/ui/TableReviews';
import { Title } from '@shared/ui';

const ManageReviewsPage = () => {
   return (
      <div>
         <Title>Отзывы на курсы</Title>
         <TableReviews />
      </div>
   );
};

export default ManageReviewsPage;
