// // server/utils/sendEmail.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     // ✅ Use explicit host/port configuration instead of just 'service: gmail'
//     host: 'smtp.gmail.com', 
//     port: 465, // 465 is the secure port for SMTP over SSL
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const sendEmail = async (to, subject, text) => {
//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: to,
//             subject: subject,
//             text: text,
//         });
//         console.log("Email sent successfully to", to);
//     } catch (error) {
//         // Log the full error to the console for detailed debugging
//         console.error("Error sending email:", error);
//     }
// };

// module.exports = sendEmail;

// server/utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // ✅ FIX: Use explicit host/port for secure connection (Port 465 is secure SSL)
    host: 'smtp.gmail.com', 
    port: 465, 
    secure: true, // MUST be true for port 465
    auth: {
        // ✅ Uses the email address from .env
        user: process.env.EMAIL_USER,
        // ✅ Uses the App Password (qjfqfddpxioeihno) from .env
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        });
        console.log("Email sent successfully to", to);
    } catch (error) {
        // Logging the full error is crucial for final debugging
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
