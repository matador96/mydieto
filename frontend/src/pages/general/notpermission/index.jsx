import React from 'react';
import { Title, Alert } from '@shared/ui';

const NotPermissionPage = () => {
   return (
      <div>
         <Title>Нет доступа</Title>
         <Alert
            style={{ maxWidth: 600 }}
            message="У вас нет доступа к этой странице, проверьте права"
            type="error"
            showIcon
         />
      </div>
   );
};

export default NotPermissionPage;
