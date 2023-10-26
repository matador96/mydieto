const { roleIds } = require("./../config/roleSettings");
const {
  AUTH,
  AUTH_LOGOUT,
  CREATE_USER,
  CREATE_SELLER,
  CREATE_LEAD,
  CREATE_ROUTE,
  CREATE_DRIVER,
  CREATE_FAQ,
  CREATE_CATEGORY,
  UPDATE_USER,
  UPDATE_SELLER,
  UPDATE_LEAD,
  UPDATE_ROUTE,
  UPDATE_DRIVER,
  UPDATE_FAQ,
  UPDATE_CATEGORY,
  DELETE_USER,
  RESET_USER,
  GENERATE_PASSWORD_DRIVER,
  CREATE_ACCEPTANCE,
  CREATE_AUCTION,
  UPDATE_ACCEPTANCE,
  UPDATE_AUCTION,
  CREATE_RATING,
  UPDATE_RATING,
  DELETE_LEAD,
  DELETE_DRIVER,
  DELETE_ROUTE,
  DELETE_CATEGORY,
  DELETE_FAQ,
  DELETE_RATING,
  DELETE_AUCTION,
  DELETE_ACCEPTANCE,
  DELETE_SELLER,
} = require("./../enums/loggerActions");

const allActions = {
  [GENERATE_PASSWORD_DRIVER]: {
    title: "Новый пароль для водителя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.roleId} ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал новый пароль (ID: ${extra.result.id}).`,
      },
    },
  },
  [RESET_USER]: {
    title: "Сброс пароля",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.roleId} ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) сбросил пароль (ID: ${extra.result.id}).`,
      },
    },
  },
  [AUTH]: {
    title: "Вход в систему",
    message: {
      success: {
        description: (user) =>
          `Пользователь ${user.roleId} ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) вошел в систему`,
      },
    },
  },

  [AUTH_LOGOUT]: {
    title: "Выход из системы",
    message: {
      success: {
        description: (user) =>
          `Пользователь ${user.firstName}, ${user.lastName}  (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) вышел в систему`,
      },
    },
  },

  [CREATE_USER]: {
    title: "Создание пользователя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал нового пользователя. Имя ${
            extra.result.firstName
          }, Фамилия: ${extra.result.lastName}, Роль: ${
            roleIds[extra.result.roleId]
          }, ID: ${extra.result.id}`,
      },
    },
  },
  [CREATE_SELLER]: {
    title: "Создание продавца",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал нового продавца. Имя ${
            extra.result.firstName
          }, Фамилия: ${extra.result.lastName}, ID: ${extra.result.id}`,
      },
    },
  },
  [CREATE_LEAD]: {
    title: "Создание заявки",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал новую заявку. Заявка ID: ${extra.result.id}`,
      },
    },
  },
  [CREATE_ROUTE]: {
    title: "Создание маршрута",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал новый маршрут. Маршрут ID: ${extra.result.id}`,
      },
    },
  },

  [CREATE_ACCEPTANCE]: {
    title: "Создание приемку",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал приемку. Маршрут ID: ${extra.result.id}`,
      },
    },
  },

  [CREATE_AUCTION]: {
    title: "Создание торга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал торг. Маршрут ID: ${extra.result.id}`,
      },
    },
  },
  [CREATE_RATING]: {
    title: "Создание рейтинга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал оценку. Оценка ID: ${extra.result.id}`,
      },
    },
  },

  [UPDATE_RATING]: {
    title: "Изменение рейтинга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал рейтинг (ID: ${extra.result.id}).`,
      },
    },
  },

  [UPDATE_ACCEPTANCE]: {
    title: "Изменение приемки",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал приемку (ID: ${extra.result.id}).`,
      },
    },
  },

  [UPDATE_AUCTION]: {
    title: "Изменение торга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал торг (ID: ${extra.result.id}).`,
      },
    },
  },

  [CREATE_DRIVER]: {
    title: "Создание водителя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал нового водителя.  Имя ${
            extra.result.firstName
          }, Фамилия: ${extra.result.lastName}, ID: ${extra.result.id}`,
      },
    },
  },

  [CREATE_FAQ]: {
    title: "Создание faq",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал новый FAQ (ID: ${extra.result.id}).`,
      },
    },
  },

  [CREATE_CATEGORY]: {
    title: "Создание категории",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) создал новую категорию (ID: ${extra.result.id}).`,
      },
    },
  },

  [UPDATE_USER]: {
    title: "Изменение пользователя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал пользователя (ID: ${extra.result.id}).`,
      },
    },
  },
  [UPDATE_SELLER]: {
    title: "Изменение продавца",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал продавца (ID: ${extra.result.id}).`,
      },
    },
  },
  [UPDATE_LEAD]: {
    title: "Изменение заявки",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал заявку (ID: ${extra.result.id}).`,
      },
    },
  },
  [UPDATE_ROUTE]: {
    title: "Изменение маршрута",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал маршрут (ID: ${extra.result.id}).`,
      },
    },
  },
  [UPDATE_DRIVER]: {
    title: "Изменение водителя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал водителя. ID: ${extra.result.id}`,
      },
    },
  },
  [UPDATE_FAQ]: {
    title: "Изменение faq",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал FAQ. ID: ${extra.result.id}`,
      },
    },
  },
  [UPDATE_CATEGORY]: {
    title: "Изменение категории",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) отредактировал категорию. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_USER]: {
    title: "Удаление пользователя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил пользователя. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_LEAD]: {
    title: "Удаление заявки",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил заявку. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_SELLER]: {
    title: "Удаление продавца",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил продавца. ID: ${extra.result.id}`,
      },
    },
  },

  [DELETE_DRIVER]: {
    title: "Удаление водителя",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил водителя. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_ACCEPTANCE]: {
    title: "Удаление приемку",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил приемку. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_AUCTION]: {
    title: "Удаление торга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил торг. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_RATING]: {
    title: "Удаление рейтинга",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил рейтинг. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_FAQ]: {
    title: "Удаление faq",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил faq. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_CATEGORY]: {
    title: "Удаление категории",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил категорию. ID: ${extra.result.id}`,
      },
    },
  },
  [DELETE_ROUTE]: {
    title: "Удаление маршрута",
    message: {
      success: {
        description: (user, extra) =>
          `Пользователь ${user.firstName}, ${user.lastName} (role: ${
            roleIds[user.roleId]
          }, id: ${user.id}) удалил маршрут. ID: ${extra.result.id}`,
      },
    },
  },
};

module.exports = {
  allActions,
};
