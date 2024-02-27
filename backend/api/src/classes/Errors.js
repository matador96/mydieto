require("dotenv").config();

const errorTemplateForRequest = (err) => {
  return {
    message: err.getMessage(),
    status: err.statusCode(),
    type: err.name,
    extra: err.getExtra(),
  };
};

const addToLogger = () => {};

module.exports.ApplicationError = class ApplicationError extends Error {
  constructor(message, extra) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.extra = extra;

    addToLogger(this);
  }

  getStack() {
    return this.stack;
  }

  getMessage() {
    return this.message;
  }

  getExtra() {
    if (!this?.extra) {
      return null;
    }

    return this.extra;
  }

  statusCode() {
    return 404;
  }

  requestObj() {
    return errorTemplateForRequest(this);
  }
};

module.exports.DatabaseError = class DatabaseError extends Error {
  constructor(message, errorObj) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorObj = errorObj;

    this.getStack();
    addToLogger(this);
  }

  getMessage() {
    let text = "Ошибка баз данных";
    return text;
  }

  getStack() {
    return this.errorObj.stack;
  }

  getExtra() {
    return this.errorObj.extra;
  }

  statusCode() {
    return 500;
  }

  requestObj() {
    return errorTemplateForRequest(this);
  }
};

module.exports.UnknownError = class UnknownError extends Error {
  constructor(message, validationErrorsArr) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorsList = validationErrorsArr;
    this.extra = validationErrorsArr;
    addToLogger(this);
  }

  getStack() {
    return this.stack;
  }

  getMessage() {
    let text = "Неизвестная ошибка";
    return text;
  }

  getExtra() {
    if (!this?.extra) {
      return null;
    }

    return this.extra;
  }

  statusCode() {
    return 520;
  }

  requestObj() {
    return errorTemplateForRequest(this);
  }
};

module.exports.AnotherServiceError = class AnotherServiceError extends Error {
  constructor(message, validationErrorsArr) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorsList = validationErrorsArr;
    this.extra = validationErrorsArr;
    addToLogger(this);
  }

  getStack() {
    return this.stack;
  }

  getMessage() {
    let text = "Ошибка внешнего сервиса";
    return text;
  }

  getExtra() {
    if (!this?.extra) {
      return null;
    }

    return this.extra;
  }

  statusCode() {
    return 520;
  }

  requestObj() {
    return errorTemplateForRequest(this);
  }
};

module.exports.ApiValidationError = class ApiValidationError extends Error {
  constructor(message, validationErrorsArr) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.errorsList = validationErrorsArr;
    this.extra = validationErrorsArr;
    addToLogger(this);
  }

  getStack() {
    return this.stack;
  }

  getMessage() {
    let text = "Ошибка валидации полей";
    this.errorsList.map((e) => (text = `${text} | ${e.path}`));
    return text;
  }

  getExtra() {
    if (!this?.extra) {
      return null;
    }

    return this.extra;
  }

  statusCode() {
    return 403;
  }

  requestObj() {
    return errorTemplateForRequest(this);
  }
};
