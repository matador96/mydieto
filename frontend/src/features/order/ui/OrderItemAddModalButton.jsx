import React, { useState, useEffect } from 'react';
import { message, Button, Row, Col } from 'antd';
import { Form, Select } from '@shared/ui';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { GetCatalogsList } from '@features/catalog/model/services/GetCatalogsList';
import { AddOrderItem } from './../model/services/AddOrderItem';

const OrderItemAddModalButton = ({ order, onAdd }) => {
   const [isLoading, setIsLoading] = useState(false);
   const orderId = order.id;
   // eslint-disable-next-line no-unused-vars
   const [isLoadingCategories, setIsLoadingCategories] = useState(false);
   const [isDisabledButton, setIsDisabledButton] = useState(true);
   const [categories, setCategories] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();

   const fetchCategories = () => {
      setIsLoadingCategories(true);
      GetCatalogsList({
         page: 1,
         limit: 1000,
         sort: 'priority',
         order: 'asc'
      }).then((res) => {
         setCategories(res.data.filter((e) => e.parentId !== 0));
         setIsLoadingCategories(false);
      });
   };

   const filterOption = (input, option) =>
      (option?.name ?? '').toLowerCase().includes(input.toLowerCase());

   useEffect(() => {
      fetchCategories();
   }, []);

   const onFinish = (values) => {
      addOrderItem(values);
   };

   const onFinishFailed = (errorInfo) => {
      setIsLoading(false);
      console.log('Failed:', errorInfo);
   };

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      onAdd();
      form.setFieldsValue({});
   };

   const addOrderItem = (values) => {
      AddOrderItem({ ...values, quantity: 1, orderId })
         .then(() => {
            message.success('Позиция добавлена');
            handleCancel();
         })
         .catch((e) => message.error(e.message));
   };

   return (
      <>
         <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            Добавить позицию
         </Button>
         <Modal
            open={isModalOpen}
            onOk={null}
            onCancel={handleCancel}
            title={`Создать позицию`}
            footer={null}
            width={600}
            destroyOnClose={true}>
            <Form
               name="basic"
               style={{
                  maxWidth: 720,
                  minWidth: 320
               }}
               initialValues={{}}
               form={form}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               onValuesChange={() => setIsDisabledButton(false)}
               hideRequiredMark
               layout="vertical">
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item name="catalogId" label="Каталог">
                        <Select
                           placeholder="Выберите товар"
                           name="catalogId"
                           showSearch
                           optionFilterProp="children"
                           allowClear
                           filterOption={filterOption}
                           onFocus={() => fetchCategories()}
                           rules={[
                              {
                                 required: true,
                                 message: 'Поле не может быть пустым'
                              }
                           ]}
                           fieldNames={{
                              label: 'name',
                              value: 'id'
                           }}
                           options={categories}
                        />
                     </Form.Item>
                  </Col>
               </Row>

               <Form.Item>
                  <Button
                     type="primary"
                     htmlType="submit"
                     loading={isLoading}
                     disabled={isDisabledButton}>
                     Создать позицию
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default OrderItemAddModalButton;
