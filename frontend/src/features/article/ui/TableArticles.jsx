import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Avatar } from 'antd';
import { Button, VerticalSpace } from '@shared/ui';
import { GetArticlesList } from '../model/services/GetArticlesList';
import { EditOutlined } from '@ant-design/icons';
import ModalArticleForm from './ModalArticleForm';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonArticleCreate from './ModalButtonArticleCreate';
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

const TableArticles = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });

   const actions = [
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Space size="small">
               <Tooltip placement="top" title={'Редактировать'}>
                  <Button onClick={() => setSelectedCategory(record)} type="primary">
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </Space>
         )
      }
   ];

   const closeModal = () => {
      setSelectedCategory(null);
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
      GetArticlesList({
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
         <ModalArticleForm
            selectedCategory={selectedCategory}
            closeModal={closeModal}
         />

         <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ModalButtonArticleCreate closeModal={closeModal} />
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

export default TableArticles;
