const statuses = {
   onEvaluation: {
      label: 'Оценочная стоимость',
      value: 'onEvaluation',
      color: '#20B2AA'
   },
   canceled: {
      label: 'Отмененные',
      value: 'canceled',
      color: '#FA8072'
   },
   onConfirmation: {
      label: 'Подтверждение стоимости',
      value: 'onConfirmation',
      color: 'grey'
   },
   waitDelivery: {
      label: 'Ожидают курьера',
      value: 'waitDelivery',
      color: '#000000'
   },
   finished: {
      label: 'Выполненные',
      value: 'finished',
      color: '#6495ED'
   }
};

const statusesOfCategories = {
   active: { label: 'Активный', value: 'active', color: 'green' },
   archive: { label: 'Скрыт', value: 'archive', color: 'grey' }
};

export default statuses;

export { statusesOfCategories };
