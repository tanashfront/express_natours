const Brevo = require('@getbrevo/brevo');
// require('dotenv').config();

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

exports.sendEmail = async (to, subject, textContent, htmlContent) => {
  const emailData = {
    sender: { email: 'tanashbd@gmail.com', name: 'Your Name or Business' },
    to: [{ email: to }],
    subject,
    textContent,
    htmlContent,
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// module.exports = sendEmail;