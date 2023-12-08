const generator = require("generate-password");

const generatorOption = {
  length: 10,
  uppercase: false,
};

module.exports.generateLoginAndPassword = () => {
  const passwords = generator.generateMultiple(2, {
    ...generatorOption,
  });

  return {
    login: passwords[0],
    password: passwords[1],
  };
};

module.exports.generateRandomWord = () => {
  return generator.generate({
    ...generatorOption,
  });
};

module.exports.generateRandomNumbers = (wordLength) => {
  return generator.generate({
    length: wordLength,
    numbers: true,
    symbols: false,
    lowercase: false,
    uppercase: false,
    strict: false,
  });
};
