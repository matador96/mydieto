import React from 'react';
import { Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const SelectAndDelete = ({ chooseAllCheckbox, setChooseAllCheckbox }) => {
   return (
      <div className="select-and-delete-container">
         <div className="select-all-container">
            <Checkbox
               checked={chooseAllCheckbox}
               onClick={() => setChooseAllCheckbox((prev) => !prev)}
            />
            <p
               onClick={() => setChooseAllCheckbox((prev) => !prev)}
               className="select-all-text">
               Выбрать все
            </p>
         </div>
         <div className="delete-selected-container">
            <CloseOutlined className="delete-icon" />
            <p style={{ color: '#CD3636' }} className="delete-text">
               Удалить выбранные
            </p>
         </div>
      </div>
   );
};

export default SelectAndDelete;
