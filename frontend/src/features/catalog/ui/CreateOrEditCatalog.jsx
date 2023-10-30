import React, { useState, useEffect } from 'react';
import CatalogForm from './CatalogForm';
import { CreateCategory } from '../model/services/CreateCategory';
import { UpdateCategory } from '../model/services/UpdateCategory';
import { GetCategory } from '../model/services/GetCategory';
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

      GetCategory(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const categoryId = initialValues.id;

         const mergedObj = { ...initialValues, ...values };
         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         await UpdateCategory(updatedFields, categoryId)
            .then(() => {
               callbackOnSuccess();
               message.success('Категория изменена');
            })
            .catch(() => message.error('Возникла ошибка при сохранении'))
            .finally(() => setLoading(false));

         return;
      }

      await CreateCategory(values).then(() => {
         setLoading(false);
         callbackOnSuccess();
         message.success('Категория создана');
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
