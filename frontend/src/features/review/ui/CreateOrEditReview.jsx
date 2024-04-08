import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import { CreateReview } from '../model/services/CreateReview';
import { UpdateReview } from '../model/services/UpdateReview';
import { GetReview } from '../model/services/GetReview';
import _ from 'lodash';

import { message } from 'antd';

const CreateOrEditReview = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({});
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetReview(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });

      return () => {
         setLoadForm(false);
      };
   }, [id]);

   const onSuccess = async (v, setLoading) => {
      setLoading(true);
      let values = { ...v };

      if (isEditForm) {
         const id = initialValues.id;
         const mergedObj = { ...initialValues, ...values };

         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         await UpdateReview(updatedFields, id)
            .then(() => {
               callbackOnSuccess();
               message.success('Отзыв изменен');
            })
            .catch((e) =>
               message.error(e?.message || 'Возникла ошибка при сохранении')
            )
            .finally(() => setLoading(false));

         return;
      }

      await CreateReview(values)
         .then(() => {
            message.success('Отзыв создан');
            callbackOnSuccess();
         })
         .catch(() => message.error('Отзыв не создан, возникла ошибка'))
         .finally(() => setLoading(false));
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <ReviewForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditReview;
