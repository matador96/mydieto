import { useSelector } from 'react-redux';
import { getUserPermissions } from '@entitles/User';

const CanDo = ({ permission, children }) => {
   const permissions = useSelector(getUserPermissions);

   if (!permissions.includes(permission)) {
      return null;
   }

   return children;
};

export default CanDo;
