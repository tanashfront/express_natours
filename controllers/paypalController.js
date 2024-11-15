const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: "sandbox", // "sandbox" for testing, "live" for production
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY
  });

exports.paypalCreate = async(req, res) => {
    const { total, currency} = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:8000/api/v1/paypal/execute", // PayPal will redirect to this URL after approval
        cancel_url: "http://localhost:8000/api/v1/paypal/cancel"
      },
      transactions: [
        {
          amount: {
            currency:currency,
            total: total
          },
          description: "Test Payment"
        }
      ]
    };
  
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error });
      } else {
        // Find the approval URL and send it in the response
        const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
        res.json({ approval_url: approvalUrl });
      }
    });
}

exports.paypalExecute = async(req, res) => {
    const { paymentId, PayerID } = req.query;

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00" // Ensure this matches the amount used in create-payment
        }
      }
    ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error(error.response);
      res.status(500).json({ error: error.response });
    } else {
      res.json({ message: "Payment executed successfully", payment });
    }
  });
}