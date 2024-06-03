import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {},
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            // Payment succeeded, handle success
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-white shadow-md rounded px-4 pt-3 pb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card details
                    <CardElement
                    className="mt-2 border-2 p-1 "
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </label>
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="bg-blue-500 p-1 w-fit mt-4 mx-auto justify-center items-center flex rounded-md text-white hover:bg-green-500" disabled={!stripe}>
                    Pay Now
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
