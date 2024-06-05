// BioDetailsData.jsx

import React, { useState } from "react";
import Swal from 'sweetalert2';
import CheckoutModal from './CheckoutModal'; // Import your CheckoutModal component here

const BioDetailsData = ({ singleData, isPremiumUser }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // State to control the visibility of the checkout modal

  const handleAction = () => {
    if (!isPremiumUser) {
      setShowCheckoutModal(true); // Open the checkout modal
    }
  };

  return (
    <div className="container flex flex-col w-full max-w-md mx-auto divide-y rounded-lg border border-gray-300 shadow-lg">
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <img src={singleData?.featuredImg} alt="" className="w-12 h-12 rounded-full bg-gray-200" />
          <div>
            <h4 className="font-semibold text-white">Biodata Id: {singleData?.id}</h4>
            <span className="text-sm text-gray-100">Type: {singleData?.biodata_type}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-600">Details:</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 text-purple-500 border border-gray-300">Name:</td>
                <td className="border border-gray-300">{singleData?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500 border border-gray-300">Permanent Division:</td>
                <td className="border border-gray-300">{singleData?.permanent_division}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500 border border-gray-300">Age:</td>
                <td className="border border-gray-300">{singleData?.age}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500 border border-gray-300">Occupation:</td>
                <td className="border border-gray-300">{singleData?.occupation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {!isPremiumUser && (
          <button onClick={handleAction} className="bg-blue-500 text-white p-1 rounded-md w-fit  btn-gradient justify-center mx-auto flex hover:bg-green-400">
            Request Contact Info
          </button>
        )}
      </div>
      {showCheckoutModal && <CheckoutModal onClose={() => setShowCheckoutModal(false)} userData={singleData} />}
    </div>
  );
};

export default BioDetailsData;
