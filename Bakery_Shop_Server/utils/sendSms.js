// utils/sendSms.js
require('dotenv').config();
const twilio = require('twilio');

// Load Twilio credentials from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Debug log (token hidden for safety)
console.log("📞 Twilio Configuration:");
console.log("🧩 SID:", accountSid || "❌ Missing SID");
console.log("🧩 FROM:", fromNumber || "❌ Missing From Number");
console.log("🧩 TOKEN:", authToken ? "Loaded" : "❌ Missing Token");

const client = twilio(accountSid, authToken);

/**
 * Send an SMS via Twilio
 * @param {string} to - The recipient's phone number (can be plain or E.164 format)
 * @param {string} message - The message to send
 */
const sendSms = async (to, message) => {
  try {
    if (!to) throw new Error("Recipient phone number is missing!");
    if (!message) throw new Error("Message content is missing!");

    // Format number to E.164 (e.g., +91883032XXXX)
    let formattedTo = to.trim();
    if (!formattedTo.startsWith('+')) {
      formattedTo = `+91${formattedTo}`;
    }

    console.log(`📤 Sending SMS to: ${formattedTo}`);

    // Send SMS
    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: formattedTo,
    });

    console.log("✅ SMS sent successfully!");
    return response;
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
  }
};

module.exports = sendSms;
