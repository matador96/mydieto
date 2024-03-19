/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Input } from 'antd';

const SearchCard = () => {
   return (
      <div className="card-style-2">
         <div className="card-style-2_title">Поиск по курсам</div>
         <div className="card-style-2_content">
            <div className="card-style-2_content_item">
               <Input
                  type="text"
                  className="input-style-1"
                  placeholder="Название курса"
               />
            </div>
         </div>
      </div>
   );
};

export default SearchCard;
