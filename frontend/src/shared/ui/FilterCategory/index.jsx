import { Checkbox } from 'antd';

const FilterCategory = ({ data }) => {
   const chexBoxValues = [];

   const onChange = (values) => {};

   return (
      <div className="categories-filter-container">
         <div className="title">Фильтры</div>
         <div className="categories-container">
            <Checkbox.Group value={chexBoxValues} onChange={onChange}>
               {data.map((category) => (
                  <div key={category.name} className="category-item">
                     <Checkbox value={category.id}>{category.name}</Checkbox>
                  </div>
               ))}
            </Checkbox.Group>
         </div>
      </div>
   );
};

export default FilterCategory;
