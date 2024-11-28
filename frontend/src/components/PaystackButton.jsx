import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const PaystackButton = ({ email, amount, onSuccess }) => {
    const config = {
        reference: new Date().getTime().toString(),
        email: email,
        amount: amount * 100, // Convert to kobo
        publicKey: 'pk_test_478f8870fb9918b4449f20bf42d181f2040af112',
    };

    const initializePayment = usePaystackPayment(config);

    const handlePayment = () => {
        initializePayment(
            (reference) => {
                console.log('Payment success:', reference);
                onSuccess(reference); // Trigger parent callback
            },
            () => {
                console.error('Payment closed by user');
            }
        );
    };

    return (
        <button onClick={handlePayment}>
            Pay Now
        </button>
    );
};



const verifyPayment = async (reference) => {
    try {
        const verificationResponse = await fetch(
            `/api/verify-payments/${reference}/`,  // Make sure this matches your Django URL pattern
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const data = await verificationResponse.json();
        return data;
    } catch (error) {
        console.error('Verification failed:', error);
        throw error;
    }
};




export default PaystackButton;
