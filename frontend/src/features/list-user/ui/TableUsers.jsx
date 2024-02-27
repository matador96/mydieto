import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { getUsersList } from '../model/getUsersList';
import { Button, VerticalSpace } from '@shared/ui';
import { Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalUserForm from './ModalUserForm';
import ModalButtonUserCreate from './ModalButtonUserCreate';
import CanDo from '@shared/lib/CanDo';

import {
   getColumnSearchProps,
   onSearchFilterTable,
   onTableChange
} from '@shared/ui/Table';

const TableUsers = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);

   const [paramsTable, setParamsTable] = useState({
      pagination: { ...initialPaginationSettings() },
      filters: {},
      sorter: {}
   });

   const { pagination, filters } = paramsTable;

   useEffect(() => {
      fetchData();
   }, []);

   const columns = [
      {
         title: 'Идентификатор',
         dataIndex: 'id',
         key: 'id',
         filtered: !!filters?.['id'],
         ...getColumnSearchProps({
            dataIndex: 'id',
            handleSearch: (searchObj) => onSearchTable(searchObj)
         })
      },
      {
         title: 'Имя',
         key: 'firstName',
         dataIndex: 'firstName'
      },
      {
         title: 'Фамилия',
         key: 'lastName',
         dataIndex: 'lastName'
      },
      {
         title: 'Роль',
         key: 'role',
         dataIndex: 'role',
         render: (role) => <Tag>{role}</Tag>
      },
      {
         title: 'Статус',
         dataIndex: 'status',
         key: 'status',
         render: (_) => <Tag>{_}</Tag>
      },
      {
         title: 'Почта',
         key: 'email',
         dataIndex: 'email'
      }
   ];

   const actions = [
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Tooltip placement="top" title={'Редактировать'}>
                  <Button onClick={() => setSelectedUser(record)} type="primary">
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </Space>
         )
      }
   ];

   const onSearchTable = (searchObj) => {
      onSearchFilterTable(searchObj, paramsTable, fetchData);
   };

   const handleTableChange = (pagination, filtersTable, sorterTable) => {
      onTableChange(pagination, filtersTable, sorterTable, paramsTable, fetchData);
   };

   const closeModal = () => {
      setSelectedUser(null);
      fetchData();
   };

   const fetchData = (params = paramsTable) => {
      setIsLoading(true);
      getUsersList({
         page: params.pagination.current,
         limit: params.pagination.pageSize,
         ...params.sorter,
         ...params.filters
      }).then((res) => {
         setParamsTable({
            ...params,
            pagination: { ...params.pagination, total: res.count }
         });

         setData(res.data);
         setIsLoading(false);
      });
   };

   const onChangePagination = (current, pageSize) => {
      const newParams = {
         ...paramsTable,
         pagination: { ...paramsTable.pagination, current, pageSize }
      };
      fetchData(newParams);
   };

   return (
      <>
         <ModalUserForm selectedUser={selectedUser} closeModal={closeModal} />
         {/* 
         <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ModalButtonUserCreate closeModal={closeModal} />
         </Space> */}

         <VerticalSpace />
         <Table
            rowKey="id"
            columns={[...columns, ...actions]}
            dataSource={data}
            pagination={false}
            onChange={handleTableChange}
            loading={isLoading}
         />
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

export default TableUsers;
