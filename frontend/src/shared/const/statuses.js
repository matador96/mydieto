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
      label: 'Сделка',
      value: 'waitDelivery',
      color: '#000000'
   },
   finished: {
      label: 'Выполненные',
      value: 'finished',
      color: 'green'
   }
};

const statusesOfCategories = {
   active: { label: 'Активный', value: 'active', color: 'green' },
   archive: { label: 'Скрыт', value: 'archive', color: 'grey' }
};

const statuseTextOfUsersOrders = {
   seller: {
      onEvaluation: 'Ожидает оценки от покупателя',
      onConfirmation: 'Согласуйте предложенную цену',
      waitDelivery: 'Сделка, ожидаем курьера',
      finished: 'Завершен',
      canceled: 'Отменено'
   },
   admin: {
      onEvaluation: 'Ожидает вашей оценки',
      onConfirmation: 'На согласовании у продавца',
      waitDelivery: 'Сделка, едет курьер',
      finished: 'Завершен',
      canceled: 'Отменено'
   }
};

const statusesOfFaqs = {
   published: {
      label: 'Опубликован',
      value: 'published',
      color: 'green',
      showInMain: true
   },
   archive: { label: 'В архиве', value: 'archive', color: 'grey', showInMain: true }
};

const statusesOfCourses = {
   published: {
      label: 'Опубликован',
      value: 'published',
      color: 'green',
      showInMain: true
   },
   archive: { label: 'В архиве', value: 'archive', color: 'grey', showInMain: true },
   blocked: {
      label: 'Заблокирован',
      value: 'archive',
      color: 'grey',
      showInMain: true
   }
};

export default statuses;

export {
   statusesOfCategories,
   statuseTextOfUsersOrders,
   statusesOfFaqs,
   statusesOfCourses
};
