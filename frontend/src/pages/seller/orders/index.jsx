import React from 'react';
import OrderTabsSeller from '@features/order/ui/OrderTabsSeller';
import { Title } from '@shared/ui';

const OrdersPage = () => {
   return (
      <div>
         <Title>Мои заказы</Title>
         <OrderTabsSeller />
      </div>
   );
};

export default OrdersPage;
