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
   Divider,
   Input
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

import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

const StorageListQuantityWithSave = (props) => {
   const {
      storage: { quantity },
      isLoading,
      setQuantity
   } = props;

   const dispatch = useDispatch();

   useEffect(() => {
      setQuantity(quantity);
   }, [quantity]);

   const addToCart = (obj) => {
      dispatch(cartActions.addToCart(obj));
      message.success('Добавлено в корзину');
   };

   return (
      <Space direction="vertical">
         <Space>

            <Input  disabled={quantity.length <= 0} style={{width: '80px'}} type='number' />
            <Tooltip placement="top" title={'Добавить в корзину'}>
               <Button
                  type="primary"
                  loading={isLoading}
                  disabled={quantity === 0}
                  onClick={() =>
                     addToCart({
                        id: props.storage.catalog.id,
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
   const [quantityMap, setQuantityMap] = useState({});

   useEffect(() => {
      fetchData();
   }, []);

   const save = (itemId) => {
      setIsLoading(true);
      UpdateStorage({ quantity: quantityMap[itemId] }, [`${itemId}-g`]).then(() => {
         setIsLoading(false);
         fetchData();
         message.success('Сохранено');
      });
   };

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

            tableData.forEach((e) => {
               let items = [];
               storageData.forEach((o) => {
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
                     <div>
                        <List.Item
                           actions={[
                              <StorageListQuantityWithSave
                                 setQuantity={(v) =>
                                    setQuantityMap((prev) => ({
                                       ...prev,
                                       [item.id]: v
                                    }))
                                 }
                                 isLoading={isLoading}
                                 setIsLoading={setIsLoading}
                                 key={`${item.id}-g`}
                                 storage={item}
                                 callBack={fetchData}
                              />
                           ]}>
                           {item.catalog.imgUrl ? (
                              <img
                                 alt={item.catalog.name}
                                 src={item.catalog.imgUrl}
                              />
                           ) : (
                              <img alt="default image" src={defaulPhotoCard} />
                           )}

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

                        <Tooltip placement="top" title={'Сохранить'}>
                           <Button
                              type="primary"
                              loading={isLoading}
                              onClick={() => save(item.id)}
                              icon={<SaveOutlined />}
                           />
                        </Tooltip>

                        <InputNumber
                           style={{ marginLeft: '10px' }}
                           min={1}
                           max={100}
                           defaultValue={1}
                           value={quantityMap[item.id]}
                           onChange={(v) =>
                              setQuantityMap((prev) => ({
                                 ...prev,
                                 [item.id]: v
                              }))
                           }
                        />
                     </div>
                  )}
               />
            </React.Fragment>
         ))}
      </div>
   );
};

export default StorageList;
