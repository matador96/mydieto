import React, { useState } from 'react';
import CreateUserForm from './CreateUserForm';
import CreateResult from './CreateResult';

const CreateUser = () => {
   const [generatedUser, setGeneratedUser] = useState({});

   return (
      <>
         <CreateUserForm setGeneratedUser={setGeneratedUser} />
         <CreateResult generatedUser={generatedUser} />
      </>
   );
};

export default CreateUser;
