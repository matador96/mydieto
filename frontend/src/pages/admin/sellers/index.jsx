import React from 'react';
// import TableOrders from '@features/order/ui/TableOrders';
import SellerList from '@features/storage/ui/SellerList';

import { Title } from '@shared/ui';

const SellerStorages = () => {
   return (
      <div>
         <Title>Склады продавцов</Title>
         <SellerList />
      </div>
   );
};

export default SellerStorages;
