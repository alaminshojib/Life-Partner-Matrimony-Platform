import React from 'react';
import Modal from 'react-modal';
import CheckoutForm from './CheckoutForm';

const PaymentModal = ({ isOpen, onClose, totalPrice }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Payment Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <h2 className="text-2xl mb-4">Complete Your Payment</h2>
            <CheckoutForm totalPrice={totalPrice} onClose={onClose} />
        </Modal>
    );
};

export default PaymentModal;
