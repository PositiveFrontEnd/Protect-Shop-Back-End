require("dotenv").config();
const { Resend } = require("resend");
const pug = require("pug");
const path = require("path");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(name, email, letter, phone, question) {
  console.log("Sending email...");
  try {
    const emailTemplatePath = path.resolve(
      __dirname,
      "..",
      "views",
      "emailTemplate.pug"
    );
    const compiledTemplate = pug.compileFile(emailTemplatePath);

    const html = compiledTemplate({ name, email, letter, phone, question });
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "protectshop2024@gmail.com",
      subject: email,
      html: html,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message }; 
    }
    console.log("Email sent successfully:", data);
    return { success: true, data, html }; 
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message }; 
  }
}

module.exports = sendEmail;
