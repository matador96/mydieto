import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import { CreateCourse } from '../model/services/CreateCourse';
import { UpdateCourse } from '../model/services/UpdateCourse';
import { GetCourse } from '../model/services/GetCourse';
import _ from 'lodash';
import { message } from 'antd';

const CreateOrEditCourse = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({ unit: 'kg' });
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetCourse(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const mergedObj = { ...initialValues, ...values };
         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         await UpdateCourse({ ...updatedFields }, id)
            .then(() => {
               callbackOnSuccess();
               message.success('Курс изменен');
            })
            .catch(() => message.error('Возникла ошибка при сохранении'))
            .finally(() => setLoading(false));

         return;
      }

      await CreateCourse({ ...values }).then(() => {
         setLoading(false);
         callbackOnSuccess();
         message.success('Курс создан');
      });
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <CourseForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditCourse;
