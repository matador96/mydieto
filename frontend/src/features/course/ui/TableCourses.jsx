import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Avatar } from 'antd';
import { Button, VerticalSpace } from '@shared/ui';
import { GetCoursesList } from '../model/services/GetCoursesList';
import { EditOutlined } from '@ant-design/icons';
import ModalCourseForm from './ModalCourseForm';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonCourseCreate from './ModalButtonCourseCreate';
import { timestampToNormalDate } from '@shared/utils/tsToTime';

const columns = [
   {
      title: 'Идентификатор',
      dataIndex: 'id',
      key: 'id'
   },
   {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title'
   },
   {
      title: 'Создан пользователем',
      dataIndex: 'userId',
      key: 'userId'
   },
   {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_) => <>{timestampToNormalDate(_)}</>
   },
   {
      title: 'Дата изменения',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_) => <>{timestampToNormalDate(_)}</>
   },
   {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_) => <Tag>{_}</Tag>
   }
];

const TableCourses = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedEntity, setSelectedEntity] = useState(null);
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });

   const actions = [
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Space size="small">
               <Tooltip placement="top" title={'Редактировать'}>
                  <Button onClick={() => setSelectedEntity(record)} type="primary">
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </Space>
         )
      }
   ];

   const closeModal = () => {
      setSelectedEntity(null);
      fetchData();
   };

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = (
      current = pagination.current,
      pageSize = pagination.pageSize
   ) => {
      setIsLoading(true);
      GetCoursesList({
         page: current,
         limit: pageSize
      }).then((res) => {
         setIsLoading(false);
         setPagination((prev) => ({
            ...prev,
            total: res.count,
            current,
            pageSize
         }));

         setData(res.data);
      });
   };

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   return (
      <>
         <ModalCourseForm selectedEntity={selectedEntity} closeModal={closeModal} />

         <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ModalButtonCourseCreate closeModal={closeModal} />
         </Space>
         <VerticalSpace />
         <Table
            rowKey="id"
            columns={[...columns, ...actions]}
            dataSource={data}
            pagination={false}
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

export default TableCourses;
