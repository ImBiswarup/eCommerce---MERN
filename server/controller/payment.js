const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const QRCode = require('qrcode');

const createPaymentIntent = async (req, res) => {
    const { amount, currency } = req.body;

    // console.log(stripe);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        const qrCodeUrl = await QRCode.toDataURL(
            `upi://pay?pa=merchant@upi&pn=Merchant Name&am=${amount / 100}&cu=${currency}&mode=02`
        );

        res.send({
            clientSecret: paymentIntent.client_secret,
            qrCodeUrl,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { createPaymentIntent };
