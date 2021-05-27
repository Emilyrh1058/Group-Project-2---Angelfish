const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "crowell_c1997@yahoo.com",
    from: "crowellclifford@utexas.edu",
    subject: "Test 1",
    text: "Test 2",
    html: "<strong>Test 3</strong>"
};

sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
}) 