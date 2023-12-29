import { Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { extraActions, getFilterCatalog } from '@entitles/Extra';

const FilterCategory = ({ data }) => {
   const dispatch = useDispatch();
   const chexBoxValues = useSelector(getFilterCatalog);

   const onChange = (values) => {
      dispatch(extraActions.setSearchCatalog(''));
      dispatch(extraActions.setFilterCatalog(values));
   };

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
