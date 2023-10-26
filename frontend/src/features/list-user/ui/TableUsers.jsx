import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Modal } from 'antd';
import { getUsersList } from '../model/getUsersList';
import { Button, VerticalSpace } from '@shared/ui';
import { Divider, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalUserForm from './ModalUserForm';
import statuses from '@shared/const/statuses';
import ModalButtonUserCreate from './ModalButtonUserCreate';
import CanDo from '@shared/lib/CanDo';

import { deleteUserById } from '@shared/api/all/user';
import { userRolesColors, userRolesLabels } from '@shared/const/userRoles';
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
         title: 'Логин',
         dataIndex: 'login',
         key: 'login',
         filtered: !!filters?.['login'],
         ...getColumnSearchProps({
            dataIndex: 'login',
            handleSearch: (searchObj) => onSearchTable(searchObj)
         })
      },
      {
         title: 'Роль',
         key: 'role',
         dataIndex: 'role',
         render: (role) => (
            <Tag color={userRolesColors[role]} key={role}>
               {userRolesLabels[role]}
            </Tag>
         )
      },
      {
         title: 'Статус',
         dataIndex: 'status',
         key: 'status',
         render: (_) => <Tag color={statuses[_]?.color}>{statuses[_]?.label}</Tag>
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
         title: 'Должость',
         key: 'post',
         dataIndex: 'post'
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
               <CanDo permission="can_edit_users">
                  <Tooltip placement="top" title={'Редактировать'}>
                     <Button onClick={() => setSelectedUser(record)} type="primary">
                        <EditOutlined />
                     </Button>
                  </Tooltip>
               </CanDo>
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
         <CanDo permission="can_create_users">
            <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
               <ModalButtonUserCreate closeModal={closeModal} />
            </Space>
         </CanDo>

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
