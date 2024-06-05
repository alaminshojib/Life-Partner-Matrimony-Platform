import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGem } from '@fortawesome/free-solid-svg-icons';
import CheckoutModal from './CheckoutModal'; // Import your CheckoutModal component here

const BioDetailsData = ({ singleData, isPremiumUser, isFavorite }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // State to control the visibility of the checkout modal
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(isFavorite); // State to track if the biodata is added to favorites

  const handleAction = () => {
    if (!isPremiumUser) {
      setShowCheckoutModal(true); // Open the checkout modal
    }
  };

  const addToFavorites = () => {
    // Logic to add the biodata to favorites
    // For demonstration purposes, I'll just toggle the state
    setIsAddedToFavorites(!isAddedToFavorites);
    // You can perform API calls or dispatch actions to add the biodata to favorites
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
        <div className="flex items-center space-x-2">
          {!isPremiumUser && (
            <FontAwesomeIcon icon={faGem} className="text-yellow-500 text-xl" />
          )}
          <FontAwesomeIcon 
            icon={faStar} 
            className={`text-xl cursor-pointer ${isAddedToFavorites ? "text-yellow-500" : "text-gray-500"}`} 
            onClick={addToFavorites} 
          />
          {isPremiumUser && (
            <FontAwesomeIcon icon={faGem} className="text-yellow-500 text-xl" />
          )}
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-600">Details:</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 text-purple-500">Name:</td>
                <td>{singleData?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500">Permanent Division:</td>
                <td>{singleData?.permanent_division}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500">Age:</td>
                <td>{singleData?.age}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-purple-500">Occupation:</td>
                <td>{singleData?.occupation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {!isPremiumUser && (
          <button 
            onClick={handleAction} 
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-fit btn-gradient justify-center mx-auto flex hover:bg-blue-600 transition duration-300"
          >
            Request Contact Info
          </button>
        )}
      </div>
      {showCheckoutModal && <CheckoutModal onClose={() => setShowCheckoutModal(false)} userData={singleData} />}
    </div>
  );
};

export default BioDetailsData;
