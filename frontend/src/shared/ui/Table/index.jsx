import { Button, Input, Space, Radio, Tag, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

export const onTableChange = (
   // eslint-disable-next-line no-unused-vars
   pagination = null,
   filtersTable,
   sorterTable,
   prevTableParams,
   fetchDataCallback
) => {
   let sorterParamsObj = {};

   if (sorterTable?.columnKey && sorterTable?.order) {
      sorterParamsObj.sort = sorterTable.columnKey;
      sorterParamsObj.order = sorterTable.order.replace('end', '');
   }

   // let filterParamsObj = {};

   // for (let key in Object.keys(filtersTable)) {
   //    let dataIndex = Object.keys(filtersTable)[key];
   //    let value = filtersTable[dataIndex];

   //    if (value !== null) {
   //       filterParamsObj[dataIndex] = filtersTable[dataIndex];
   //    }
   // }

   const newParams = {
      ...prevTableParams,
      sorter: { ...sorterParamsObj }
      // filters: { ...filterParamsObj },
   };

   fetchDataCallback(newParams);
};

export const onSearchFilterTable = (
   searchObj,
   prevTableParams,
   fetchDataCallback
) => {
   if (Object.values(searchObj).length === 0) {
      const newParams = {
         ...prevTableParams,
         filters: {}
      };
      fetchDataCallback(newParams);
      return;
   }

   let modifiedSearchObj = {};

   for (let key in searchObj) {
      let searchName = key;
      let searchValue = searchObj[key];
      modifiedSearchObj[searchName] = searchValue;
   }

   const newParams = {
      ...prevTableParams,
      filters: { ...modifiedSearchObj }
   };

   return fetchDataCallback(newParams);
};

const getConstColumnSearchFilterProps = ({
   options,
   dataIndex,
   handleSearch
   // type = 'text'
}) => ({
   filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      // confirm,
      clearFilters,
      close
   }) => {
      const onSearch = () => {
         if (!selectedKeys[0]) {
            return;
         }

         handleSearch({ [dataIndex]: selectedKeys[0] });
         close();
      };

      const onReset = () => {
         close();
         handleSearch({});
         clearFilters();
      };

      return (
         <div
            style={{
               padding: 15,
               minWidth: 200,
               maxWidth: 300
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Select
               showSearch
               optionFilterProp="children"
               style={{
                  width: '100%',
                  marginBottom: 8,
                  display: 'block'
               }}
               onChange={(e) => setSelectedKeys(e ? [e] : [])}
               value={selectedKeys[0]}
               filterOption={(input, option) =>
                  (option?.city_district ?? '')
                     .toLowerCase()
                     .includes(input.toLowerCase())
               }
               placeholder="Выберите район"
               rules={[
                  {
                     required: true,
                     message: 'Поле не может быть пустым '
                  }
               ]}
               fieldNames={{
                  label: 'city_district',
                  value: 'id'
               }}
               options={options}
            />

            <Space>
               <Button type="primary" onClick={onSearch} disabled={!selectedKeys[0]}>
                  Сохранить
               </Button>
               <Button onClick={onReset}>Сбросить</Button>
               <Button
                  type="link"
                  onClick={() => {
                     close();
                  }}
               >
                  Закрыть
               </Button>
            </Space>
         </div>
      );
   },

   filterIcon: (filtered) => (
      <FilterOutlined
         style={{
            color: filtered ? '#1677ff' : undefined
         }}
      />
   )
});

const getStatusColumnFilterProps = ({
   options,
   dataIndex,
   handleSearch
   // type = 'text'
}) => ({
   filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      // confirm,
      clearFilters,
      close
   }) => {
      const onSearch = () => {
         if (!selectedKeys[0]) {
            return;
         }

         handleSearch({ [dataIndex]: selectedKeys[0] });
         close();
      };

      const onReset = () => {
         close();
         handleSearch({});
         clearFilters();
      };

      return (
         <div
            style={{
               padding: 15,
               minWidth: 200,
               maxWidth: 300
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Radio.Group
               style={{
                  marginBottom: 8,
                  display: 'block'
               }}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               value={selectedKeys[0]}
            >
               {options.map((item) => (
                  <Radio
                     value={item.value}
                     key={item.value}
                     style={{ padding: '3px' }}
                  >
                     <Tag color={item.color}>{item.label}</Tag>
                  </Radio>
               ))}
            </Radio.Group>

            <Space>
               <Button type="primary" onClick={onSearch} disabled={!selectedKeys[0]}>
                  Сохранить
               </Button>
               <Button onClick={onReset}>Сбросить</Button>
               <Button
                  type="link"
                  onClick={() => {
                     close();
                  }}
               >
                  Закрыть
               </Button>
            </Space>
         </div>
      );
   },

   filterIcon: (filtered) => (
      <FilterOutlined
         style={{
            color: filtered ? '#1677ff' : undefined
         }}
      />
   )
});

const getColumnSearchProps = ({ dataIndex, handleSearch, type = 'text' }) => ({
   filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      // confirm,
      clearFilters,
      close
   }) => {
      const onSearch = () => {
         if (!selectedKeys[0]) {
            return;
         }

         handleSearch({ [dataIndex]: selectedKeys[0] });
         close();
      };

      const onReset = () => {
         close();
         handleSearch({});
         clearFilters();
      };

      return (
         <div
            style={{
               padding: 15,
               minWidth: 300
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Input
               placeholder={`Поиск по ${dataIndex}`}
               value={selectedKeys[0]}
               type={type}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               onPressEnter={onSearch}
               style={{
                  marginBottom: 8,
                  display: 'block'
               }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={onSearch}
                  icon={<SearchOutlined />}
                  disabled={!selectedKeys[0]}
               >
                  Поиск
               </Button>
               <Button onClick={onReset}>Сбросить</Button>
               <Button
                  type="link"
                  onClick={() => {
                     close();
                  }}
               >
                  Закрыть
               </Button>
            </Space>
         </div>
      );
   },

   filterIcon: (filtered) => (
      <SearchOutlined
         style={{
            color: filtered ? '#1677ff' : undefined
         }}
      />
   )
});

export {
   getColumnSearchProps,
   getStatusColumnFilterProps,
   getConstColumnSearchFilterProps
};
