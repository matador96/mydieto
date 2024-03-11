import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip } from 'antd';
import { GetFaqs } from '../model/services/GetFaqs';
import { Button, VerticalSpace } from '@shared/ui';
import { Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonFaqCreate from './ModalButtonFaqCreate';
import { statusesOfFaqs } from '@shared/const/statuses';
import { faqSettings } from '@shared/const/faqs';
import ModalFaqForm from './ModalFaqForm';
import CanDo from '@shared/lib/CanDo';
import {
   getColumnSearchProps,
   onSearchFilterTable,
   onTableChange
} from '@shared/ui/Table';
import { deleteFaqById } from '@shared/api/all/faq';
import DeleteEntityButton from '@widgets/Button/DeleteEntityButton';

const TableFaqs = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [selectedFaq, setSelectedFaq] = useState(null);

   const [paramsTable, setParamsTable] = useState({
      pagination: { ...initialPaginationSettings() },
      filters: {},
      sorter: {
         sort: 'priority',
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
         title: 'Заголовок',
         dataIndex: 'title',
         key: 'title',
         sorter: true
      },
      {
         title: 'Описание',
         dataIndex: 'description',
         key: 'description',
         width: 400,
         render: (_) => <div className="block-break-word">{_}</div>
      },
      {
         title: 'Приоритет',
         dataIndex: 'priority',
         key: 'priority',
         sorter: true
      }
   ];

   const actions = [
      {
         title: 'Статус',
         dataIndex: 'status',
         key: 'status',
         render: (_) => (
            <Tag color={statusesOfFaqs[_]?.color}>{statusesOfFaqs[_]?.label}</Tag>
         )
      },
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Tooltip placement="top" title={'Редактировать'}>
                  <Button onClick={() => setSelectedFaq(record)}>
                     <EditOutlined />
                  </Button>
               </Tooltip>

               <DeleteEntityButton
                  id={record.id}
                  callbackFetch={deleteFaqById}
                  update={fetchData}
               />
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
      setSelectedFaq(null);

      setTimeout(() => {
         fetchData();
      }, 1000);
   };

   const fetchData = (params = paramsTable) => {
      setIsLoading(true);
      GetFaqs({
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
         <ModalFaqForm selectedFaq={selectedFaq} closeModal={closeModal} />

         <Space style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <ModalButtonFaqCreate closeModal={closeModal} />
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

export default TableFaqs;
