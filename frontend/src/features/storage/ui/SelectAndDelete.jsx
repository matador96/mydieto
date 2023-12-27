import React from 'react';
import { Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const SelectAndDelete = ({ isChoosedAll, addAll, onClickDeleteChoosed }) => {
   return (
      <div className="select-and-delete-container">
         <div className="select-all-container">
            <div onClick={addAll} style={{ gap: '20px' }}>
               <Checkbox checked={isChoosedAll} />
               <span className="select-all-text" style={{ marginLeft: '10px' }}>
                  Выбрать все
               </span>
            </div>
         </div>
         <div className="delete-selected-container" onClick={onClickDeleteChoosed}>
            <CloseOutlined className="delete-icon" />
            <p style={{ color: '#CD3636' }} className="delete-text">
               Удалить выбранные
            </p>
         </div>
      </div>
   );
};

export default SelectAndDelete;
