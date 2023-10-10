const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const app = express();

let PORT = process.env.SERVER_PORT || 5000;

var transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

app.get('/sendmail/:email', (req, res) => {
  const email = req.params.email;

  let loc = 'http://localhost:3000/activate/' + email;

  var mailOptions = {
    from: process.env.EMAIL_AUTH_USER,
    to: email,
    subject: process.env.EMAIL_SUBJECT,
    html:
      'Thank you for registering with <b>GoShopNow</b>! . Please click the <a href="' +
      loc +
      '" >link </a> to activate your account. <hr></hr> <div>Thanks & Regards</div> <span>Abhishek from <b>GoShopNow</b></span>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({
        message: 'email not sent !',
      });
      console.log(error);
    } else {
      res.json({
        message: 'email sent !',
      });
      console.log('Email sent: ' + info.response);
    }
  });
});

app.get('/activate/:email', (req, res) => {
  res.json({
    message: `You have successfully activated your account for email ${req.params.email}`,
  });
});

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
