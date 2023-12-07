import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { VerticalSpace } from '@shared/ui';
import timestampToNormalDate from '@shared/utils/tsToTime';
import { GetOrders } from '@features/order/model/services/GetOrders';
import statuses from '@shared/const/statuses';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';

const columns = [
   {
      title: 'Заказ',
      dataIndex: 'id',
      key: 'id',
      render: (_) => (
         <Space direction="vertical">
            <span
               className="green-span-url"
               style={{ padding: '5px 0' }}
               onClick={() => {}}>
               {`Заказ №${_}`}
            </span>
         </Space>
      )
   },

   {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_) => <Tag color={statuses[_]?.color}>{statuses[_]?.label}</Tag>
   },

   {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_) => timestampToNormalDate(_)
   }
];

const TableOrders = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState({ ...initialPaginationSettings() });

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = (
      current = pagination.current,
      pageSize = pagination.pageSize
   ) => {
      setIsLoading(true);
      GetOrders({
         page: current,
         limit: pageSize,
         sort: 'id',
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

   const onChangePagination = (current, pageSize) => {
      fetchData(current, pageSize);
   };

   return (
      <>
         <Table
            rowKey="id"
            columns={[...columns]}
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

export default TableOrders;
