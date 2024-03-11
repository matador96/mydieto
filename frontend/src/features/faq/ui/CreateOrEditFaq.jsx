import React, { useState, useEffect } from 'react';
import FaqForm from './FaqForm';
import { CreateFaq } from '../model/services/CreateFaq';
import { UpdateFaq } from '../model/services/UpdateFaq';
import { GetFaq } from '../model/services/GetFaq';
import _ from 'lodash';

import { message } from 'antd';

const CreateOrEditFaq = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({});
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetFaq(id).then((res) => {
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

         await UpdateFaq(updatedFields, id)
            .then(() => {
               callbackOnSuccess();
               message.success('Faq изменен');
            })
            .catch((e) =>
               message.error(e?.message || 'Возникла ошибка при сохранении')
            )
            .finally(() => setLoading(false));

         return;
      }

      await CreateFaq(values)
         .then(() => {
            message.success('Faq создан');
            callbackOnSuccess();
         })
         .catch(() => message.error('Faq не создан, возникла ошибка'))
         .finally(() => setLoading(false));
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <FaqForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditFaq;
