import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function PayPalButton({ amount, onSuccess, onError }) {
  return (
    <>
      <PayPalScriptProvider
        options={{
          'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
          components: 'buttons',
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(amount).toFixed(2),
                    currency: 'USD',
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess);
          }}
          onError={onError}
        />
      </PayPalScriptProvider>
    </>
  );
}
