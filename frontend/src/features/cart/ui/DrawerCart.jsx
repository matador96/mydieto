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
   Radio,
   Input,
   Badge
} from 'antd';

import { VerticalSpace } from '@shared/ui';

import {
   DeleteOutlined,
   EditOutlined,
   MinusOutlined,
   PlusOutlined,
   CloseOutlined
} from '@ant-design/icons';

import { unitSettings } from '@shared/const/units';
import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';
import { GetMyAddressList } from '@features/seller/model/GetMyAddressList';
import ModalButtonAddressCreate from '@features/seller/ModalButtonAddressCreate';
import defaulPhotoCard from '@shared/assets/images/defaulImage.png';

import { useSelector } from 'react-redux';
import { GetStorageWithParams } from '@features/storage/model/GetStorageWithParams';

import { CreateMyOrder } from '@features/order/model/services/CreateMyOrder';

import { getCartItems, getCartCount } from '@entitles/Cart';

const AddressList = ({
   selectedAddressId,
   setSelectedAddressId,
   fetchData,
   data
}) => {
   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div>
         <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
               <List.Item className="custom-list-item">
                  <Radio
                     className="cart-address-radio"
                     onClick={() => setSelectedAddressId(item.id)}
                     checked={selectedAddressId === item.id}
                     value={item.id}
                     buttonColor={'#2f9461'}
                  />
                  <List.Item.Meta
                     key={`${item.id}-${item.address}`}
                     title={<span className="item-title">{item.name}</span>}
                     description={
                        <>
                           <div className="item-description">{item.address}</div>
                        </>
                     }
                  />
               </List.Item>
            )}
         />
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

   const onChange = (id, value) => {
      if (value < 1) {
         message.info('Число меньше 1, нельзя выставить, можно удалить позицию');
         return;
      }

      dispatch(cartActions.updateCart(id, value));
   };

   return (
      <div>
         <List
            itemLayout="horizontal"
            dataSource={cartData}
            className="list-my-storage"
            renderItem={(item) => (
               <List.Item
                  className="seller-cart-list-item"
                  actions={[
                     <div
                        className="seller-cart-list-item-input-container"
                        key={`${item.id}-`}>
                        <MinusOutlined
                           className="minus-outlined"
                           onClick={() => onChange(item.id, item.quantity - 1)}
                        />
                        <Input
                           className="seller-cart-list-item-input"
                           min={1}
                           default={1}
                           onChange={(value) => onChange(item.id, value)}
                           size="small"
                           value={item.quantity}
                           // addonAfter={
                           //    unitSettings.find((e) => e.value === item.unit)
                           //       .shortLabel
                           // }
                        />
                        <PlusOutlined
                           className="plus-outlined"
                           onClick={() => onChange(item.id, item.quantity + 1)}
                        />
                     </div>
                  ]}>
                  <List.Item.Meta
                     key={`${item.id}-`}
                     className="seller-cart-list-item-meta"
                     description={
                        <>
                           <div
                              className="storage-background-image"
                              style={{
                                 backgroundImage: `url('${
                                    item?.imgUrl || defaulPhotoCard
                                 }')`,
                                 width: '77px',
                                 height: '60px'
                              }}
                           />
                           <div className="item-description-container">
                              <p>{item.name}</p>
                              <span
                                 className="green-span-url"
                                 type="link"
                                 onClick={() => deleteByIdCart(item.id)}>
                                 Удалить
                              </span>
                           </div>
                        </>
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
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   const cartData = useSelector(getCartItems);
   const cartCount = useSelector(getCartCount);
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
      const orderItems = cartData.map((e) => ({
         articleId: e.id,
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

      const orderData = {
         addressId: selectedAddressId,
         orderItems
      };

      CreateMyOrder(orderData)
         .then(() => {
            message.success('Заказ создан');
            onClose();
            setSelectedAddressId(null);
            dispatch(cartActions.cleanCart());
         })
         .catch((e) => message.error(e.message));
   };

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
         <span onClick={showDrawer}>{props.button}</span>
         <Drawer
            className="cart-drawer"
            title={
               <>
                  <div className="cart-drawer-title-container">
                     <h2 style={{}}>
                        Корзина{' '}
                        <Badge
                           style={{ marginBottom: '15px' }}
                           className="item-quantity-badge"
                           count={cartCount}
                        />
                     </h2>
                     <CloseOutlined onClick={() => onClose()} />
                  </div>
                  <span className="clear-cart-button" onClick={cleanCart}>
                     Очистить корзину
                  </span>
               </>
            }
            onClose={onClose}
            placement="right"
            width={630}
            open={open}>
            <CartList />
            <div className="address-section">
               <h3 style={{ padding: '0px' }}>Адрес вывоза</h3>
               <ModalButtonAddressCreate closeModal={fetchData} />
            </div>
            <AddressList
               data={data}
               fetchData={fetchData}
               selectedAddressId={selectedAddressId}
               setSelectedAddressId={setSelectedAddressId}
            />

            <Button
               className="cart-send-order"
               type="primary"
               onClick={createOrder}
               style={{ width: '100%' }}>
               Оформить заказ
            </Button>
         </Drawer>
      </div>
   );
};

export default DrawerCart;
