const nodemailer = require("nodemailer");

// Enable less secure app form setting -
// https://www.google.com/settings/security/lesssecureapps
// Disable Captcha  -
// https://accounts.google.com/b/0/displayunlockcaptcha
// https://stackoverflow.com/questions/39448394/how-to-send-an-email-in-nodejs

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "strdbook@gmail.com", // process.env.SMTP_USER ||
    pass: "tzru jhtu nnyj oswt", // process.env.SMTP_PASS ||
  },
});

const message = {
  from: {
    name: "Sergi",
    address: "strdbook@gmail.com",
  },
  to: ["swares@mail.ru"],
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

export const sendEmail = async () => {
  try {
    const info = await transporter.sendMail(message);

    console.log("SENDEDs", info);
  } catch (error) {
    console.log(error);
  }
};

sendEmail();
