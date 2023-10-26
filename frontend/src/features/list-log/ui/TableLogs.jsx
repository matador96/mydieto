import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Tooltip, Select } from 'antd';
import { GetLogList } from './../model/GetLogList';
import { GetLogDates } from './../model/GetLogDates';
import { Descriptions } from 'antd';
import { Button } from '@shared/ui';
import { InfoCircleOutlined } from '@ant-design/icons';
import CanDo from '@shared/lib/CanDo';
import { Collapse, Divider } from 'antd';

const TableLogs = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);
   const [dates, setDates] = useState([]);

   useEffect(() => {
      fetchData();

      fetchDatesList();
   }, []);

   const columns = [
      {
         title: 'Действие',
         dataIndex: 'title',
         key: 'title'
      },
      {
         title: 'Описание',
         dataIndex: 'description',
         key: 'description'
      },
      {
         title: 'Подробно',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <CanDo permission="can_view_userlogs">
                  <Tooltip placement="top" title={'Подробно'}>
                     <Button onClick={() => modalLoad(record)}>
                        <InfoCircleOutlined />
                     </Button>
                  </Tooltip>
               </CanDo>
            </Space>
         )
      }
   ];
   const onChangeDate = (value) => {
      fetchData({ date: value });
   };

   const fetchDatesList = () => {
      GetLogDates().then((res) => {
         let values = [];
         res.data.map((e) => {
            values.push({ value: e, label: e });
         });
         setDates(values);
      });
   };

   const fetchData = (params = {}) => {
      setIsLoading(true);
      GetLogList(params).then((res) => {
         setData(res.data);
         setIsLoading(false);
      });
   };

   const modalLoad = (record) => {
      const info = record.extra;
      let dataFromRequest = info?.dataFromRequest || {};
      let result = info?.result || info;

      const resultArr = Object.keys(result).map((e) => ({
         label: e,
         value: result[e]
      }));

      const reqArr = Object.keys(dataFromRequest).map((e) => ({
         label: e,
         value: dataFromRequest[e]
      }));

      Modal.info({
         title: `${record.title}`,
         maskClosable: true,
         width: '90%',
         content: (
            <div>
               <Descriptions className="log-description">
                  <Descriptions.Item key={`Действие`} label="Действие">
                     Изменения внесены пользователем: login: {record.user.login}, id:
                     {record.user.id}
                  </Descriptions.Item>
                  <Descriptions.Item key={`Описание`} label="Описание">
                     {record.description}
                  </Descriptions.Item>

                  <Descriptions.Item key={`Время`} label="Время">
                     {record.timestamp}
                  </Descriptions.Item>
               </Descriptions>

               {/* <p> Дополнительные поля: {JSON.stringify(info?.extra)}</p> */}

               <Divider orientation="left">Отправленное пользователем</Divider>
               <Collapse
                  items={[
                     {
                        key: '1',
                        label: 'Раскрыть отправленные поля',
                        children: (
                           <Descriptions bordered>
                              {reqArr.map((item) => (
                                 <Descriptions.Item
                                    key={`${item.label} ${item.value}`}
                                    label={item.label}
                                 >
                                    {typeof item.value === 'object'
                                       ? JSON.stringify(item.value)
                                       : item.value}
                                 </Descriptions.Item>
                              ))}
                           </Descriptions>
                        )
                     }
                  ]}
               />
               <Divider orientation="left">Результат</Divider>
               <Collapse
                  size="small"
                  items={[
                     {
                        key: '1',
                        label: 'Раскрыть результат выполнения',
                        children: (
                           <Descriptions bordered>
                              {resultArr.map((item) => (
                                 <Descriptions.Item
                                    key={`${item.label} ${item.value}`}
                                    label={item.label}
                                 >
                                    {typeof item.value === 'object'
                                       ? JSON.stringify(item.value)
                                       : item.value}
                                 </Descriptions.Item>
                              ))}
                           </Descriptions>
                        )
                     }
                  ]}
               />
            </div>
         ),
         onOk() {},
         okText: 'Закрыть'
      });
   };

   return (
      <>
         <Select
            style={{
               width: '200px'
            }}
            defaultValue="Сегодня"
            placeholder="Выберите дату"
            rules={[
               {
                  required: true,
                  message: 'Поле не может быть пустым '
               }
            ]}
            onChange={onChangeDate}
            options={dates}
         />
         <Table
            style={{ width: '100%' }}
            columns={[...columns]}
            dataSource={data}
            pagination={false}
            rowKey="id"
            loading={isLoading}
         />
      </>
   );
};

export default TableLogs;
