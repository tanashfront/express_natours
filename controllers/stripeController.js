// const { default: Stripe } = require('stripe');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.stripePayment = async(req, res) => {
    try {
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount,
                currency,
                payment_method_types:['card'],
            }
        );
        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Payment failed! please try again"
        });
    }
}