import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import PaymentModal from '../../../components/Payments/PaymentModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckoutPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkouts, setCheckouts] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCheckouts = async () => {
      setLoading(true);
      try {
        const checkoutsResponse = await axiosSecure.get('/checkouts');
        const paymentsResponse = await axiosSecure.get(`/payments/${user.email}`);
  
        const paidCheckoutIds = paymentsResponse.data.map(payment => payment.checkoutId);
  
        const unpaidCheckouts = checkoutsResponse.data.filter(checkout => !paidCheckoutIds.includes(checkout._id));
  
        // Assign a default price of $5 to each item if price is not provided
        const checkoutsWithDefaultPrice = unpaidCheckouts.map(item => ({
          ...item,
          price: item.price || 5,
        }));
  
        setCheckouts(checkoutsWithDefaultPrice);
  
        const totalPrice = checkoutsWithDefaultPrice.reduce((total, item) => total + item.price, 0);
        setTotalPrice(totalPrice);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCheckouts();
  }, [axiosSecure, user.email]);
  

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCheckouts = checkouts.filter((item) => item._id !== id);
        setCheckouts(updatedCheckouts);
        deleteItemFromServer(id);
      }
    });
  };

  const deleteItemFromServer = async (id) => {
    try {
      await axiosSecure.delete(`/checkouts/${id}`);
      console.log('Item deleted from server:', id);
    } catch (error) {
      console.error('Error deleting item from server:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <SectionTitle heading="Checkout" />
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-2xl">Items: {checkouts.length}</h2>
          <h2 className="text-2xl">Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
        <div className="flex items-center space-x-4">
          {checkouts.length > 0 ? (
            <button
              onClick={() => setModalIsOpen(true)}
              className={`btn bg-blue-500 text-white px-6 py-2 rounded-md ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          ) : (
            <button disabled className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-not-allowed">
              Pay Now
            </button>
          )}
          <Link to="/biodatas">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-700">Bio Datas</button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="text-center border border-gray-300 px-4 py-2">#</th>
              <th className="text-center border border-gray-300 px-4 py-2">Name</th>
              <th className="text-center border border-gray-300 px-4 py-2">Price</th>
              <th className="text-center border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((item, index) => (
              <tr key={item._id}>
                <td className="text-center border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="text-center border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="text-center border border-gray-300 px-4 py-2">${item?.price?.toFixed(2)}</td>
                <td className="text-center border border-gray-300 px-4 py-2">
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaymentModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} totalPrice={totalPrice} />
    </div>
  );
};

export default CheckoutPage;
