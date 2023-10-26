const statuses = {
   blocked: {
      label: 'Заблокирован',
      value: 'blocked',
      color: 'red',
      badgeStatus: 'error'
   },
   active: {
      label: 'Активный',
      value: 'active',
      color: 'green',
      badgeStatus: 'success'
   },
   pending: {
      label: 'Не активирован',
      value: 'pending',
      color: 'grey',
      badgeStatus: 'default'
   }
};

const statusesOfAcceptances = {
   blocked: {
      label: 'Заблокирован',
      value: 'blocked',
      color: 'red',
      badgeStatus: 'error'
   },
   active: {
      label: 'Активный',
      value: 'active',
      color: 'green',

      badgeStatus: 'success'
   },
   pending: {
      label: 'Не активирован',
      value: 'pending',
      color: 'grey',
      badgeStatus: 'default'
   }
};

const statusesOfSellers = {
   active: {
      label: 'Активный',
      value: 'active',
      color: '#20B2AA',
      badgeStatus: 'success'
   },
   archive: {
      label: 'Отключен',
      value: 'archive',
      color: '#A9A9A9',
      badgeStatus: 'error'
   }
};

const statusesOfRatings = {
   active: {
      label: 'Активный',
      value: 'active',
      color: 'green',
      badgeStatus: 'success'
   },
   archive: {
      label: 'Отключен',
      value: 'archive',
      color: 'red',
      badgeStatus: 'error'
   }
};

const statusesOfCategories = {
   active: { label: 'Активный', value: 'active', color: 'green' },
   archive: { label: 'Скрыт', value: 'archive', color: 'grey' }
};

const statusesOfAuctions = {
   active: { label: 'Активный', value: 'active', color: 'green' },
   pending: { label: 'Торг запущен', value: 'pending', color: 'purple' },
   finished: { label: 'Завершен', value: 'finished', color: 'blue' },
   archive: { label: 'В архиве', value: 'archive', color: 'grey' }
};

const statusesOfLeads = {
   pending: {
      label: 'Не обработано',
      value: 'pending',
      color: '#A9A9A9',
      progress: 5,
      stages: ['pending', 'active', 'inwork', 'finished']
   },
   blocked: {
      label: 'Заблокирован',
      value: 'blocked',
      color: '#FA8072',
      progress: 100,
      stages: ['pending', 'blocked']
   },
   active: {
      label: 'Активный',
      value: 'active',
      color: '#20B2AA',
      progress: 30,
      level: 1,
      stages: ['pending', 'active', 'inwork', 'finished']
   },
   inwork: {
      label: 'В работе',
      value: 'inwork',
      color: '#000000',
      progress: 70,
      level: 4,
      stages: ['pending', 'active', 'inwork', 'finished']
   },
   finished: {
      label: 'Завершен',
      value: 'finished',
      color: '#6495ED',
      progress: 100,
      level: 5,
      stages: ['pending', 'active', 'inwork', 'finished']
   },
   inauction: {
      label: 'В торге',
      value: 'inauction',
      color: '#FF8C00',
      progress: 40,
      level: 2,
      stages: [
         'pending',
         'active',
         'inauction',
         'wininauction',
         'inwork',
         'finished'
      ]
   },
   wininauction: {
      label: 'Выигран в торгах',
      value: 'wininauction',
      color: '#8B008B',
      progress: 3,
      stages: [
         'pending',
         'active',
         'inauction',
         'wininauction',
         'inwork',
         'finished'
      ]
   }
};

const statusesOfDrivers = {
   pending: {
      label: 'Не активирован',
      value: 'pending',
      color: 'grey',
      badgeStatus: 'default'
   },
   active: {
      label: 'Активный',
      value: 'active',
      color: 'green',
      badgeStatus: 'success'
   },
   inwork: {
      label: 'В работе',
      value: 'inwork',
      color: 'grey',
      badgeStatus: 'processing'
   },
   blocked: {
      label: 'Заблокирован',
      value: 'blocked',
      color: 'red',
      badgeStatus: 'error'
   }
};

const statusesOfFaqs = {
   published: { label: 'Опубликован', value: 'published', color: 'green' },
   archive: { label: 'В архиве', value: 'archive', color: 'grey' }
};

const statusesOfRoutes = {
   blocked: {
      label: 'Заблокирован',
      value: 'blocked',
      color: 'red',
      badgeStatus: 'error'
   },
   active: {
      label: 'Активный',
      value: 'active',
      color: 'green',
      badgeStatus: 'default'
   },
   inwork: {
      label: 'В работе',
      value: 'inwork',
      color: 'grey',
      badgeStatus: 'processing'
   },
   finished: {
      label: 'Завершен',
      value: 'finished',
      color: 'blue',
      badgeStatus: 'success'
   }
};

export default statuses;
export {
   statusesOfLeads,
   statusesOfRoutes,
   statusesOfFaqs,
   statusesOfDrivers,
   statusesOfAcceptances,
   statusesOfAuctions,
   statusesOfSellers,
   statusesOfCategories,
   statusesOfRatings
};
