import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Avatar } from 'antd';
import { Button, VerticalSpace } from '@shared/ui';
import { GetArticlesList } from '../model/services/GetArticlesList';
import { EditOutlined } from '@ant-design/icons';
import ModalArticleForm from './ModalArticleForm';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonArticleCreate from './ModalButtonArticleCreate';
import CanDo from '@shared/lib/CanDo';
import { unitSettings } from '@shared/const/units';
import { statusesOfCategories } from '@shared/const/statuses';

const columns = [
   {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
   },
   {
      title: 'Картинка',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (_) => <Avatar src={_} shape="square" size={64} />
   },
   {
      title: 'Название каталога',
      dataIndex: 'name',
      key: 'name'
   },
   // {
   //    title: 'Приоритет',
   //    dataIndex: 'priority',
   //    key: 'priority'
   // },
   {
      title: 'Единица изм.',
      dataIndex: 'unit',
      key: 'unit',
      render: (_) => <>{unitSettings.find((e) => e.value === _)?.label}</>
   },
   {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_) => (
         <Tag color={statusesOfCategories[_]?.color}>
            {statusesOfCategories[_]?.label}
         </Tag>
      )
   }
];

const NestedTableCategories = ({ id, selectedCategory, setSelectedCategory }) => {
   const [data, setData] = useState([]);

   const nestedColumns = [
      ...columns,

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

   useEffect(() => {
      fetchData();

      // TODO не срабатывает когда в моменте создаешь категорию при открытом нест
   }, [selectedCategory]);

   const fetchData = () => {
      GetArticlesList({
         page: 1,
         limit: 1000,
         order: 'asc'
      }).then((res) => {
         setData(res.data);
      });
   };

   return (
      <Table
         rowKey="id"
         columns={nestedColumns}
         dataSource={data}
         pagination={false}
      />
   );
};

const TableArticles = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const [expandedRowKeys, setExpandedRowKeys] = useState([]);
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
         limit: pageSize,
         order: 'asc'
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

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   const mainCategories = data.filter((item) => item.parentId === 0);

   const onTableRowExpand = (expanded, { id }) => {
      setExpandedRowKeys(expanded ? [id] : []);
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
            dataSource={mainCategories}
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
            expandable={{
               expandedRowRender: (record) => (
                  <NestedTableCategories
                     id={record.id}
                     setSelectedCategory={setSelectedCategory}
                     selectedCategory={selectedCategory}
                  />
               ),
               defaultExpandedRowKeys: ['0']
            }}
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
