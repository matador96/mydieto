import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Tooltip, Card, Row, Col, Avatar, Divider } from 'antd';
import { Button, VerticalSpace } from '@shared/ui';
import { GetCategoriesListByParentId } from '../model/services/GetCategoriesListByParentId';
import { EditOutlined, SettingOutlined, EllipsisOutlined } from '@ant-design/icons';
import ModalCatalogForm from './ModalCatalogForm';
import Pagination, { initialPaginationSettings } from '@widgets/Pagination';
import ModalButtonCatalogCreate from './ModalButtonCatalogCreate';
import CanDo from '@shared/lib/CanDo';
import { statusesOfCategories } from '@shared/const/statuses';

const CardListCatalogs = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = () => {
      setIsLoading(true);
      GetCategoriesListByParentId(0, {
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then((res) => {
         setIsLoading(false);
         const tableData = res.data.filter((item) => item.id !== 0);
         setData(tableData);
      });
   };

   return (
      <>
         <Row gutter={16}>
            <Divider orientation="left">Платы</Divider>
            {data.map((item) => (
               <Col span={6} key={`${item.id}-${item.name}`}>
                  <Card
                     loading={isLoading}
                     cover={
                        <img
                           alt="example"
                           src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                     }
                     hoverable
                     actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />
                     ]}>
                     <Card.Meta title={item.name} />
                  </Card>
               </Col>
            ))}
         </Row>
         <VerticalSpace />
      </>
   );
};

export default CardListCatalogs;
