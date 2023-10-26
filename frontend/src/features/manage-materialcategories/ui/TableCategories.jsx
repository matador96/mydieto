import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import { Button, VerticalSpace } from '@shared/ui';
import { GetCategoriesListByParentId } from '../model/services/GetCategoriesListByParentId';
import { EditOutlined } from '@ant-design/icons';
import ModalMaterialCategoryForm from './ModalMaterialCategoryForm';
import { Divider } from 'antd';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonCategoryCreate from './ModalButtonCategoryCreate';
import CanDo from '@shared/lib/CanDo';
import { statusesOfCategories } from '@shared/const/statuses';
import { unitSettings } from '@shared/const/units';

import { deleteCategoryById } from '@shared/api/all/category';

const columns = [
   {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
   },
   {
      title: 'Подкатегория',
      dataIndex: 'name',
      key: 'name'
   },
   {
      title: 'Приоритет',
      dataIndex: 'priority',
      key: 'priority'
   },

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
               <CanDo permission="can_edit_categories">
                  <Tooltip placement="top" title={'Редактировать'}>
                     <Button
                        onClick={() => setSelectedCategory(record)}
                        type="primary">
                        <EditOutlined />
                     </Button>
                  </Tooltip>
               </CanDo>
            </Space>
         )
      }
   ];

   useEffect(() => {
      fetchData();

      // TODO не срабатывает когда в моменте создаешь категорию при открытом нест
   }, [selectedCategory]);

   const fetchData = () => {
      GetCategoriesListByParentId(id, 1, 1000).then((res) => {
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

const TableCategories = () => {
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
               <CanDo permission="can_edit_categories">
                  <Tooltip placement="top" title={'Редактировать'}>
                     <Button
                        onClick={() => setSelectedCategory(record)}
                        type="primary">
                        <EditOutlined />
                     </Button>
                  </Tooltip>
               </CanDo>{' '}
               {record.status === 'archive' && (
                  <DeleteEntityButton
                     id={record.id}
                     callbackFetch={deleteCategoryById}
                     update={fetchData}
                     permission="can_delete_categories"
                  />
               )}
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
      GetCategoriesListByParentId(0, {
         page: current,
         limit: pageSize,
         sort: 'priority',
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
         <ModalMaterialCategoryForm
            selectedCategory={selectedCategory}
            closeModal={closeModal}
         />

         <CanDo permission="can_create_categories">
            <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
               <ModalButtonCategoryCreate closeModal={closeModal} />
            </Space>
         </CanDo>
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

export default TableCategories;
