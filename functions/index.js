Here is a basic example with nodemailer:

javascript
Copy code
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendPurchaseEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    const order = snap.data();

    const mailOptions = {
      from: 'Your App Name <noreply@yourapp.com>',
      to: 'designated_email@example.com',
      subject: `New purchase of ${order.productName}`,
      text: `A user has purchased ${order.productName}. Please process the order.`,
    };

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Email sent successfully.');
    });
  });