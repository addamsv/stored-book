import "dotenv/config";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER || "app_mail@gmail.com",
    pass: process.env.SMTP_PASS || "upjq",
  },
});

const options = {
  from: {
    name: "Sergi",
    address: process.env.SMTP_USER || "app_mail@gmail.com",
  },
  to: [process.env.MAIL_TO || "mail_to@mail.ru"],
  subject: "Message title",
  text: "Plaintext version of the message",
  // html: "<p>HTML version of the message</p>",
};

export const sendEmail = async (title: string, message: string) => {
  options.subject = title;
  options.text = message;

  try {
    const info = await transporter.sendMail(options);

    return info;
  } catch (error) {
    return error;
  }
};
