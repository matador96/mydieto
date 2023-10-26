const districtList = [
  {
    id: 1,
    city_district: "Академический",
    city_area: "ЮЗАО",
  },
  {
    id: 2,
    city_district: "Алексеевский",
    city_area: "СВАО",
  },
  {
    id: 3,
    city_district: "Алтуфьевский",
    city_area: "СВАО",
  },
  {
    id: 4,
    city_district: "Арбат",
    city_area: "ЦАО",
  },
  {
    id: 5,
    city_district: "Аэропорт",
    city_area: "САО",
  },
  {
    id: 6,
    city_district: "Бабушкинский",
    city_area: "СВАО",
  },
  {
    id: 7,
    city_district: "Басманный",
    city_area: "ЦАО",
  },
  {
    id: 8,
    city_district: "Беговой",
    city_area: "САО",
  },
  {
    id: 9,
    city_district: "Бескудниковский",
    city_area: "САО",
  },
  {
    id: 10,
    city_district: "Бибирево",
    city_area: "СВАО",
  },
  {
    id: 11,
    city_district: "Бирюлёво Восточное",
    city_area: "ЮАО",
  },
  {
    id: 12,
    city_district: "Бирюлёво Западное",
    city_area: "ЮАО",
  },
  {
    id: 13,
    city_district: "Богородское",
    city_area: "ВАО",
  },
  {
    id: 14,
    city_district: "Братеево",
    city_area: "ЮАО",
  },
  {
    id: 15,
    city_district: "Бутырский",
    city_area: "СВАО",
  },
  {
    id: 16,
    city_district: "Вешняки",
    city_area: "ВАО",
  },
  {
    id: 17,
    city_district: "Внуково",
    city_area: "ЗАО",
  },
  {
    id: 18,
    city_district: "Войковский",
    city_area: "САО",
  },
  {
    id: 19,
    city_district: "Восточное Дегунино",
    city_area: "САО",
  },
  {
    id: 20,
    city_district: "Восточное Измайлово",
    city_area: "ВАО",
  },
  {
    id: 21,
    city_district: "Восточный",
    city_area: "ВАО",
  },
  {
    id: 22,
    city_district: "Выхино-Жулебино",
    city_area: "ЮВАО",
  },
  {
    id: 23,
    city_district: "Гагаринский",
    city_area: "ЮЗАО",
  },
  {
    id: 24,
    city_district: "Головинский",
    city_area: "САО",
  },
  {
    id: 25,
    city_district: "Гольяново",
    city_area: "ВАО",
  },
  {
    id: 26,
    city_district: "Даниловский",
    city_area: "ЮАО",
  },
  {
    id: 27,
    city_district: "Дмитровский",
    city_area: "САО",
  },
  {
    id: 28,
    city_district: "Донской",
    city_area: "ЮАО",
  },
  {
    id: 29,
    city_district: "Дорогомилово",
    city_area: "ЗАО",
  },
  {
    id: 30,
    city_district: "Замоскворечье",
    city_area: "ЦАО",
  },
  {
    id: 31,
    city_district: "Западное Дегунино",
    city_area: "САО",
  },
  {
    id: 32,
    city_district: "Зюзино",
    city_area: "ЮЗАО",
  },
  {
    id: 33,
    city_district: "Зябликово",
    city_area: "ЮАО",
  },
  {
    id: 34,
    city_district: "Ивановское",
    city_area: "ВАО",
  },
  {
    id: 35,
    city_district: "Измайлово",
    city_area: "ВАО",
  },
  {
    id: 36,
    city_district: "Капотня",
    city_area: "ЮВАО",
  },
  {
    id: 37,
    city_district: "Коньково",
    city_area: "ЮЗАО",
  },
  {
    id: 38,
    city_district: "Коптево",
    city_area: "САО",
  },
  {
    id: 39,
    city_district: "Косино-Ухтомский",
    city_area: "ВАО",
  },
  {
    id: 40,
    city_district: "Котловка",
    city_area: "ЮЗАО",
  },
  {
    id: 41,
    city_district: "Красносельский",
    city_area: "ЦАО",
  },
  {
    id: 42,
    city_district: "Крылатское",
    city_area: "ЗАО",
  },
  {
    id: 43,
    city_district: "Крюково",
    city_area: "ЗелАО",
  },
  {
    id: 44,
    city_district: "Кузьминки",
    city_area: "ЮВАО",
  },
  {
    id: 45,
    city_district: "Кунцево",
    city_area: "ЗАО",
  },
  {
    id: 46,
    city_district: "Куркино",
    city_area: "СЗАО",
  },
  {
    id: 47,
    city_district: "Левобережный",
    city_area: "САО",
  },
  {
    id: 48,
    city_district: "Лефортово",
    city_area: "ЮВАО",
  },
  {
    id: 49,
    city_district: "Лианозово",
    city_area: "СВАО",
  },
  {
    id: 50,
    city_district: "Ломоносовский",
    city_area: "ЮЗАО",
  },
  {
    id: 51,
    city_district: "Лосиноостровский",
    city_area: "СВАО",
  },
  {
    id: 52,
    city_district: "Люблино",
    city_area: "ЮВАО",
  },
  {
    id: 53,
    city_district: "Марфино",
    city_area: "СВАО",
  },
  {
    id: 54,
    city_district: "Марьина Роща",
    city_area: "СВАО",
  },
  {
    id: 55,
    city_district: "Марьино",
    city_area: "ЮВАО",
  },
  {
    id: 56,
    city_district: "Матушкино",
    city_area: "ЗелАО",
  },
  {
    id: 57,
    city_district: "Метрогородок",
    city_area: "ВАО",
  },
  {
    id: 58,
    city_district: "Мещанский",
    city_area: "ЦАО",
  },
  {
    id: 59,
    city_district: "Митино",
    city_area: "СЗАО",
  },
  {
    id: 60,
    city_district: "Можайский",
    city_area: "ЗАО",
  },
  {
    id: 61,
    city_district: "Молжаниновский",
    city_area: "САО",
  },
  {
    id: 62,
    city_district: "Москворечье-Сабурово",
    city_area: "ЮАО",
  },
  {
    id: 63,
    city_district: "Нагатино-Садовники",
    city_area: "ЮАО",
  },
  {
    id: 64,
    city_district: "Нагатинский Затон",
    city_area: "ЮАО",
  },
  {
    id: 65,
    city_district: "Нагорный",
    city_area: "ЮАО",
  },
  {
    id: 66,
    city_district: "Некрасовка",
    city_area: "ЮВАО",
  },
  {
    id: 67,
    city_district: "Нижегородский",
    city_area: "ЮВАО",
  },
  {
    id: 68,
    city_district: "Ново-Переделкино",
    city_area: "ЗАО",
  },
  {
    id: 69,
    city_district: "Новогиреево",
    city_area: "ВАО",
  },
  {
    id: 70,
    city_district: "Новокосино",
    city_area: "ВАО",
  },
  {
    id: 71,
    city_district: "Обручевский",
    city_area: "ЮЗАО",
  },
  {
    id: 72,
    city_district: "Орехово-Борисово Северное",
    city_area: "ЮАО",
  },
  {
    id: 73,
    city_district: "Орехово-Борисово Южное",
    city_area: "ЮАО",
  },
  {
    id: 74,
    city_district: "Останкинский",
    city_area: "СВАО",
  },
  {
    id: 75,
    city_district: "Отрадное",
    city_area: "СВАО",
  },
  {
    id: 76,
    city_district: "Очаково-Матвеевское",
    city_area: "ЗАО",
  },
  {
    id: 77,
    city_district: "Перово",
    city_area: "ВАО",
  },
  {
    id: 78,
    city_district: "Печатники",
    city_area: "ЮВАО",
  },
  {
    id: 79,
    city_district: "Покровское-Стрешнево",
    city_area: "СЗАО",
  },
  {
    id: 80,
    city_district: "Преображенское",
    city_area: "ВАО",
  },
  {
    id: 81,
    city_district: "Пресненский",
    city_area: "ЦАО",
  },
  {
    id: 82,
    city_district: "Проспект Вернадского",
    city_area: "ЗАО",
  },
  {
    id: 83,
    city_district: "Раменки",
    city_area: "ЗАО",
  },
  {
    id: 84,
    city_district: "Ростокино",
    city_area: "СВАО",
  },
  {
    id: 85,
    city_district: "Рязанский",
    city_area: "ЮВАО",
  },
  {
    id: 86,
    city_district: "Савёлки",
    city_area: "ЗелАО",
  },
  {
    id: 87,
    city_district: "Савёловский",
    city_area: "САО",
  },
  {
    id: 88,
    city_district: "Свиблово",
    city_area: "СВАО",
  },
  {
    id: 89,
    city_district: "Северное Бутово",
    city_area: "ЮЗАО",
  },
  {
    id: 90,
    city_district: "Северное Измайлово",
    city_area: "ВАО",
  },
  {
    id: 91,
    city_district: "Северное Медведково",
    city_area: "СВАО",
  },
  {
    id: 92,
    city_district: "Северное Тушино",
    city_area: "СЗАО",
  },
  {
    id: 93,
    city_district: "Северный",
    city_area: "СВАО",
  },
  {
    id: 94,
    city_district: "Силино",
    city_area: "ЗелАО",
  },
  {
    id: 95,
    city_district: "Сокол",
    city_area: "САО",
  },
  {
    id: 96,
    city_district: "Соколиная Гора",
    city_area: "ВАО",
  },
  {
    id: 97,
    city_district: "Сокольники",
    city_area: "ВАО",
  },
  {
    id: 98,
    city_district: "Солнцево",
    city_area: "ЗАО",
  },
  {
    id: 99,
    city_district: "Старое Крюково",
    city_area: "ЗелАО",
  },
  {
    id: 100,
    city_district: "Строгино",
    city_area: "СЗАО",
  },
  {
    id: 101,
    city_district: "Таганский",
    city_area: "ЦАО",
  },
  {
    id: 102,
    city_district: "Тверской",
    city_area: "ЦАО",
  },
  {
    id: 103,
    city_district: "Текстильщики",
    city_area: "ЮВАО",
  },
  {
    id: 104,
    city_district: "Тёплый Стан",
    city_area: "ЮЗАО",
  },
  {
    id: 105,
    city_district: "Тимирязевский",
    city_area: "САО",
  },
  {
    id: 106,
    city_district: "Тропарёво-Никулино",
    city_area: "ЗАО",
  },
  {
    id: 107,
    city_district: "Филёвский Парк",
    city_area: "ЗАО",
  },
  {
    id: 108,
    city_district: "Фили-Давыдково",
    city_area: "ЗАО",
  },
  {
    id: 109,
    city_district: "Хамовники",
    city_area: "ЦАО",
  },
  {
    id: 110,
    city_district: "Ховрино",
    city_area: "САО",
  },
  {
    id: 111,
    city_district: "Хорошёво-Мнёвники",
    city_area: "СЗАО",
  },
  {
    id: 112,
    city_district: "Хорошёвский",
    city_area: "САО",
  },
  {
    id: 113,
    city_district: "Царицыно",
    city_area: "ЮАО",
  },
  {
    id: 114,
    city_district: "Черёмушки",
    city_area: "ЮЗАО",
  },
  {
    id: 115,
    city_district: "Чертаново Северное",
    city_area: "ЮАО",
  },
  {
    id: 116,
    city_district: "Чертаново Центральное",
    city_area: "ЮАО",
  },
  {
    id: 117,
    city_district: "Чертаново Южное",
    city_area: "ЮАО",
  },
  {
    id: 118,
    city_district: "Щукино",
    city_area: "СЗАО",
  },
  {
    id: 119,
    city_district: "Южное Бутово",
    city_area: "ЮЗАО",
  },
  {
    id: 120,
    city_district: "Южное Медведково",
    city_area: "СВАО",
  },
  {
    id: 121,
    city_district: "Южное Тушино",
    city_area: "СЗАО",
  },
  {
    id: 122,
    city_district: "Южнопортовый",
    city_area: "ЮВАО",
  },
  {
    id: 123,
    city_district: "Якиманка",
    city_area: "ЦАО",
  },
  {
    id: 124,
    city_district: "Ярославский",
    city_area: "СВАО",
  },
  {
    id: 125,
    city_district: "Ясенево",
    city_area: "ЮЗАО",
  },
  {
    id: 126,
    city_district: "Троицк",
    city_area: "Троицкий",
  },
  {
    id: 127,
    city_district: "Щербинка",
    city_area: "Новомосковский",
  },
  {
    id: 128,
    city_district: "Мосрентген",
    city_area: "Новомосковский",
  },
  {
    id: 129,
    city_district: "Внуковское",
    city_area: "Новомосковский",
  },
  {
    id: 130,
    city_district: "Вороновское",
    city_area: "Троицкий",
  },
  {
    id: 131,
    city_district: "Воскресенское",
    city_area: "Новомосковский",
  },
  {
    id: 132,
    city_district: "Десёновское",
    city_area: "Новомосковский",
  },
  {
    id: 133,
    city_district: "Киевский",
    city_area: "Троицкий",
  },
  {
    id: 134,
    city_district: "Клёновское",
    city_area: "Троицкий",
  },
  {
    id: 135,
    city_district: "Кокошкино",
    city_area: "Новомосковский",
  },
  {
    id: 136,
    city_district: "Краснопахорское",
    city_area: "Троицкий",
  },
  {
    id: 137,
    city_district: "Марушкинское",
    city_area: "Новомосковский",
  },
  {
    id: 138,
    city_district: "Михайлово-Ярцевское",
    city_area: "Троицкий",
  },
  {
    id: 139,
    city_district: "Московский",
    city_area: "Новомосковский",
  },
  {
    id: 140,
    city_district: "Новофёдоровское",
    city_area: "Троицкий",
  },
  {
    id: 141,
    city_district: "Первомайское",
    city_area: "Троицкий",
  },
  {
    id: 142,
    city_district: "Роговское",
    city_area: "Троицкий",
  },
  {
    id: 143,
    city_district: "Рязановское",
    city_area: "Новомосковский",
  },
  {
    id: 144,
    city_district: "Сосенское",
    city_area: "Новомосковский",
  },
  {
    id: 145,
    city_district: "Филимонковское",
    city_area: "Новомосковский",
  },
  {
    id: 146,
    city_district: "Щаповское",
    city_area: "Троицкий",
  },
  {
    id: -1,
    city_district: "Ненайденный район",
    city_area: "Ненайденный округ",
  },
];

const getDistrictIdByName = (name) =>
  districtList.find((e) => e?.city_district === name)?.id;

const getDistrictNameById = (districtId) =>
  districtList.find((e) => e.id === districtId)?.city_district;

const getDistrictInfoById = (districtId) =>
  districtList.find((e) => e?.id === districtId);

module.exports = {
  districtList,
  getDistrictIdByName,
  getDistrictNameById,
  getDistrictInfoById,
};
