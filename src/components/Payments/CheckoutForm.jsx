import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalPrice, onClose, items, refetch}) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate=useNavigate();
console.log(items)
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await axiosSecure.post('/create-payment-intent', { amount: totalPrice * 100 }); // Stripe expects amount in cents
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
                setError('Failed to fetch payment details. Please try again.');
            }
        };

        if (totalPrice > 0) fetchClientSecret();
    }, [totalPrice, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

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

            if (paymentIntent.status === 'succeeded') {
                // Payment succeeded, proceed to post payment details to your backend
                const paymentData = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'Pending', // Assuming this is the status you want to set
                    items: items.map(item => ({
                        name: item?.name,
                        occupation: item?.occupation,
                        biodataId: item?.biodataId,
                        mobile_number: item?.mobile_number,
                        contact_email: item?.contact_email
                    })),
                    // Add any additional data you want to send
                };

                // Post payment data to your backend API
                await axiosSecure.post('/payments', paymentData);

                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: 'Your payment was successful!',
                });

                // Reset form state and close modal
                setTransactionId(paymentIntent.id);
                onClose();
                refetch();
                navigate('/dashboard/my-contact-request')
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
            <div className="mb-4">
                <p className="text-gray-700 mb-2">User Email: {user.email}</p>
                <p className="text-gray-700 mb-2">User BiodataIds: {items.map((item, index) => (
                        <li key={index}>{item.biodataId}</li>
                    ))}</p>
                
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <CardElement
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
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}
                    className="w-full btn btn-primary mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    {loading ? 'Processing...' : 'Pay'}
                </button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {transactionId && <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
    
    
};

export default CheckoutForm;
