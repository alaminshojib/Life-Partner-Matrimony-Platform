import ReactModal from 'react-modal';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentModal = ({ isOpen, onClose, onSubmit, user, biodataId }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4  shadow-lg"
            overlayClassName="overlay fixed top-0 left-0  bg-black flex justify-center items-center"
        >
            <div className="w-64">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold">Payment Information</h2>
                    <button onClick={onClose} className=" hover:text-red-500 text-red-300 font-bold focus:outline-none">
                        X
                    </button>
                </div>
                <div className="border-b border-gray-300 mb-4"></div>
                <div className="mb-4 px-4">
                    <label htmlFor="biodataId" className="block text-gray-700 font-semibold">Biodata Id :</label>
                    <input type="text" id="biodataId" disabled className="form-input border-none w-full mt-1" value={biodataId} readOnly />
                </div>
                <div className="mb-4 px-4">
                    <label htmlFor="selfEmail" className="block text-gray-700 font-semibold">Email :</label>
                    <input type="email" id="selfEmail" disabled className="form-input w-full border-none mt-1" value={user.email} readOnly />
                </div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm user={user} onSubmit={onSubmit} />
                </Elements>
            </div>
        </ReactModal>
    );
};

export default PaymentModal;
