import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PayPalButton from './PayPalButton';

const cart = {
  products: [
    {
      name: 'Stylish Jacket',
      size: 'M',
      color: 'Black',
      price: 120,
      image: 'https://picsum.photos/150?random=1',
    },
    {
      name: 'cASULE Sneakers',
      size: '42',
      color: 'Black',
      price: 170,
      image: 'https://picsum.photos/150?random=3',
    },
  ],
  totalPrice: 195,
};
export default function CheckOut() {
  const navigate = useNavigate();
  const [checkOutId, setCheckOutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalcode: '',
    country: '',
    phone: '',
  });

  const handleCreateCheckOut = e => {
    e.preventDefault(), setCheckOutId(123);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* leftsection */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">CheckOut </h2>
        <form onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email{' '}
            </label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4 ">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={e =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 ">Last Name</label>
              <input
                type="text"
                value={shippingAddress.LastName}
                onChange={e =>
                  setShippingAddress({
                    ...shippingAddress,
                    LastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700"> Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={e => {
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                });
              }}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 ">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={e =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 ">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalcode}
                onChange={e =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalcode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 ">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={e =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 ">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={e =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {!checkOutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4"> Pay With Paypal </h3>
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  OnError={err => alert('Payment failed,Try again')}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
