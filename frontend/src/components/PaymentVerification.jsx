import React, { useState } from 'react';
import axios from 'axios';

const PaymentVerification = () => {
  const [reference, setReference] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  // URL parameter style verification
  const verifyPaymentByUrlParam = async () => {
    try {
      const response = await axios.get(`/verify-payment/${reference}/`);
      setVerificationResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Verification failed');
      setVerificationResult(null);
    }
  };

  // Query parameter style verification
  const verifyPaymentByQueryParam = async () => {
    try {
      const response = await axios.get(`/verify-payment/?reference=${reference}`);
      setVerificationResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Verification failed');
      setVerificationResult(null);
    }
  };

  // POST style verification
  const verifyPaymentByPost = async () => {
    try {
      const response = await axios.post('/verify-payment/', { reference });
      setVerificationResult(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Verification failed');
      setVerificationResult(null);
    }
  };

  return (
    <div>
      <h2>Payment Verification</h2>
      <input 
        type="text" 
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Enter payment reference"
      />
      
      <div>
        <button onClick={verifyPaymentByUrlParam}>
          Verify by URL Param
        </button>
        <button onClick={verifyPaymentByQueryParam}>
          Verify by Query Param
        </button>
        <button onClick={verifyPaymentByPost}>
          Verify by POST
        </button>
      </div>

      {verificationResult && (
        <div>
          <h3>Verification Result:</h3>
          <pre>{JSON.stringify(verificationResult, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentVerification;