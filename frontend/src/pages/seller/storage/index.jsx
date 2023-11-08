import React from 'react';
import { Title } from '@shared/ui';
import StorageList from '@features/storage/ui/StorageList';

const StoragePage = () => {
   return (
      <div>
         <Title>Мой склад</Title>
         <StorageList />
      </div>
   );
};

export default StoragePage;
