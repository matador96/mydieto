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
   Input,
   Checkbox,
   Badge
} from 'antd';

import {
   ExclamationCircleFilled,
   ShoppingCartOutlined,
   MinusOutlined,
   PlusOutlined,
   CloseOutlined
} from '@ant-design/icons';
import { GetStorageMyWithParams } from '../model/GetStorageMyWithParams';
import { DeleteStorageById } from '../model/DeleteStorageById';
import { UpdateStorage } from '../model/UpdateStorage';

import { unitSettings } from '@shared/const/units';
import { GetCatalogsList } from '@features/catalog/model/services/GetCatalogsList';

import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';
import SelectAndDelete from './SelectAndDelete';
import { Title } from '@shared/ui';

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
         <Space className="storage-space-container">
            <div className="inner-container">
               <MinusOutlined
                  onClick={() => setInputQuantity((prev) => prev - 1)}
                  className="minus-outlined"
               />
               <Input
                  min={1}
                  defaultValue={1}
                  max={props.storage.quantity}
                  className="storage-item-input"
                  // type="number"
                  // addonAfter={
                  //    unitSettings.find((e) => e.value === props.storage.catalog.unit)
                  //       .shortLabel
                  // }
                  value={inputQuantity}
                  onChange={(e) => setInputQuantity(e.target.value)}
               />
               <PlusOutlined
                  onClick={() => setInputQuantity((prev) => prev + 1)}
                  className="plus-outlined"
               />
            </div>
            <Button
               className="storage-cart-button"
               type="primary"
               loading={isLoading}
               disabled={quantity === 0}
               onClick={addToCart}>
               В корзину
            </Button>
         </Space>
      </Space>
   );
};

const StorageList = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [chooseAllCheckbox, setChooseAllCheckbox] = useState(false);
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

         GetCatalogsList({
            page: 1,
            parentId: 0,
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

   const storageItemTitle = data.map((item) => item.items.length);
   const storageItemTitleCount = storageItemTitle.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
   );

   return (
      <div>
         <Title className="storage-title">
            Склад{' '}
            <Badge
               offset={[-4, -27]}
               className="storage-items-quantity-badge"
               count={storageItemTitleCount}></Badge>
         </Title>

         <SelectAndDelete
            setChooseAllCheckbox={setChooseAllCheckbox}
            chooseAllCheckbox={chooseAllCheckbox}
         />
         {data.map((storageItem) => (
            <React.Fragment key={`storage-catalog-${storageItem.id}`}>
               <h3 className="storage-item-title">
                  {storageItem.catalog.name}{' '}
                  <Badge
                     className="item-quantity-badge"
                     count={storageItem.items.length}
                  />
               </h3>
               <List
                  itemLayout="horizontal"
                  dataSource={storageItem.items}
                  loading={isLoading}
                  className="list-my-storage"
                  renderItem={(item) => (
                     <div>
                        <List.Item
                           style={{ height: '91px', padding: '0 12px 0 19px' }}
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
                           <Checkbox
                              checked={chooseAllCheckbox}
                              style={{ cursor: 'pointer' }}
                           />

                           <div
                              className="storage-background-image"
                              style={{
                                 backgroundImage: `url('${
                                    item.catalog.imgUrl || defaulPhotoCard
                                 }')`,
                                 marginLeft: '20px'
                              }}
                           />

                           <List.Item.Meta
                              style={{ marginLeft: '20px' }}
                              key={`${item.id}-`}
                              description={
                                 <div>
                                    <h3 className="storage-item-name">
                                       {' '}
                                       {item.catalog.name}
                                    </h3>
                                    <Input
                                       className="storage-item-input"
                                       min={1}
                                       max={100}
                                       defaultValue={1}
                                       addonBefore={'на складе'}
                                       //    unitSettings.find(
                                       //       (e) => e.value === item.catalog.unit
                                       //    ).shortLabel

                                       value={item.quantity}
                                       onChange={(v) =>
                                          setQuantityMap((prev) => ({
                                             ...prev,
                                             [item.id]: v
                                          }))
                                       }
                                    />
                                 </div>
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
