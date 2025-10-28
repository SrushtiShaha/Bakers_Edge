// // // server/utils/sendSms.js
// // const twilio = require('twilio');
// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = new twilio(accountSid, authToken);

// // const sendSms = async (to, body) => {
// //     try {
// //         await client.messages.create({
// //             body: body,
// //             to: to,
// //             from: process.env.TWILIO_PHONE_NUMBER
// //         });
// //         console.log("SMS sent successfully to", to);
// //     } catch (error) {
// //         console.error("Error sending SMS:", error);
// //     }
// // };

// // module.exports = sendSms;

// // server/utils/sendSms.js
// // const twilio = require('twilio');
// // const accountSid = process.env.TWILIO_ACCOUNT_SID;
// // const authToken = process.env.TWILIO_AUTH_TOKEN;
// // const client = new twilio(accountSid, authToken);

// // const sendSms = async (to, body) => {
// //     try {
// //         await client.messages.create({
// //             body: body,
// //             to: `+91${to}`, // ✅ Fix for E.164 format
// //             from: process.env.TWILIO_PHONE_NUMBER
// //         });
// //         console.log("SMS sent successfully to", to);
// //     } catch (error) {
// //         console.error("Error sending SMS:", error);
// //     }
// // };

// // module.exports = sendSms;

// // server/utils/sendSms.js
// // 

// // server/utils/sendSms.js
// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // ✅ Explicitly pass the variables to the Twilio constructor
// const client = new twilio(accountSid, authToken); 

// // Helper function remains the same
// const formatToE164 = (number) => {
//     // If number already starts with '+', return it as is.
//     if (number.startsWith('+')) {
//         return number;
//     }
//     // If it's a standard 10-digit Indian number, prepend '+91'.
//     if (number.length === 10 && /^\d{10}$/.test(number)) {
//         return `+91${number}`;
//     }
//     // Otherwise, return as is (Twilio will handle generic numbers if possible, 
//     // but the safest bet is the check above).
//     return number;
// };

// const sendSms = async (to, body) => {
//     try {
//         const formattedTo = formatToE164(to);
        
//         await client.messages.create({
//             body: body,
//             to: formattedTo,
//             from: process.env.TWILIO_PHONE_NUMBER
//         });
//         console.log("SMS sent successfully to", formattedTo);
//     } catch (error) {
//         // Log the full error to the console for detailed debugging
//         console.error("Error sending SMS:", error);
//     }
// };

// module.exports = sendSms;

// server/utils/sendSms.js
// const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // ✅ Use the local variables (accountSid, authToken) for client initialization
// const client = new twilio(accountSid, authToken); 

// // Helper function to ensure the number is in E.164 format (+91...)
// const formatToE164 = (number) => {
//     // If number already starts with '+', return it as is.
//     if (number.startsWith('+')) {
//         return number;
//     }
//     // If it's a standard 10-digit Indian number, prepend '+91'.
//     if (number.length === 10 && /^\d{10}$/.test(number)) {
//         return `+91${number}`;
//     }
//     // Return as is for other cases (safest assumption)
//     return number;
// };

// const sendSms = async (to, body) => {
//     try {
//         const formattedTo = formatToE164(to);
        
//         await client.messages.create({
//             body: body,
//             to: formattedTo,
//             from: process.env.TWILIO_PHONE_NUMBER
//         });
//         console.log("SMS sent successfully to", formattedTo);
//     } catch (error) {
//         // Log the full error to the console for detailed debugging
//         console.error("Error sending SMS:", error);
//     }
// };

// module.exports = sendSms;

// server/utils/sendSms.js
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// ✅ Final fix: Use the local variables (accountSid, authToken) for client initialization
const client = new twilio(accountSid, authToken); 

// Helper function remains the same
const formatToE164 = (number) => {
    if (number.startsWith('+')) {
        return number;
    }
    if (number.length === 10 && /^\d{10}$/.test(number)) {
        return `+91${number}`;
    }
    return number;
};

const sendSms = async (to, body) => {
    try {
        const formattedTo = formatToE164(to);
        
        await client.messages.create({
            body: body,
            to: formattedTo,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log("SMS sent successfully to", formattedTo);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
};

module.exports = sendSms;
