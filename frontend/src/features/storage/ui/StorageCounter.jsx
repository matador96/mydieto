import { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetMyStorageCount } from '../model/GetMyStorageCount';

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
      GetMyStorageCount().then((res) => {
         setCount(res?.data || 0);
      });
   };

   return (
      <div className="header-button" onClick={() => navigate(`/seller/storage`)}>
         <Badge
            showZero
            count={count}
            size="small"
            style={{
               backgroundColor: '#52c41a'
            }}>
            <InboxOutlined />
         </Badge>
         <span className="header-button_label">Мой склад</span>
      </div>
   );
};

export default StorageCounter;
