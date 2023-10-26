const nodemailer = require("nodemailer");

const { AnotherServiceError } = require("./../classes/Errors");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = {
  notifyAboutChangingCredentials: async (mailTo, data) => {
    try {
      return await transporter.sendMail({
        from: {
          name: "Ecorium",
          address: process.env.EMAIL_LOGIN,
        },
        to: mailTo,
        subject: "Ваши данные",
        text: `Добрый день, ${data.firstName} ${data.lastName} Ваш логин: ${data.login} ваш пароль: ${data.password}`,
        html: `Добрый день, ${data.firstName} ${data.lastName} Ваш логин: ${data.login} ваш пароль: ${data.password}`,
      });
    } catch (e) {
      throw new AnotherServiceError(
        "Почта неверная, либо на нее не удается отправить письмо",
      );
    }
  },
};
