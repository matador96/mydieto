import React, { useState, useEffect } from 'react';
import {
   Button,
   Drawer,
   Divider,
   List,
   Space,
   Tooltip,
   message,
   Descriptions,
   InputNumber,
   Radio
} from 'antd';
import { VerticalSpace } from '@shared/ui';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';
import { GetMyAddressList } from '@features/seller/model/GetMyAddressList';
import ModalButtonAddressCreate from '@features/seller/ModalButtonAddressCreate';

import { useSelector } from 'react-redux';
import { GetStorageWithParams } from '@features/storage/model/GetStorageWithParams';

import { getCartItems } from '@entitles/Cart';

const AddressList = () => {
   const [isLoading, setIsLoading] = useState(false);

   const [selectedAddress, setSelectedAddress] = useState(null);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetMyAddressList({
         page: 1,
         status: 'active',
         limit: 1000,
         sort: 'id',
         order: 'asc'
      }).then((res) => {
         setIsLoading(false);
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   return (
      <div>
         <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
               <List.Item>
                  <Radio />
                  <List.Item.Meta
                     key={`${item.id}-${item.address}`}
                     title={item.name}
                     description={
                        <>
                           <div>{item.address}</div>
                        </>
                     }
                  />
               </List.Item>
            )}
         />
         <VerticalSpace />
         <ModalButtonAddressCreate closeModal={fetchData} />
         <VerticalSpace />
      </div>
   );
};

const CartList = () => {
   const cartData = useSelector(getCartItems);
   const dispatch = useDispatch();

   const deleteByIdCart = (id) => {
      dispatch(cartActions.deleteFromCart(id));
      message.success('Убрано из корзины');
   };

   return (
      <div>
         <List
            itemLayout="horizontal"
            dataSource={cartData}
            className="list-my-storage"
            renderItem={(item) => (
               <List.Item
                  actions={[
                     <>
                        <InputNumber
                           min={1}
                           max={100}
                           default={1}
                           size="small"
                           style={{ width: '80px' }}
                           value={item.quantity}
                        />{' '}
                        шт.
                     </>
                  ]}>
                  <List.Item.Meta
                     key={`${item.id}-`}
                     title={item.name}
                     description={
                        <span
                           className="green-span-url"
                           type="link"
                           onClick={() => deleteByIdCart(item.id)}>
                           Убрать из корзины
                        </span>
                     }
                  />
               </List.Item>
            )}
         />
      </div>
   );
};

const DrawerCart = (props) => {
   const [open, setOpen] = useState(false);
   const cartData = useSelector(getCartItems);
   const dispatch = useDispatch();

   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   const cleanCart = () => {
      dispatch(cartActions.cleanCart());
      message.success('Корзина очищена');
   };

   const createOrder = () => {
      const addressId = 3;
      const price = 0;

      const orderItems = cartData.map((e) => ({
         catalogId: e.id,
         capacity: e.quantity
      }));

      const orderData = {
         addressId,
         price,
         orderItems
      };
   };

   return (
      <div>
         <span onClick={showDrawer}>{props.button}</span>
         <Drawer
            title="Текущий заказ"
            placement="right"
            onClose={onClose}
            width={600}
            open={open}
            extra={
               <Space>
                  <Button onClick={onClose}>Закрыть</Button>
                  <Button type="primary" danger onClick={cleanCart}>
                     Очистить корзину
                  </Button>
               </Space>
            }>
            <Divider orientation="left">Позиции заказа</Divider>
            <CartList />

            <Divider orientation="left">Адрес вывоза</Divider>
            <AddressList />

            <Button type="primary" onClick={createOrder} style={{ width: '100%' }}>
               Отправить заказ
            </Button>
         </Drawer>
      </div>
   );
};

export default DrawerCart;
