import React from 'react';
import Modal from 'react-modal';
import CheckoutForm from './CheckoutForm';

const PaymentModal = ({ isOpen, onClose, totalPrice, items , refetch}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            style={{
                overlay: {
                    display: 'flex',
                    alignItems: 'center', // Vertically center
                    justifyContent: 'center', // Horizontally center
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
                },
                content: {
                    position: 'relative',
                    maxWidth: '600px',
                    margin: 'auto',
                    border: 'none',
                    background: '#fff', // Set background color of modal content
                    
                },
            }}
        >
            <CheckoutForm totalPrice={totalPrice} onClose={onClose} items={items} refetch={refetch}/>
        </Modal>
    );
};

export default PaymentModal;
