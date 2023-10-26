import React from 'react';
import { Alert } from '@shared/ui';
import { userRolesLabels } from '@shared/const/userRoles';

const CreateResult = ({ generatedUser }) => {
   const { login, password, role } = generatedUser;
   if (!login) {
      return <></>;
   }

   return (
      <div style={{ maxWidth: '100%' }}>
         <Alert
            message="Пользователь создан"
            description={
               <div>
                  <div>Логин: {login}</div>
                  <div>Пароль: {password}</div>
                  <div>Роль: {userRolesLabels[role]}</div>
               </div>
            }
            type="success"
            showIcon
         />
      </div>
   );
};

export default CreateResult;
