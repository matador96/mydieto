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

import { GetMyAddressList } from '@features/seller/model/GetMyAddressList';
import ModalButtonAddressCreate from '@features/seller/ModalButtonAddressCreate';

import { GetStorageWithParams } from '@features/storage/model/GetStorageWithParams';

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

const StorageList = () => {
   const [isLoading, setIsLoading] = useState(false);

   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetStorageWithParams({
         page: 1,
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
            loading={isLoading}
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
                     title={item.catalog.name}
                     description={
                        <span className="green-span-url" type="link">
                           Удалить
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
   const [open, setOpen] = useState(true);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   return (
      <div>
         <span onClick={showDrawer}>{props.button}</span>
         <Drawer
            title="Текущий заказ"
            placement="right"
            onClose={onClose}
            width={600}
            open={open}>
            <Divider orientation="left">Позиции заказа</Divider>
            <StorageList />

            <Divider orientation="left">Адрес вывоза</Divider>
            <AddressList />

            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
               Отправить заказ
            </Button>
         </Drawer>
      </div>
   );
};

export default DrawerCart;
