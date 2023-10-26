import { Suspense, memo } from 'react';
import { AppRouter } from './providers/router';
import StoreProvider from './providers/store';
import AuthProvider from './providers/with-auth';

const App = () => {
   return (
      <Suspense fallback="">
         <StoreProvider>
            <AuthProvider>
               <AppRouter />
            </AuthProvider>
         </StoreProvider>
      </Suspense>
   );
};

export default memo(App);
