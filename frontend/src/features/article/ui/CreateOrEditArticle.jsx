import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import { CreateArticle } from '../model/services/CreateArticle';
import { UpdateArticle } from '../model/services/UpdateArticle';
import { GetArticle } from '../model/services/GetArticle';
import _ from 'lodash';
import { message } from 'antd';

const CreateOrEditArticle = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({ unit: 'kg' });
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetArticle(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const articleId = initialValues.id;

         const mergedObj = { ...initialValues, ...values };
         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         const formData = new FormData();

         for (let key in updatedFields) {
            if (key === 'image') {
               if (values[key]?.[0]) {
                  formData.append(
                     key,
                     updatedFields[key][0].originFileObj,
                     updatedFields[key][0].name
                  );
               }
            } else {
               if (updatedFields[key]) {
                  formData.append(key, updatedFields[key]);
               }
            }
         }

         await UpdateArticle(formData, articleId)
            .then(() => {
               callbackOnSuccess();
               message.success('Статья изменена');
            })
            .catch(() => message.error('Возникла ошибка при сохранении'))
            .finally(() => setLoading(false));

         return;
      }

      const formDataCreate = new FormData();

      for (let key in values) {
         if (key === 'image') {
            if (values[key]?.[0]) {
               formDataCreate.append(
                  key,
                  values[key][0].originFileObj,
                  values[key][0].name
               );
            }
         } else if (values[key]) {
            formDataCreate.append(key, values[key]);
         }
      }

      await CreateArticle(formDataCreate).then(() => {
         setLoading(false);
         callbackOnSuccess();
         message.success('Статья создана');
      });
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <ArticleForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditArticle;
