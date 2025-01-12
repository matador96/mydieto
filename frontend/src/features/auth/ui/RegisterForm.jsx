import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from '@shared/ui';

import { RegisterClient } from '@features/auth/model/services/RegisterClient';

import { AuthByLoginAndPassword } from '@features/auth/model/services/AuthByLoginAndPassword';
import { useDispatch } from 'react-redux';
import { userActions, getUserAuthData } from '@entitles/User';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvatarIcon from '@shared/assets/icons/AvatarIcon';
import { PlusOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import {
   message,
   Row,
   Col,
   DatePicker,
   Select,
   Checkbox,
   Upload,
   Image,
   Flex,
   Modal,
   Alert
} from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { timeZoneList } from '@shared/const/timezone';

const aggreementModal = () => {
   Modal.info({
      title: 'Условия использования',
      width: 800,
      content: (
         <div>
            <p>
               Обязательная регистрация только для лиц старше определенного возраста,
               чтобы обеспечить соответствие содержания сайта законам о детской
               безопасности в Интернете.
            </p>
            <p>
               Подтверждение электронной почты для верификации аккаунта и
               предотвращения создания фальшивых профилей.
            </p>
            <p>
               Запрос на предоставление базовой информации о пользователе, такой как
               имя, возраст, местоположение, чтобы администраторы могли управлять
               сообществом более эффективно и обеспечить безопасность участников.
            </p>
            <p>
               Соглашение об использовании, которое пользователям необходимо
               прочитать и принять перед регистрацией, содержащее правила поведения
               на сайте, а также ответственность за размещаемый контент.
            </p>
            <p>
               Опция выбора уровня доступности информации для других пользователей:
               открытый, закрытый или ограниченный только для определенных категорий
               пользователей.
            </p>
            <p>
               Механизмы обратной связи и поддержки для пользователей, позволяющие им
               сообщать о нарушениях правил или проблемах безопасности.
            </p>
            <p>
               Возможность настройки приватности профиля, чтобы пользователи могли
               управлять своей личной информацией и решать, какие данные видны другим
               участникам.
            </p>
            <p>
               Регулярное обновление паролей и рекомендации по безопасности данных,
               чтобы предотвратить несанкционированный доступ к учетной записи.
            </p>
            <p>Опция двухфакторной аутентификации для усиления защиты аккаунта.</p>
            <p>
               Система модерации контента, чтобы гарантировать, что размещаемый
               материал соответствует принципам диеотологии и не нарушает правила
               сайта.
            </p>
         </div>
      ),
      onOk() {}
   });
};

const getBase64 = (file) =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
   });

const RegisterForm = () => {
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [previewImage, setPreviewImage] = useState('');
   const [image, setImage] = useState(null);
   const auth = useSelector(getUserAuthData);
   const isUserAuthorized = !!auth?.id;
   const userType = auth?.type;

   useEffect(() => {
      if (isUserAuthorized) {
         navigate(`/`);
      }
   }, []);

   const onFinish = (values) => {
      //      setIsLoading(true);

      const formDataCreate = new FormData();

      for (let key in values) {
         formDataCreate.append(key, values[key]);
      }

      if (image) {
         formDataCreate.append('image', image.originFileObj, image.name);
      }

      RegisterClient(formDataCreate)
         .then((res) => {
            console.log(res);
            AuthByLoginAndPassword({
               email: values.email,
               password: values.password
            }).then((res) => {
               dispatch(userActions.loginUser(res));
               message.info(`Добро пожаловать ${res.email}!`);
               navigate(`/`);
               setIsLoading(false);
            });
         })
         .catch((e) => setErrorMessage(e.message))
         .finally(() => {
            setIsLoading(false);
         });
   };

   const onFinishFailed = () => {
      setIsLoading(false);
   };

   const handleChange = async ({ fileList }) => {
      if (fileList.length === 0) {
         return;
      }

      const file = fileList[0];

      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj);
      }

      setPreviewImage(file.url || file.preview);
      setImage(file);
   };

   return (
      <Form
         name="basic"
         style={{
            maxWidth: 720,
            minWidth: 320
         }}
         layout="vertical"
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}>
         <Row gutter={24}>
            <Col span={24}>
               <Form.Item name="image" valuePropName="image">
                  <Flex
                     gap="middle"
                     style={{ margin: '0 0 20px 0' }}
                     justify="center"
                     align="center">
                     <Upload
                        name="image"
                        listType="picture-circle"
                        className="avatar-uploader"
                        onPreview={() => {}}
                        onChange={handleChange}
                        accept="image/png, image/jpeg"
                        onRemove={null}
                        fileList={[]}
                        showUploadList={false}
                        multiple={false}
                        beforeUpload={() => false}
                        maxCount={1}>
                        {image ? (
                           <>
                              <div
                                 className="preview-of-avatar"
                                 style={{
                                    backgroundImage: `url(${previewImage})`
                                 }}></div>

                              <div className="avatar-button-actions">
                                 <Button icon={<EditOutlined />}></Button>
                              </div>
                           </>
                        ) : (
                           <div>
                              <div className="avatar-button-actions">
                                 <Button
                                    icon={
                                       loading ? (
                                          <LoadingOutlined />
                                       ) : (
                                          <PlusOutlined />
                                       )
                                    }></Button>
                              </div>
                              <Flex gap="middle" justify="center" align="center">
                                 <AvatarIcon />
                              </Flex>
                           </div>
                        )}
                     </Upload>
                  </Flex>
               </Form.Item>
            </Col>
         </Row>

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
                  name="birthday"
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
                  name="mobile"
                  rules={[{ required: true, message: 'Поле не может быть пустым' }]}>
                  <MaskedInput
                     prefix="RU"
                     mask="+7 (000) 000-0000"
                     name="mobile"
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
            <Col span={12}>
               <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                     {
                        required: true,
                        message: 'Поле не может быть пустым'
                     }
                  ]}>
                  <Input.Password placeholder="Введите пароль" />
               </Form.Item>
            </Col>{' '}
            <Col span={12}>
               <Form.Item
                  label="Подтвердите пароль"
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                     {
                        required: true,
                        message: 'Поле не может быть пустым'
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject(
                              new Error('Пароль не соответстует!')
                           );
                        }
                     })
                  ]}>
                  <Input.Password placeholder="Введите повторно пароль" />
               </Form.Item>
            </Col>{' '}
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
                                   new Error('Необходимо согласиться с условиями')
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

         {errorMessage && (
            <Col className="gutter-row" span={24} className="stats-card-count-col">
               <Alert
                  message={errorMessage.replace('Error: ', '')}
                  type="error"
                  showIcon
                  style={{ marginBottom: '15px' }}
               />
            </Col>
         )}

         <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
               Зарегистрироваться
            </Button>
         </Form.Item>
      </Form>
   );
};

export default RegisterForm;
