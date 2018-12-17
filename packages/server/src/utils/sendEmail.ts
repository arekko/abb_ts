import * as nodemailer from "nodemailer";


export const sendEmail = async (recipient: string, url: string) => {

// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ke4kpdql5t53eewd@ethereal.email",
    pass: "NADPCp5VwwesZ1fwZN"
  }
});

// Message object
 const message = {
  from: "Sender Name <sender@example.com>",
  to: `Recipient <${recipient}>`,
  subject: "Nodemailer is unicode friendly ✔",
  text: "Hello to myself!",
  html: `<html>
              <body>
                <a href="${url}">confirm email</a>j
              </body>
            </html>`
};

transporter.sendMail(message, (err, info) => {
  if (err) {
    console.log("Error occurred. " + err.message);
  }

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
};

