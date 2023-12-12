/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import {
   Button,
   List,
   Space,
   Tooltip,
   message,
   Modal,
   InputNumber,
   Divider,
   Input
} from 'antd';

import { ExclamationCircleFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { GetStorageMyWithParams } from '../model/GetStorageMyWithParams';
import { DeleteStorageById } from '../model/DeleteStorageById';
import { UpdateStorage } from '../model/UpdateStorage';

import { unitSettings } from '@shared/const/units';
import { GetCatalogsListByParentId } from '@features/catalog/model/services/GetCatalogsListByParentId';

import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

const StorageListQuantityWithSave = (props) => {
   const { storage, isLoading, setQuantity } = props;
   const { quantity } = storage;

   const [inputQuantity, setInputQuantity] = useState(1);
   const dispatch = useDispatch();
   useEffect(() => {
      setQuantity(inputQuantity);
   }, [inputQuantity]);

   const addToCart = () => {
      const quantityValue = parseInt(inputQuantity, 10);

      if (
         !isNaN(quantityValue) &&
         quantityValue > 0 &&
         inputQuantity <= props.storage.quantity
      ) {
         dispatch(
            cartActions.addToCart({
               id: props.storage.catalog.id,
               name: props.storage.catalog.name,
               quantity: quantityValue,
               unit: storage.catalog.unit
            })
         );
         message.success('Добавлено в корзину');
      } else {
         message.error('Введите корректное количество товара');
      }
   };

   return (
      <Space direction="vertical">
         <Space>
            <Input
               min={1}
               defaultValue={1}
               max={props.storage.quantity}
               style={{ width: '120px' }}
               type="number"
               addonAfter={
                  unitSettings.find((e) => e.value === props.storage.catalog.unit)
                     .shortLabel
               }
               value={inputQuantity}
               onChange={(e) => setInputQuantity(e.target.value)}
            />
            <Tooltip placement="top" title={'Добавить в корзину'}>
               <Button
                  type="primary"
                  loading={isLoading}
                  disabled={quantity === 0}
                  onClick={addToCart}
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
      UpdateStorage({ quantity: quantityMap[itemId] }, itemId).then(() => {
         setIsLoading(false);
         fetchData();
         message.success('Сохранено');
      });
   };

   const fetchData = () => {
      setIsLoading(true);
      GetStorageMyWithParams({
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
                           <div
                              className="storage-background-image"
                              style={{
                                 backgroundImage: `url('${
                                    item.catalog.imgUrl || defaulPhotoCard
                                 }')`
                              }}
                           />

                           <List.Item.Meta
                              style={{ marginLeft: '15px' }}
                              key={`${item.id}-`}
                              title={item.catalog.name}
                              description={
                                 <>
                                    <div>
                                       <InputNumber
                                          style={{
                                             width: '120px'
                                          }}
                                          min={1}
                                          max={100}
                                          defaultValue={1}
                                          addonAfter={
                                             unitSettings.find(
                                                (e) => e.value === item.catalog.unit
                                             ).shortLabel
                                          }
                                          value={item.quantity}
                                          onChange={(v) =>
                                             setQuantityMap((prev) => ({
                                                ...prev,
                                                [item.id]: v
                                             }))
                                          }
                                       />

                                       <span
                                          className="green-span-url"
                                          type="link"
                                          style={{
                                             marginLeft: '10px',
                                             textDecoration: 'none'
                                          }}
                                          onClick={() => save(item.id)}>
                                          Сохранить
                                       </span>
                                    </div>
                                    <span
                                       className="red-span-url"
                                       type="link"
                                       style={{ fontSize: '12px' }}
                                       onClick={() => showConfirmDelete(item.id)}>
                                       Удалить из склада
                                    </span>
                                 </>
                              }
                           />
                        </List.Item>
                     </div>
                  )}
               />
            </React.Fragment>
         ))}
      </div>
   );
};

export default StorageList;
