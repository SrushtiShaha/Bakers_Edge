require('dotenv').config();
const twilio = require('twilio');
const sendEmail = require("./utils/sendEmail");

sendEmail("yourtestemail@gmail.com", "Test from Baker's Edge", "This is a test email!");


console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);
console.log("FROM:", process.env.TWILIO_PHONE_NUMBER);

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.api.accounts(process.env.TWILIO_ACCOUNT_SID)
  .fetch()
  .then(acc => console.log("✅ Twilio connected. Account:", acc.friendlyName))
  .catch(err => console.error("❌ Twilio authentication failed:", err));
