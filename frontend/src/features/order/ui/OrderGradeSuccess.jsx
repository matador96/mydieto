import React from 'react';
import { VerticalSpace } from '@shared/ui';
import { Input, Button, Card, Row, Col, Divider } from 'antd';

import { useSelector } from 'react-redux';
import { getUserAuthData } from '@entitles/User';

const { TextArea } = Input;

const OrderGradeSuccess = ({ currentStatus }) => {
   const auth = useSelector(getUserAuthData);

   const isSeller = auth.type === 'seller';
   const isAdmin = auth.type === 'admin';

   if (isSeller) {
      if (currentStatus === 'onEvaluation') {
         return (
            <div>
               <VerticalSpace />
               Ожидает оценки от покупателя
            </div>
         );
      }

      if (currentStatus === 'onConfirmation') {
         return (
            <div>
               <VerticalSpace />
               Ожидает оценки от покупателя
            </div>
         );
      }
   }

   return (
      <div>
         <VerticalSpace />
         <Card bordered={true}>
            <Row gutter={24}>
               <Col span={12}>
                  <Divider orientation="center">Оценка заказа</Divider>

                  <p>
                     Оцените предварительно заказ на основе данных, которые
                     предоставил продавец.
                  </p>

                  <Input placeholder="Оценочная стоимость заказа" />
                  <Button type="primary" style={{ marginTop: '15px' }}>
                     Отправить предложение продавцу
                  </Button>
               </Col>

               <Col span={12}>
                  <Divider orientation="center">Отказать</Divider>

                  <p>Или откажите в покупке с указанием причины.</p>

                  <TextArea
                     placeholder="Введите причину отказа"
                     style={{ width: '100%' }}
                     rows={2}
                  />
                  <Button type="primary" danger style={{ marginTop: '15px' }}>
                     Отклонить заказ
                  </Button>
               </Col>
            </Row>
         </Card>
      </div>
   );
};

export default OrderGradeSuccess;
