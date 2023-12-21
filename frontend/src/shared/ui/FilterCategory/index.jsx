import { Checkbox } from 'antd';
import { useState } from 'react';
const categories = [
   { name: 'Материнские платы' },
   { name: 'Процессоры' },
   { name: 'Оперативная память (RAM)' },
   { name: 'Другие комплектующие ПК' },
   { name: 'Платы от сотовых телефонов и планшетов' },

   { name: 'Срезка и лом' }
];

const CategoriesList = () => {
   const [checkedList, setCheckedList] = useState(
      categories.filter((cat) => cat.checked).map((cat) => cat.name)
   );

   const onChange = (checkedValues) => {
      setCheckedList(checkedValues);
   };

   return (
      <div className="categories-filter-container">
         <div className="title">Фильтры категорий</div>
         <Checkbox.Group
            hover={false}
            className="checkbox-group"
            options={categories.map((cat) => ({ label: cat.name, value: cat.name }))}
            value={checkedList}
            onChange={onChange}
         />
      </div>
   );
};

export default CategoriesList;
