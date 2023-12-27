/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Button, List, Space, message, Input, Checkbox, Badge } from 'antd';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { GetStorageMyWithParams } from '../model/GetStorageMyWithParams';
import { DeleteStorageById } from '../model/DeleteStorageById';
import { UpdateStorage } from '../model/UpdateStorage';

import { GetCatalogsList } from '@features/catalog/model/services/GetCatalogsList';

import defaulPhotoCard from '../../../shared/assets/images/platy-meta.jpeg';

import { cartActions } from '@entitles/Cart';
import { useDispatch } from 'react-redux';
import SelectAndDelete from './SelectAndDelete';
import { Title } from '@shared/ui';
import _ from 'lodash';

const StorageListQuantityWithSave = (props) => {
   const { storage, isLoading } = props;
   const { quantity } = storage;

   const [inputQuantity, setInputQuantity] = useState(1);
   const dispatch = useDispatch();

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
   const [choosedAll, setChoosedAll] = useState(false);
   const [checkboxList, setCheckboxList] = useState([]);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const save = (itemId, value) => {
      setIsLoading(true);
      UpdateStorage({ quantity: value }, itemId).then(() => {
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

   // const showConfirmDelete = (id) => {
   //    return confirm({
   //       title: 'Вы точно удалить?',
   //       icon: <ExclamationCircleFilled />,
   //       maskClosable: true,
   //       async onOk() {
   //          DeleteStorageById(id).then(() => {
   //             fetchData();
   //             message.success('Удалено из склада');
   //          });
   //       },
   //       okText: 'Удалить',
   //       cancelText: 'Отмена'
   //    });
   // };

   const storageItemTitle = data.map((item) => item.items.length);
   const storageItemTitleCount = storageItemTitle.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
   );

   const addAll = () => {
      const allStorageIds = [];
      data.map((e) => e.items.map((v) => allStorageIds.push(v.id)));

      const isChoosedAll =
         allStorageIds.length === checkboxList.length && checkboxList.length !== 0;

      if (isChoosedAll) {
         setChoosedAll(false);
         setCheckboxList([]);
         return;
      }

      setChoosedAll(true);
      setCheckboxList(allStorageIds);
   };

   const onClickCheckbox = (val) => {
      const allStorageIds = [];
      data.map((e) => e.items.map((v) => allStorageIds.push(v.id)));

      const isChoosedAll =
         allStorageIds.length === checkboxList.length && checkboxList.length !== 0;

      if (checkboxList.includes(val)) {
         setCheckboxList(checkboxList.filter((e) => e !== val));

         if (isChoosedAll) {
            setChoosedAll(false);
         }
         return;
      }

      setCheckboxList((prev) => [...prev, val]);
   };

   const onClickDeleteChoosed = async () => {
      const promises = [];

      promises.push(checkboxList.map(async (e) => await DeleteStorageById(e)));

      await Promise.all(promises);
      fetchData();

      message.success('Удалено из склада');

      setChoosedAll(false);
      setCheckboxList([]);
   };

   const debouncedChange = _.debounce(save, 500);

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
            isChoosedAll={choosedAll}
            addAll={addAll}
            onClickDeleteChoosed={onClickDeleteChoosed}
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
                           style={{
                              height: '91px',
                              padding: '0 12px 0 19px',
                              background: checkboxList.includes(item.id)
                                 ? '#F6FEF9'
                                 : '#fff'
                           }}
                           actions={[
                              <StorageListQuantityWithSave
                                 isLoading={isLoading}
                                 setIsLoading={setIsLoading}
                                 key={`${item.id}-g`}
                                 storage={item}
                                 callBack={fetchData}
                              />
                           ]}>
                           <Checkbox
                              checked={checkboxList.includes(item.id)}
                              onChange={() => onClickCheckbox(item.id)}
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
                                       defaultValue={item.quantity}
                                       addonBefore={'на складе'}
                                       onChange={(e) =>
                                          debouncedChange(item.id, e.target.value)
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
