const russianOneWordRequired = (maxLength = 50) => [
   {
      required: true,
      message: 'Вы оставили поле пустым'
   },
   {
      max: maxLength,
      message: `Максимально ${maxLength} символов`
   },
   {
      pattern: /^([А-Яа-яЁё]+)$/,
      message: 'Только русские буквы'
   }
];

const onlyNumberPattern = [
   {
      pattern: /^([0-9]+)$/,
      message: 'Только цифры'
   }
];

const mobileRequired = [
   {
      required: true,
      message: 'Вы оставили поле пустым'
   },
   {
      max: 10,
      message: 'Максимально 10 символов'
   },
   ...onlyNumberPattern
];

const onlyAlphabetAndNumbers = [
   {
      pattern: /^([a-zA-Z0-9]+)$/,
      message: 'Только буквы и цифры'
   }
];

const onlyAlphabetRuAndEnAndNumbers = [
   {
      pattern: /^([a-zA-Zа-яА-Я0-9]+)$/,
      message: 'Только буквы и цифры'
   }
];

export {
   russianOneWordRequired,
   onlyNumberPattern,
   mobileRequired,
   onlyAlphabetAndNumbers,
   onlyAlphabetRuAndEnAndNumbers
};
