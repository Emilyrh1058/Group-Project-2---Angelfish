const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "mod15angelfish@gmail.com",
    from: "crowellclifford@utexas.edu",
    subject: "Test 1",
    text: "Test 2",
    html: "<strong>Test 3</strong>"
};

sgMail.send(msg);