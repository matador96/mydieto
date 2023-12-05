import React from 'react';
import OrderTabs from '@features/order/ui/OrderTabs';
import { Title } from '@shared/ui';

const OrdersPage = () => {
   return (
      <div>
         <Title>Мои заказы</Title>
         <OrderTabs />
      </div>
   );
};

export default OrdersPage;

