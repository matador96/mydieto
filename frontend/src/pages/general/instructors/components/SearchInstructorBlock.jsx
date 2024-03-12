/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Content } from '@shared/ui';
import { Input } from 'antd';

const SearchInstructorBlock = () => {
   return (
      <Content>
         <div className="search-instructor-block">
            <div className="search-instructor-block_title">Поиск по экспертам</div>
            <div className="search-instructor-block_input">
               <Input placeholder="Поиск по ФИО" />
            </div>
         </div>
      </Content>
   );
};

export default SearchInstructorBlock;
