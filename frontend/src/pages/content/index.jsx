import React from 'react';
import { Title, Button } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { Space, Divider } from 'antd';

const ContentPage = () => {
   const navigate = useNavigate();
   return (
      <div>
         <Title>Контент</Title>
         <Divider orientation="left">Faq</Divider>
         <Space size="middle">
            <Button
               type="primary"
               onClick={() => navigate('/content/faq/driverapp')}>
               Приложение водителя
            </Button>
            <Button type="primary" onClick={() => alert('в разработке')}>
               Приложение продавца
            </Button>
         </Space>

         <Divider orientation="left">Прочее</Divider>
      </div>
   );
};

export default ContentPage;
