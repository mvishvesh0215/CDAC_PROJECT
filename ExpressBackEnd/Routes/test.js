const mailer = require('../mailer');

async function testEmail() {
  const response = await mailer.sendEmail(
    "viso020408@gmail.com", 
    "Test Subject", 
    "<p>This is a test email</p>"
  );
  console.log(response);
}

testEmail();
