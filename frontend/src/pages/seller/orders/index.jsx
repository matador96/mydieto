import React from 'react';
import CardListCatalogs from '@features/catalog/ui/CardListCatalogs';
import { Title } from '@shared/ui';

const OrdersPage = () => {
   return (
      <div>
         <Title>Мои заказы</Title>
         <CardListCatalogs />
      </div>
   );
};

export default OrdersPage;
