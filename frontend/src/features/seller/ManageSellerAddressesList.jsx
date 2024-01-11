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

import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ModalAddressForm from './ModalAddressForm';
import UserForm from '@features/user/UserForm';
// import SellerAddressesForm from './SellerAddressesForm';
import { GetMyAddressList } from './model/GetMyAddressList';
import { UpdateMyAddress } from './model/UpdateMyAddress';
import addressDeleteIcon from '../../shared/assets/images/profileAddressDeleteIcon.svg';
import addressUpdateIcon from '../../shared/assets/images/profileAddressUpdateIcon.svg';
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
         <div
            style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center'
            }}>
            <p
               style={{
                  color: '#000',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '24px'
               }}>
               Мои адреса
            </p>
            <ModalButtonAddressCreate closeModal={fetchData} />
            <ModalAddressForm
               selectedAddress={selectedAddress}
               closeModal={closeModal}
            />
         </div>
         <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
               <List.Item
                  style={{
                     border: 'none',
                     height: '66px',
                     width: '600px',
                     display: 'flex',
                     alignItems: 'center'
                  }}
                  actions={[
                     <Space
                        style={{
                           width: '69px',
                           height: '35px',
                           gap: '8px',
                           display: 'flex',
                           justifyContent: 'space-around',
                           alignItems: 'end'
                        }}
                        direction="horizontal"
                        key="dsfsdfdsf">
                        <Tooltip
                           placement="right"
                           title={'Редактировать адрес'}
                           arrow={false}>
                           {/* <Button
                              type="primary"
                              onClick={() => setSelectedAddress(item)}
                              icon={addressDeleteIcon}
                           /> */}
                           <img
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSelectedAddress(item)}
                              src={addressUpdateIcon}
                           />
                        </Tooltip>

                        <Tooltip
                           placement="right"
                           title={'Удалить адрес'}
                           arrow={false}>
                           {/* <Button
                              type="primary"
                              danger
                              onClick={() => showConfirmDelete(item.id)}
                              icon={addressUpdateIcon}
                           /> */}
                           <img
                              style={{ cursor: 'pointer' }}
                              onClick={() => showConfirmDelete(item.id)}
                              src={addressDeleteIcon}
                           />
                        </Tooltip>
                     </Space>
                  ]}>
                  <List.Item.Meta
                     className="profile-address-list"
                     style={{}}
                     key={`${item.id}-${item.address}`}
                     title={item.name}
                     description={
                        <Descriptions style={{ height: '18px' }} size="small">
                           <Descriptions.Item className="profile-address" span={3}>
                              {item.address || 'Не найден'}
                           </Descriptions.Item>

                           {/* <Descriptions.Item label="Комментарий" span={3}>
                              {item.comment || 'Не указан'}
                           </Descriptions.Item> */}
                        </Descriptions>
                     }
                  />
               </List.Item>
            )}
         />
      </div>
   );
};

export default ManageSellerAddressesList;
