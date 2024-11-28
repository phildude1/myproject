import React, { useState } from 'react';
import axios from 'axios';
import PaystackPay from 'react-paystack'; // Assuming you're using react-paystack

const PaymentFlow = () => {
  const [reference, setReference] = useState('');

  const handlePaystackSuccessAction = (reference) => {
    // Automatically verify payment after successful transaction
    verifyPayment(reference);
  };

  const verifyPayment = async (paymentReference) => {
    try {
      const response = await axios.get(`/verify-payment/${paymentReference}/`);
      if (response.data.status === 'success') {
        // Handle successful payment verification
        console.log('Payment verified successfully', response.data);
      }
    } catch (error) {
      // Handle verification error
      console.error('Payment verification failed', error);
    }
  };

  return (
    <div>
      <PaystackPay
        amount={10000} // Amount in kobo
        email="user@example.com"
        metadata={{
          custom_fields: [
            {
              display_name: "Mobile Number",
              variable_name: "mobile_number",
              value: "+2348123456789"
            }
          ]
        }}
        publicKey="YOUR_PAYSTACK_PUBLIC_KEY"
        onSuccess={(reference) => handlePaystackSuccessAction(reference.reference)}
      />
    </div>
  );
};

export default PaymentFlow;