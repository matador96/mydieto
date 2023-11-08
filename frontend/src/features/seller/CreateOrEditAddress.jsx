import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import { CreateMyAddress } from './model/CreateMyAddress';
import { UpdateMyAddress } from './model/UpdateMyAddress';
import { GetAddress } from './model/GetAddress';
import _ from 'lodash';

import { message } from 'antd';

const CreateOrEditAddress = ({ id = null, callbackOnSuccess = () => {} }) => {
   const isEditForm = !!id;
   const [initialValues, setIntialValues] = useState({});
   const [loadForm, setLoadForm] = useState(false);

   useEffect(() => {
      if (!isEditForm) {
         return;
      }

      GetAddress(id).then((res) => {
         setIntialValues({ ...initialValues, ...res });
         setLoadForm(true);
      });

      return () => {
         setLoadForm(false);
      };
   }, [id]);

   const onSuccess = async (values, setLoading) => {
      setLoading(true);

      if (isEditForm) {
         const addressId = initialValues.id;
         const mergedObj = { ...initialValues, ...values };

         const updatedFields = _.pickBy(
            mergedObj,
            (v, k) => !_.isEqual(initialValues[k], v)
         );

         await UpdateMyAddress(updatedFields, addressId)
            .then(() => {
               callbackOnSuccess();
               message.success('Адрес изменен');
            })
            .catch(() => message.error('Возникла ошибка при сохранении'))
            .finally(() => setLoading(false));

         return;
      }

      await CreateMyAddress(values)
         .then(() => {
            message.success('Адрес создан');
            callbackOnSuccess();
         })
         .catch(() => message.error('Адрес не создан, возникла ошибка'))
         .finally(() => setLoading(false));
   };

   if (!loadForm && isEditForm) {
      // Чтобы initialValues прогрузились при первом рендере, если это Редактируемая форма
      return <></>;
   }

   return (
      <AddressForm
         initialValues={initialValues}
         isEditForm={isEditForm}
         onSuccess={onSuccess}
      />
   );
};

export default CreateOrEditAddress;
