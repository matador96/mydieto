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
   InputNumber,
   Divider
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
import { GetCatalogsListByParentId } from '@features/catalog/model/services/GetCatalogsListByParentId';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

const StorageListQuantityWithSave = (props) => {
   const {
      storage: { quantity, id },
      callBack
   } = props;
   const [isLoading, setIsLoading] = useState(false);
   const [currentQuantity, setQuantity] = useState(0);
   const dispatch = useDispatch();

   useEffect(() => {
      setQuantity(quantity);
   }, [quantity]);

   const addToCart = (obj) => {
      dispatch(cartActions.addToCart(obj));
      message.success('Добавлено в корзину');
   };

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
            <Tooltip placement="top" title={'Добавить в корзину'}>
               <Button
                  type="primary"
                  loading={isLoading}
                  onClick={() =>
                     addToCart({
                        id,
                        name: props.storage.catalog.name,
                        quantity: 1
                     })
                  }
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
         const storageData = res.data;

         GetCatalogsListByParentId(0, {
            page: 1,
            limit: 1000,
            sort: 'priority',
            order: 'asc'
         }).then((r) => {
            const tableData = r.data;

            const newModifiedList = [];

            tableData.map((e) => {
               let items = [];
               storageData.map((o) => {
                  if (o.catalog.parentId === e.id) {
                     items.push(o);
                  }
               });
               newModifiedList.push({ catalog: e, items });
            });

            setIsLoading(false);
            setData(newModifiedList.filter((p) => p.items.length));
         });
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
         {data.map((item) => (
            <React.Fragment key={`storage-catalog-${item.id}`}>
               <Divider orientation="left">{item.catalog.name}</Divider>
               <List
                  itemLayout="horizontal"
                  dataSource={item.items}
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
                                 Удалить из склада
                              </span>
                           }
                        />
                     </List.Item>
                  )}
               />
            </React.Fragment>
         ))}
      </div>
   );
};

export default StorageList;
