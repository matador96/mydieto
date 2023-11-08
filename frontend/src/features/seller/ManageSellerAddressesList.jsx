/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from 'react';
import { Title, VerticalSpace } from '@shared/ui';
import { useSelector } from 'react-redux';
import {
   Descriptions,
   Button,
   Tag,
   Modal,
   Collapse,
   Row,
   Col,
   Card,
   Form,
   Input,
   Select,
   Divider,
   List,
   Space,
   Tooltip,
   message
} from 'antd';
import ModalButtonAddressCreate from '@features/seller/ModalButtonAddressCreate';

import {
   EditOutlined,
   DeleteOutlined,
   ExclamationCircleFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalAddressForm from './ModalAddressForm';
import UserForm from '@features/user/UserForm';
// import SellerAddressesForm from './SellerAddressesForm';
import { GetMyAddressList } from './model/GetMyAddressList';
import { UpdateMyAddress } from './model/UpdateMyAddress';

const { confirm } = Modal;

const ManageSellerAddressesList = () => {
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

   const closeModal = () => {
      fetchData();
   };

   const showConfirmDelete = (addressId) => {
      return confirm({
         title: 'Вы точно удалить адрес?',
         icon: <ExclamationCircleFilled />,
         maskClosable: true,
         async onOk() {
            await UpdateMyAddress({ status: 'blocked' }, addressId)
               .then(() => {
                  fetchData();
                  message.success('Адрес изменен');
               })
               .catch(() => message.error('Возникла ошибка при удалении'));
         },
         okText: 'Удалить',
         cancelText: 'Отмена'
      });
   };

   return (
      <div>
         <ModalAddressForm
            selectedAddress={selectedAddress}
            closeModal={closeModal}
         />

         <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
               <List.Item
                  actions={[
                     <Space direction="vertical" key="dsfsdfdsf">
                        <Tooltip
                           placement="right"
                           title={'Редактировать адрес'}
                           arrow={false}>
                           <Button
                              type="primary"
                              onClick={() => setSelectedAddress(item)}
                              icon={<EditOutlined />}
                           />
                        </Tooltip>

                        <Tooltip
                           placement="right"
                           title={'Удалить адрес'}
                           arrow={false}>
                           <Button
                              type="primary"
                              danger
                              onClick={() => showConfirmDelete(item.id)}
                              icon={<DeleteOutlined />}
                           />
                        </Tooltip>
                     </Space>
                  ]}>
                  <List.Item.Meta
                     key={`${item.id}-${item.address}`}
                     title={item.name}
                     description={
                        <Descriptions size="small">
                           <Descriptions.Item label="Адрес" span={3}>
                              {item.address || 'Не найден'}
                           </Descriptions.Item>

                           <Descriptions.Item label="Комментарий" span={3}>
                              {item.comment || 'Не указан'}
                           </Descriptions.Item>
                        </Descriptions>
                     }
                  />
               </List.Item>
            )}
         />

         <ModalButtonAddressCreate closeModal={fetchData} />
      </div>
   );
};

export default ManageSellerAddressesList;
