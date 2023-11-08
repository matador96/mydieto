/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import {
   Descriptions,
   Button,
   List,
   Space,
   Tooltip,
   Avatar,
   message,
   Modal,
   InputNumber
} from 'antd';

import {
   EditOutlined,
   DeleteOutlined,
   SaveOutlined,
   ExclamationCircleFilled,
   ShoppingCartOutlined
} from '@ant-design/icons';
import { GetStorageWithParams } from '../model/GetStorageWithParams';
import { DeleteStorageById } from '../model/DeleteStorageById';
import { UpdateStorage } from '../model/UpdateStorage';

const { confirm } = Modal;

const StorageListQuantityWithSave = (props) => {
   const {
      storage: { quantity, id },
      callBack
   } = props;
   const [isLoading, setIsLoading] = useState(false);
   const [currentQuantity, setQuantity] = useState(0);

   useEffect(() => {
      setQuantity(quantity);
   }, [quantity]);

   const save = () => {
      setIsLoading(true);
      UpdateStorage({ quantity: currentQuantity }, id).then(() => {
         setIsLoading(false);
         callBack();
         message.success('Сохранено');
      });
   };

   return (
      <Space direction="vertical">
         <Space>
            {' '}
            <Tooltip placement="top" title={'Сохранить'}>
               <Button
                  type="primary"
                  loading={isLoading}
                  onClick={save}
                  icon={<SaveOutlined />}
               />
            </Tooltip>
            <InputNumber
               min={1}
               max={100}
               default={1}
               value={currentQuantity}
               onChange={(v) => setQuantity(v)}
            />
            <Tooltip placement="top" title={'Сохранить'}>
               <Button
                  type="primary"
                  loading={isLoading}
                  onClick={save}
                  icon={<ShoppingCartOutlined />}>
                  В корзину
               </Button>
            </Tooltip>
         </Space>
      </Space>
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

   const showConfirmDelete = (id) => {
      return confirm({
         title: 'Вы точно удалить?',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         async onOk() {
            DeleteStorageById(id).then(() => {
               fetchData();
               message.success('Удалено из склада');
            });
         },
         okText: 'Удалить',
         cancelText: 'Отмена'
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
                     <StorageListQuantityWithSave
                        key={`${item.id}-g`}
                        storage={item}
                        callBack={fetchData}
                     />
                  ]}>
                  <img
                     src={`https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png`}
                  />
                  <List.Item.Meta
                     key={`${item.id}-`}
                     title={item.catalog.name}
                     description={
                        <span
                           className="green-span-url"
                           type="link"
                           onClick={() => showConfirmDelete(item.id)}>
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

export default StorageList;
