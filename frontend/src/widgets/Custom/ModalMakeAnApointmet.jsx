import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';
import { GetInstructorById } from '@features/list-instructor/model/GetInstructorById';

import { useNavigate } from 'react-router-dom';
import { Row, Col, DatePicker, Select, Checkbox, Modal, Divider } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { timeZoneList } from '@shared/const/timezone';
import { aggreementModal } from '@widgets/Custom/methods/AgreementsModal';
const { TextArea } = Input;

const ModalMakeAnApointmet = ({ closeModal = () => {}, button, instructorId }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [instructor, setInstructor] = useState(null);

   useEffect(() => {
      if (instructorId) {
         setIsLoading(true);
         GetInstructorById(instructorId)
            .then((data) => {
               setInstructor(data);
            })
            .finally(() => {
               setIsLoading(false);
            });
      }
   }, [instructorId]);

   const onFinish = (values) => {
      setIsLoading(true);
   };

   const onFinishFailed = () => {
      setIsLoading(false);
   };

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleOk = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      closeModal();
   };

   const imageStyle = instructor?.imageUrl
      ? { backgroundImage: `url(${instructor?.imageUrl})` }
      : {};

   return (
      <>
         <div onClick={showModal} style={{ width: '100%' }}>
            {button}
         </div>

         <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ top: 15 }}
            title={
               instructor ? (
                  <div
                     className="course-card_author"
                     style={{ marginBottom: '12px' }}>
                     <div
                        className="course-card_author-avatar"
                        style={{ ...imageStyle }}></div>
                     <div>
                        <div className="course-card_author-name">
                           {instructor.firstName} {instructor.lastName}
                        </div>
                        {instructor.posts && (
                           <div className="course-card_author-post">
                              {instructor.posts.join(', ')}
                           </div>
                        )}
                     </div>
                  </div>
               ) : null
            }
            footer={null}
            width={720}
            destroyOnClose={true}>
            <Form
               name="basic"
               style={{
                  maxWidth: 720,
                  minWidth: 320
               }}
               layout="vertical"
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}>
               <div className="title-in-modal">Заявка</div>

               <Row gutter={24}>
                  <Col span={12}>
                     <Form.Item
                        label="Имя"
                        name="firstName"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}>
                        <Input placeholder="Введите имя" />
                     </Form.Item>
                  </Col>{' '}
                  <Col span={12}>
                     <Form.Item
                        label="Фамилия"
                        name="lastName"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}>
                        <Input placeholder="Введите фамилию" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={12}>
                     <Form.Item
                        label="Дата рождения"
                        name="dateOfBirth"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}>
                        <DatePicker
                           placeholder="Введите дату рождения"
                           style={{ width: '100%' }}
                        />
                     </Form.Item>
                  </Col>{' '}
                  <Col span={12}>
                     <Form.Item
                        label="Город/часовой пояс"
                        name="timezone"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}>
                        <Select
                           options={timeZoneList}
                           placeholder="Выберите город/часовой пояс"
                        />
                     </Form.Item>
                  </Col>{' '}
               </Row>
               <Row gutter={24}>
                  <Col span={12}>
                     <Form.Item
                        label="Номер телефона"
                        name="phone"
                        rules={[
                           { required: true, message: 'Поле не может быть пустым' }
                        ]}>
                        <MaskedInput
                           prefix="RU"
                           mask="+7 (000) 000-0000"
                           name="phone"
                           placeholder="Введите номер телефона"
                        />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                           {
                              required: true,
                              message: 'Поле не может быть пустым'
                           }
                        ]}>
                        <Input placeholder="Введите почту" />
                     </Form.Item>{' '}
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={24}>
                     <Form.Item
                        name="description"
                        label="Ваш запрос"
                        rules={[
                           {
                              required: true,
                              message: 'Заполните поле'
                           }
                        ]}>
                        <TextArea
                           rows={4}
                           placeholder="Максимум 400 символов"
                           maxLength={400}
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={19}>
                     <Form.Item label="Промокод" name="promocode">
                        <Input placeholder="Введите промокод" />
                     </Form.Item>{' '}
                  </Col>
                  <Col span={5}>
                     <Form.Item label="   ">
                        <Button type="primary">Применить</Button>
                     </Form.Item>{' '}
                  </Col>
               </Row>
               <Row gutter={24}>
                  {' '}
                  <Col span={24}>
                     <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                           {
                              validator: (_, value) =>
                                 value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                         new Error(
                                            'Необходимо согласиться с условиями'
                                         )
                                      )
                           }
                        ]}>
                        <Checkbox>
                           Согласен с{' '}
                           <a
                              href=""
                              onClick={(e) => {
                                 e.preventDefault();
                                 aggreementModal();
                              }}>
                              условиями
                           </a>
                        </Checkbox>
                     </Form.Item>
                  </Col>{' '}
               </Row>
               <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                     Отправить заявку
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};

export default ModalMakeAnApointmet;
