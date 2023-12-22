import { Checkbox } from 'antd';
import { useState } from 'react';

const CategoriesList = ({ data }) => {
   return (
      <div className="categories-filter-container">
         <div className="title">Фильтры категорий</div>
         <div className="categories-container">
            <Checkbox.Group value={data} >
               {data.map((category) => (
                  <div key={category.name} className="category-item">
                     <Checkbox value={category.name}>{category.name}</Checkbox>
                  </div>
               ))}
            </Checkbox.Group>
         </div>
      </div>
   );
};

export default CategoriesList;
