require('dotenv').config();
const twilio = require('twilio');

// Load Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Validate environment variables
if (!accountSid || !authToken || !fromNumber) {
  console.error("❌ Missing Twilio environment variables!");
  console.error("Please check your .env file for TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER");
}

const client = twilio(accountSid, authToken);

/**
 * Send an SMS message using Twilio.
 * @param {string} to - Recipient's phone number (e.g., '+91XXXXXXXXXX')
 * @param {string} message - Message text
 */
const sendSms = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });

    console.log("✅ SMS sent successfully to:", to, "| SID:", response.sid);
    return true;
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    return false;
  }
};

module.exports = sendSms;
