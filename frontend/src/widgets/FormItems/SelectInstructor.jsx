import { Select } from 'antd';
import { useState, useEffect } from 'react';
import { GetInstructorList } from '@features/list-instructor/model/GetInstructorList';
import { GetInstructorById } from '@features/list-instructor/model/GetInstructorById';

const generateSelectLabelString = (user) => {
   return `${user?.firstName} ${user?.lastName}`;
};

const SelectInstructor = (props) => {
   const [users, setUsers] = useState([]);
   const { setField, disabled = false, value } = props;
   const [searchParams, setSearchParams] = useState({});

   useEffect(() => {
      fetchData(searchParams);
   }, [searchParams]);

   useEffect(() => {
      if (value) {
         GetInstructorById(value).then((res) => {
            setUsers(
               [res].map((item) => ({
                  ...item,
                  selectLabel: generateSelectLabelString(item)
               }))
            );
         });
      }
   }, [value]);

   const fetchData = (searchParams = {}) => {
      GetInstructorList({
         page: 1,
         limit: 10,
         sort: 'id',
         order: 'desc',
         op: 'or',
         ...searchParams
      }).then((res) => {
         const modifiedData = res.data.map((item) => ({
            ...item,
            selectLabel: generateSelectLabelString(item)
         }));
         setUsers(modifiedData);
      });
   };

   const onFocus = () => {
      fetchData(searchParams);
   };

   const onChange = (value) => {
      setField(value);
   };

   const onSearch = (value) => {
      setSearchParams(value ? { firstName: value, lastName: value } : {});
   };

   return (
      <Select
         {...props}
         disabled={disabled}
         placeholder="Выберите"
         optionFilterProp="children"
         onChange={onChange}
         onFocus={onFocus}
         onSearch={onSearch}
         filterOption={false}
         fieldNames={{
            value: 'id',
            label: 'selectLabel'
         }}
         options={users}
      />
   );
};
export default SelectInstructor;
