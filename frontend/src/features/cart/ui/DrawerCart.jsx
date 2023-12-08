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

import { CreateMyOrder } from '@features/order/model/services/CreateMyOrder';

import { getCartItems } from '@entitles/Cart';

const AddressList = ({ selectedAddressId, setSelectedAddressId }) => {
   const [isLoading, setIsLoading] = useState(false);

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
                  <Radio
                     onClick={() => setSelectedAddressId(item.id)}
                     checked={selectedAddressId === item.id}
                     value={item.id}
                  />
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

const CartList = ({ handleNameChange }) => {
   const cartData = useSelector(getCartItems);
   const [orderItems, setOrderItems] = useState([]);
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
                           max={item.quantity}
                           size="small"
                           style={{ width: '80px' }}
                           defaultValue={item.quantity}
                           onChange={(e) => handleNameChange(e)}
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
   const [selectedAddressId, setSelectedAddressId] = useState(null);
   const [inputName, setInputName] = useState(0);
   const cartData = useSelector(getCartItems);
   const dispatch = useDispatch();
   console.log(inputName, 'INPUTnAME');
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
      const orderItems = cartData.map((e) => ({
         catalogId: e.id,
         quantity: e.quantity
      }));

      if (!selectedAddressId) {
         message.error('Выберите адрес');
         return;
      }

      if (orderItems.length === 0) {
         message.error('Заказ пустой');
         return;
      }

      orderItems.forEach((item) => {
         item.quantity = inputName;
      });
      const orderData = {
         addressId: selectedAddressId,
         orderItems
      };
      console.log(orderData);
      CreateMyOrder(orderData)
         .then(() => {
            message.success('Заказ создан');
            onClose();
            setSelectedAddressId(null);
            dispatch(cartActions.cleanCart());
         })
         .catch((e) => message.error(e.message));
   };

   const handleNameChange = (value) => {
      setInputName(value);
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
            <CartList handleNameChange={handleNameChange} />

            <Divider orientation="left">Адрес вывоза</Divider>
            <AddressList
               selectedAddressId={selectedAddressId}
               setSelectedAddressId={setSelectedAddressId}
            />

            <Button type="primary" onClick={createOrder} style={{ width: '100%' }}>
               Отправить заказ
            </Button>
         </Drawer>
      </div>
   );
};

export default DrawerCart;
