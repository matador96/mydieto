import { Pagination } from 'antd';
import React from 'react';
import { PAGINATION_PAGESIZE_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import {
   getLocalStorageByKey,
   setLocalStorageByKey
} from '@shared/lib/localStorage';

const initialPaginationSettings = () => ({
   current: 1,
   pageSize: window.paginationPageSize || 10,
   total: 10,
   defaultCurrent: 1
});

const loadAndSavePaginationPageSize = () => {
   getLocalStorageByKey(PAGINATION_PAGESIZE_LOCALSTORAGE_KEY).then((res) => {
      if (res) {
         window.paginationPageSize = parseInt(res);
      }
   });
};

const PaginationComponent = ({
   isLoading = false,
   onChangePagination,
   pagination
}) => {
   if (pagination.total === 0) {
      return <></>;
   }

   const onChange = (current, pageSize) => {
      window.paginationPageSize = pageSize;
      setLocalStorageByKey(PAGINATION_PAGESIZE_LOCALSTORAGE_KEY, pageSize);
      onChangePagination(current, pageSize);
   };

   return (
      <Pagination
         {...pagination}
         direction="vertical"
         onChange={onChange}
         disabled={isLoading}
         showQuickJumper
         showSizeChanger={true}
      />
   );
};

export { initialPaginationSettings, loadAndSavePaginationPageSize };
export default PaginationComponent;
