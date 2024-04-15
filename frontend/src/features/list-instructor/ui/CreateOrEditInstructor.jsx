import React, { useState, useEffect } from 'react';
import InstructorForm from './InstructorForm';
import { CreateInstructor } from '../model/CreateInstructor';
import { UpdateInstructor } from '../model/UpdateInstructor';
import { GetInstructorById } from '../model/GetInstructorById';

import _ from 'lodash';

import { message } from 'antd';

const CreateOrEditInstructor = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({});
   const [loadForm, setLoadForm] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetInstructorById(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });

      return () => {
         setErrorMessage('');
         setLoadForm(false);
      };
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const id = initialValues.id;
         // const mergedObj = { ...initialValues, ...values };

         // const updatedFields = _.pickBy(
         //    mergedObj,
         //    (v, k) => !_.isEqual(initialValues[k], v)
         // );

         await UpdateInstructor(values, id)
            .then(() => {
               callbackOnSuccess();
               message.success('Эксперт изменен');
            })
            .catch((e) => {
               setErrorMessage(e?.message || 'Возникла ошибка при сохранении');
               message.error(e?.message || 'Возникла ошибка при сохранении');
            })
            .finally(() => setLoading(false));

         return;
      }

      await CreateInstructor(values)
         .then(() => {
            message.success('Эксперт создан');
            callbackOnSuccess();
         })
         .catch((e) => {
            setErrorMessage(e?.message || 'Эксперт не создан, возникла ошибка');
            message.error(e?.message || 'Эксперт не создан, возникла ошибка');
         })
         .finally(() => setLoading(false));
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <InstructorForm
         errorMessage={errorMessage}
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditInstructor;
