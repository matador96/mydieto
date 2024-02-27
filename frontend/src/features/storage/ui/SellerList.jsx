import React from 'react';
import { Space, Divider, Descriptions } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useState, useEffect } from 'react';
import { VerticalSpace } from '@shared/ui';
import { GetSellersList } from '@features/storage/model/GetSellersList';
import StorageListOfSeller from './StorageListOfSeller';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import { Typography } from 'antd';
import { List } from 'antd';
const { Text } = Typography;

const { Panel } = Collapse;

const AddressList = ({ addressList }) => {
   return (
      <List
         itemLayout="vertical"
         dataSource={addressList}
         renderItem={(item) => (
            <List.Item className="address-item" style={{ border: 'none' }}>
               <List.Item.Meta
                  className="address-list"
                  key={`${item.id} -${item.address}`}
                  title={`Название: ${item.name}`}
                  description={
                     <Descriptions size="small">
                        <Descriptions.Item label="Адрес" span={3}>
                           {item.address || 'Не найден'}
                        </Descriptions.Item>

                        <Descriptions.Item
                           style={{ marginBottom: '50px' }}
                           label="Комментарий"
                           span={3}>
                           {item.comment || 'Не указан'}
                        </Descriptions.Item>
                     </Descriptions>
                  }
               />
            </List.Item>
         )}
      />
   );
};

const SellerList = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });
   const { token } = theme.useToken();
   const panelStyle = {
      marginBottom: 12,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: 'none'
   };
   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = (
      current = pagination.current,
      pageSize = pagination.pageSize
   ) => {
      setIsLoading(true);
      GetSellersList({
         page: current,
         limit: pageSize,
         order: 'desc'
      }).then((res) => {
         setIsLoading(false);
         setPagination((prev) => ({
            ...prev,
            total: res.count,
            current,
            pageSize
         }));
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   const getItems = (panelStyle) => {
      const collapseList = data.map((e) => {
         return {
            key: e.id,
            label: (
               <Space direction="horizontal">
                  <Text strong>Продавец №{e.id}</Text>
                  <Text type="secondary">
                     {e.firstName} {e.lastName}
                  </Text>
               </Space>
            ),
            children: (
               <>
                  <Divider orientation="left">Продавец</Divider>

                  <Descriptions>
                     <Descriptions.Item key={`ФИО`} label="ФИО">
                        {e.firstName} {e.lastName}
                     </Descriptions.Item>
                  </Descriptions>

                  <Divider orientation="left">Адреса продавца</Divider>

                  <AddressList addressList={e?.addresses || []} />

                  <Divider orientation="left">Склад продавца</Divider>

                  <StorageListOfSeller sellerId={e.id} />
               </>
            ),
            style: panelStyle
         };
      });

      return collapseList;
   };

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   const collapseItems = getItems(panelStyle);
   return (
      <>
         <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
               <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ background: 'transparent' }}>
            {collapseItems.map((item) => (
               <Panel
                  key={item.key}
                  header={item.label}
                  extra={item.extra}
                  style={item.style}>
                  {item.children}
               </Panel>
            ))}
         </Collapse>
         <VerticalSpace />
         <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!!pagination.total && (
               <Pagination
                  pagination={pagination}
                  onChangePagination={onChangePagination}
                  isLoading={isLoading}
               />
            )}
         </Space>
      </>
   );
};

export default SellerList;
