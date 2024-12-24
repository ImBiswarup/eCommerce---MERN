import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);

const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("card"); 
    const [qrCodeUrl, setQrCodeUrl] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:3000/api/payment/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000, currency: 'inr' }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error: ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
                setQrCodeUrl(data.qrCodeUrl);
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("Failed to fetch payment intent. Please try again.");
            });
    }, []);
    

    const handleCardPayment = async (event) => {
        event.preventDefault();
        if (!clientSecret || !stripe || !elements) {
            setErrorMessage('Stripe has not loaded or clientSecret is missing');
            return;
        }
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: { name: 'Customer Name' },
            },
        });

        if (error) {
            setErrorMessage(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            setErrorMessage("");
            alert('Payment successful!');
        }
    };

    const handleQrPayment = () => {
        alert("Please scan the QR code to complete your payment.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Choose Payment Method
                </h2>

                {/* Payment Method Selector */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`py-2 px-4 rounded-md font-semibold ${
                            selectedMethod === "card"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setSelectedMethod("card")}
                    >
                        Credit/Debit Card
                    </button>
                    <button
                        className={`py-2 px-4 rounded-md font-semibold ${
                            selectedMethod === "qr"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setSelectedMethod("qr")}
                    >
                        QR Code
                    </button>
                </div>

                {/* Card Payment Form */}
                {selectedMethod === "card" && (
                    <form onSubmit={handleCardPayment} className="space-y-4">
                        <div className="border border-gray-300 rounded-md p-3">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#333',
                                            '::placeholder': { color: '#888' },
                                        },
                                        invalid: { color: '#e3342f' },
                                    },
                                }}
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-center">{errorMessage}</div>
                        )}
                        <button
                            type="submit"
                            disabled={!stripe || !clientSecret}
                            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
                                stripe && clientSecret
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Pay  Rs. 50.00
                        </button>
                    </form>
                )}

                {/* QR Code Payment */}
                {selectedMethod === "qr" && qrCodeUrl && (
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={qrCodeUrl}
                            alt="QR Code for Payment"
                            className="w-48 h-48"
                        />
                        <button
                            onClick={handleQrPayment}
                            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            I’ve Paid
                        </button>
                        <p className="text-gray-500 text-center">
                            Scan the QR code with your payment app to complete the payment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;