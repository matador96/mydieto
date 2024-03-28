/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Checkbox } from 'antd';

const CheckBoxTagsCard = ({ title, list, onChange }) => {
   return (
      <div className="card-style-2">
         <div className="card-style-2_title">{title}</div>
         <div className="card-style-2_content">
            <div className="card-style-2_content_item">
               <Checkbox.Group
                  className="checkbox-group-1"
                  options={list}
                  onChange={onChange}
               />
            </div>
         </div>
      </div>
   );
};

export default CheckBoxTagsCard;
