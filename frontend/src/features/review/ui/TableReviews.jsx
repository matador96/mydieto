import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Rate } from 'antd';
import { GetReviews } from '../model/services/GetReviews';
import { Button, VerticalSpace } from '@shared/ui';
import { EditOutlined } from '@ant-design/icons';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonReviewCreate from './ModalButtonReviewCreate';
import { statusesOfReviews } from '@shared/const/statuses';
import ModalReviewForm from './ModalReviewForm';
import {
   getColumnSearchProps,
   onSearchFilterTable,
   onTableChange
} from '@shared/ui/Table';

const TableReviews = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedReview, setSelectedReview] = useState(null);

   const [paramsTable, setParamsTable] = useState({
      pagination: { ...initialPaginationSettings() },
      filters: {},
      sorter: {
         sort: 'rating',
         order: 'desc'
      }
   });

   const { pagination, filters } = paramsTable;

   useEffect(() => {
      fetchData();
   }, []);

   const columns = [
      {
         title: '№',
         dataIndex: 'id',
         key: 'id',
         sorter: true,
         filtered: !!filters?.['id'],
         ...getColumnSearchProps({
            dataIndex: 'id',
            handleSearch: (searchObj) => onSearchTable(searchObj),
            type: 'number'
         })
      },
      {
         title: 'Описание',
         dataIndex: 'comment',
         key: 'comment',
         width: 400,
         render: (_) => <div className="block-break-word">{_}</div>
      },
      {
         title: 'Оценка',
         dataIndex: 'rating',
         key: 'rating',
         width: '280px',
         render: (_) => <Rate value={_} disabled allowHalf />
      }
   ];

   const actions = [
      {
         title: 'Статус',
         dataIndex: 'status',
         key: 'status',
         render: (_) => (
            <Tag color={statusesOfReviews[_]?.color}>
               {statusesOfReviews[_]?.label}
            </Tag>
         )
      },
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Tooltip placement="top" title={'Редактировать'}>
                  <Button onClick={() => setSelectedReview(record)}>
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
      setSelectedReview(null);

      setTimeout(() => {
         fetchData();
      }, 1000);
   };

   const fetchData = (params = paramsTable) => {
      setIsLoading(true);
      GetReviews({
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
         <ModalReviewForm selected={selectedReview} closeModal={closeModal} />

         <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ModalButtonReviewCreate closeModal={closeModal} />
         </Space>

         <VerticalSpace />

         <Table
            columns={[...columns, ...actions]}
            dataSource={data}
            pagination={false}
            rowKey="id"
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

export default TableReviews;
