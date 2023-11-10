import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { getAddressSuggestions } from '@shared/api/all/address';

import _ from 'lodash';

const SelectAddress = (props) => {
   const [addresses, setAddresses] = useState([]);
   const [searchStr, setSearchStr] = useState('');

   const fetchAddresses = (str) => {
      getAddressSuggestions({
         count: 10,
         address: str
      }).then((res) => {
         const modifiedData = res.json.data.map((item) => ({
            ...item,
            label: item,
            value: item
         }));
         setAddresses(modifiedData);
      });
   };

   const debouncedSetSearch = _.debounce(setSearchStr, 500);

   useEffect(() => {
      fetchAddresses(searchStr);
   }, [searchStr]);

   return (
      <Select
         {...props}
         showSearch
         placeholder="Введите адрес"
         onSearch={(value) => debouncedSetSearch(value)}
         filterOption={false}
         options={addresses}
      />
   );
};
export default SelectAddress;
