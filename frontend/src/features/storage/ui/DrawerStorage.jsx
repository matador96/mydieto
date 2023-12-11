import { useEffect, useState } from 'react';
import { getStorages } from '../../../shared/api/all/storage';
import { Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const StorageCounter = () => {
   const [count, setCount] = useState(0);
   const navigate = useNavigate();
   const fetchData = async () => {
      try {
         const response = await getStorages({ limit: 1000 });
         setCount(response.json.count);
      } catch (error) {
         console.error('Ощибка получения count:', error);
      }
   };

   useEffect(() => {
      const intervalId = setInterval(() => {
         fetchData();
      }, 2500);

      return () => clearInterval(intervalId);
   }, []);

   return (
      <div className="header-button" onClick={() => navigate(`/seller/storage`)}>
         <Badge showZero count={count} size="small" status="success">
            <InboxOutlined />
         </Badge>
         <span className="header-button_label">Мой склад</span>
      </div>
   );
};

export default StorageCounter;
