
const dotenv = require('dotenv')
const { createTransport } = require('nodemailer')
const twilio = require('twilio')

dotenv.config();

const accountSid = process.env.ACCESOSID;
const authToken = process.env.ACCESOTOKEN;

const client = twilio(accountSid, authToken);

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "tomasdiab@gmail.com",
    pass: "yxjmuecgoyrynsid",
  },
});




module.exports = { client, transporter };