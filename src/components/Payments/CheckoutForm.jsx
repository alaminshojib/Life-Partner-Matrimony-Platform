import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCheckouts from '../../hooks/useCheckouts';

const CheckoutForm = ({ totalPrice, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [checkouts, refetch] = useCheckouts();

    const fetchClientSecret = async () => {
        try {
            const response = await axiosSecure.post('/create-payment-intent', { amount: totalPrice * 100 }); // Stripe expects amount in cents
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error('Error fetching client secret:', error);
            setError('Failed to fetch payment details. Please try again.');
        }
    };

    useEffect(() => {
        if (totalPrice > 0) fetchClientSecret();
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        const cardElement = elements.getElement(CardElement);
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                email: user.email,
                name: user.displayName || 'Anonymous',
            },
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: paymentMethodError.message,
            });
            setLoading(false);
            return;
        }

        try {
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Confirmation Error',
                    text: confirmError.message,
                });
                setLoading(false);
                return;
            }

            if (paymentIntent.status == 'succeeded') {
                setTransactionId(paymentIntent.id);
                const paymentData = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    Status: 'Successful',
                };

                await axiosSecure.post('/payments', paymentData);

                // Post all items to /confirm-payment
                const confirmPaymentData = checkouts.map((item) => ({
                    ...item,
                    transactionId: paymentIntent.id,
                }));

                await axiosSecure.post('/confirm-payment', { items: confirmPaymentData });

                // Delete all items
                const deletePromises = checkouts.map((item) =>
                    axiosSecure.delete(`/checkouts/${item.id}`)
                );
                await Promise.all(deletePromises);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Payment successful!',
                    showConfirmButton: false,
                    timer: 1500,
                });

                refetch(); // Refetch the checkouts to update the state
                onClose();
                setTransactionId(''); // Reset transaction ID
            } else {
                setError('Payment failed');
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    text: 'Payment was not successful. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            setError('Failed to confirm payment. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: 'Failed to confirm payment. Please try again.',
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complete Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <CardElement options={{
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
                    }} />
                </div>
                <button type="submit" disabled={!stripe || !clientSecret || loading} className="w-full btn btn-primary mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                    {loading ? 'Processing...' : 'Pay'}
                </button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {transactionId && <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
