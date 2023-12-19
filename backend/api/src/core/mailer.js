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

const sendDataToEmail = async (mailTo, data) => {
  try {
    return await transporter.sendMail(data);
  } catch (e) {
    throw new AnotherServiceError(
      "Почта неверная, либо на нее не удается отправить письмо",
    );
  }
};

module.exports = {
  notifyAboutChangingCredentials: async (mailTo, data) => {
    await sendDataToEmail(mailTo, {
      from: {
        name: "Ecorium",
        address: process.env.EMAIL_LOGIN,
      },
      to: mailTo,
      subject: "Ваши данные",
      text: `Добрый день, ${data.firstName} ${data.lastName} Ваша почта для авторизации: ${data.email} ваш пароль: ${data.password}`,
      html: `Добрый день, ${data.firstName} ${data.lastName} Ваша почта для авторизации: ${data.email} ваш пароль: ${data.password}`,
    });
  },
  sendConfirmation: async (mailTo, data) => {
    await sendDataToEmail(mailTo, {
      from: {
        name: "Ecorium",
        address: process.env.EMAIL_LOGIN,
      },
      to: mailTo,
      subject: "Код подтверждения",
      text: `Чтобы подтвердить ваше действие, введите код: ${data.code}`,
      html: `Чтобы подтвердить ваше действие, введите код: ${data.code}`,
    });
  },
};
