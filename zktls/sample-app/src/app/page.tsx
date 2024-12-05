"use client";

import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { useState } from 'react';
import QRCode from 'react-qr-code';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET;
const PROVIDER_ID = process.env.NEXT_PUBLIC_PROVIDER_ID;

/**
 * Home Component
 * @returns 
 */
export default function Home() {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);

  /**
   * Get Verification Request method
   */
  const getVerificationReq = async () => {
    // Initialize the Reclaim SDK with your credentials
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID!, APP_SECRET!, PROVIDER_ID!);
 
    // Generate the verification request URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();
    console.log('Request URL:', requestUrl);

    setRequestUrl(requestUrl);

    // Start listening for proof submissions
    await reclaimProofRequest.startSession({
      // Called when the user successfully completes the verification
      onSuccess: (proofs) => {
        console.log('Verification success', proofs);
        setProofs(proofs as any);
        // Add your success logic here, such as:
        // - Updating UI to show verification success
        // - Storing verification status
        // - Redirecting to another page
      },
      // Called if there's an error during verification
      onError: (error) => {
        console.error('Verification failed', error);
 
        // Add your error handling logic here, such as:
        // - Showing error message to user
        // - Resetting verification state
        // - Offering retry options
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={getVerificationReq}>Get Verification Request</button>
      {/* Display QR code when URL is available */}
      {requestUrl && (
        <div style={{ margin: '20px 0' }}>
          <QRCode value={requestUrl} />
        </div>
      )}
      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
