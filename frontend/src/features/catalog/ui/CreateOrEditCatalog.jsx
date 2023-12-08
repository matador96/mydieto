import React, { useState, useEffect } from 'react';
import CatalogForm from './CatalogForm';
import { CreateCatalog } from '../model/services/CreateCatalog';
import { UpdateCatalog } from '../model/services/UpdateCatalog';
import { GetCatalog } from '../model/services/GetCatalog';
import _ from 'lodash';
import { message } from 'antd';

const CreateOrEditCatalog = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({ unit: 'kg' });
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetCatalog(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const catalogId = initialValues.id;

         const mergedObj = { ...initialValues, ...values };
         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         const formData = new FormData();

         for (let key in updatedFields) {
            if (key === 'image') {
               formData.append(
                  key,
                  updatedFields[key][0].originFileObj,
                  updatedFields[key][0].name
               );
            } else {
               if (updatedFields[key]) {
                  formData.append(key, updatedFields[key]);
               }
            }
         }

         await UpdateCatalog(formData, catalogId)
            .then(() => {
               callbackOnSuccess();
               message.success('Каталог изменен');
            })
            .catch(() => message.error('Возникла ошибка при сохранении'))
            .finally(() => setLoading(false));

         return;
      }

      const formDataCreate = new FormData();

      for (let key in values) {
         if (key === 'image') {
            formDataCreate.append(
               key,
               values[key][0].originFileObj,
               values[key][0].name
            );
         } else if (values[key]) {
            formDataCreate.append(key, values[key]);
         }
      }

      await CreateCatalog(formDataCreate).then(() => {
         setLoading(false);
         callbackOnSuccess();
         message.success('Каталог создан');
      });
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <CatalogForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditCatalog;
