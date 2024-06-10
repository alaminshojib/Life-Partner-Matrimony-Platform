import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import PaymentModal from '../../../components/Payments/PaymentModal';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const CheckoutPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: checkouts = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['checkouts'],
    queryFn: async () => {
      const response = await axiosSecure.get('/checkouts');
      return response.data.map(item => ({
        ...item,
        price: item.price || 5, // Set default price to $5 if price is not provided
      }));
    },
  });

  useEffect(() => {
    if (checkouts.length > 0) {
      const total = checkouts.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    }
  }, [checkouts]);

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
        deleteItemFromServer(id);
      }
    });
  };

  const deleteItemFromServer = async (id) => {
    try {
      await axiosSecure.delete(`/checkouts/${id}`);
      refetch(); // Refetch data immediately after deletion
    } catch (error) {
      console.error('Error deleting item from server:', error);
    }
  };

  const handlePayNow = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      {!modalIsOpen && (
        <>
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Checkout</h2>
          {isError && <div className="text-red-600">An error occurred</div>}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl">Items: {checkouts.length}</h2>
              <h2 className="text-2xl">Total Price: ${totalPrice.toFixed(2)}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePayNow}
                className={`btn bg-blue-500 text-white px-6 py-2 rounded-md ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                disabled={isLoading || checkouts.length === 0}
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
              </button>
              <Link to="/biodatas">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-700">Bio Datas</button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse border border-gray-300">
              <thead>
                <tr className='bg-blue-500 text-white'>
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
                    <td className="text-center border border-gray-300 px-4 py-2">${item.price.toFixed(2)}</td>
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
        </>
      )}
      {modalIsOpen && (
        <PaymentModal items={checkouts} refetch={refetch} isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} totalPrice={totalPrice} />
      )}
    </div>
  );
  
};

export default CheckoutPage;
