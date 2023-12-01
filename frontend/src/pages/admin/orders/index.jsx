import React from 'react';
import TableOrders from '@features/order/ui/TableOrders';
import { Title } from '@shared/ui';

const ManageOrdersPage = () => {
   return (
      <div>
         <Title>Заказы</Title>
         <TableOrders />
      </div>
   );
};

export default ManageOrdersPage;
