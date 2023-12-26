import orderIcon from '../../assets/images/orders.svg';
import { useNavigate } from 'react-router-dom';


const OrderIconComponent = () => {
   const navigate = useNavigate();
   

   return (
      <div className="menu-items" onClick={() => navigate(`/seller/orders`)}>
         <img className='menu-items-icon'  src={orderIcon} />
         <span className="menu-profile-info_login">Заказы</span>
      </div>
   );
};

export { OrderIconComponent };
