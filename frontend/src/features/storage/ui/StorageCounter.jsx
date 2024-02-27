import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetMyStorageCount } from '../model/GetMyStorageCount';
import storageIcon from '@shared/assets/images/storage.svg';
const COUNTER_UPDATE_INTERVAL_MS = 2500;

const StorageCounter = () => {
   const [count, setCount] = useState(0);
   const navigate = useNavigate();

   useEffect(() => {
      fetchData();

      const intervalId = setInterval(() => {
         fetchData();
      }, COUNTER_UPDATE_INTERVAL_MS);

      return () => clearInterval(intervalId);
   }, []);

   const fetchData = () => {
      // GetMyStorageCount().then((res) => {
      //    setCount(res?.data || 0);
      // });
   };

   return (
      <div className="menu-items" onClick={() => navigate(`/seller/storage`)}>
         <Badge
            showZero
            count={count}
            size="small"
            style={{
               backgroundColor: '#52c41a'
            }}>
            <img className="menu-items-icon" src={storageIcon} />
         </Badge>
         <span className="menu-profile-info_login">Cклад</span>
      </div>
   );
};

export default StorageCounter;
