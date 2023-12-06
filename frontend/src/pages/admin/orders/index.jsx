import React from 'react';
// import TableOrders from '@features/order/ui/TableOrders';
import OrderTabsAdmin from '@features/order/ui/OrderTabsAdmin';

import { Title } from '@shared/ui';

const ManageOrdersPage = () => {
   return (
      <div>
         <Title>Заказы</Title>
         <OrderTabsAdmin />
      </div>
   );
};

export default ManageOrdersPage;
