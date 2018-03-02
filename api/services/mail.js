var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'replan.system@gmail.com',
        pass: 'replan2018'
    }
});






function sendEmail(mFrom, mTo, mSubject, mHtml) {
  const mailOptions = {
    from: mFrom, // sender address
    to:  mTo, // list of receivers
    subject: mSubject, // Subject line
    html: mHtml// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
}

module.exports = {
  sendEmail
}
