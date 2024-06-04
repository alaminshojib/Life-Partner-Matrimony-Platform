import { useState } from "react";
import axios from 'axios';

const BioDetailsData = ({ singleData, isPremiumUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.patch(`/biodatas/premium/${singleData.contactEmail}`);
      if (response.status === 200) {
        setIsFavorite(true);
      } else {
        throw new Error("Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRequestContactInfo = () => {
    // Your logic for requesting contact info
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/checkouts", {
        biodataId: singleData?.id, // Ensure singleData is not null before accessing properties
        // Include other necessary checkout data here
      });
      if (response.status === 200) {
        // Handle success, if needed
        console.log("Checkout successful");
      } else {
        throw new Error("Failed to create checkout");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const rows = singleData ? [
    { name: 'Name:', value: singleData.name },
    { name: 'Permanent Division:', value: singleData.permanentDivision },
    { name: 'Age:', value: singleData.age },
    { name: 'Occupation:', value: singleData.occupation },
  ] : [];

  return (
    <div className="container flex flex-col w-fit h-fit max-w-lg mx-auto divide-y rounded-md border-2 divide-gray-700 bg-white text-black">
      <div className="flex justify-between p-3 gap-10">
        <div className="flex space-x-4">
          <img src={singleData?.featuredImg} alt="" className="object-cover w-12 h-12 rounded-full bg-gray-500" />
          <div>
            <h4 className="font-bold">Biodata Id : {singleData?.id}</h4> {/* Ensure singleData is not null before accessing properties */}
            <span className="text-xs text-gray-400">Biodata Type : {singleData?.biodata_type}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          <span className="text-xl font-bold">{isPremiumUser ? 'Premium' : 'Normal'}</span>
          {!isPremiumUser && <button onClick={handleAddToFavorites} className="text-xl font-bold">Add to Favourites</button>}
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm text-gray-400">
        <div>
          <h3 className="text-lg font-bold mb-2">Details:</h3>
          <table className="w-full">
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="font-semibold">{row.name}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Checkout button */}
        {!isPremiumUser && (
          <button onClick={handleRequestContactInfo} className="btn btn-sm btn-outline hover:bg-red-800 border-0 border-b-2 mx-auto justify-center items-center text-center px-2 w-fit flex text-white bg-red-500 m-4">
            Request Contact info.
          </button>
        )}
        <button onClick={handleCheckout} className="btn btn-sm btn-outline hover:bg-red-800 border-0 border-b-2 mx-auto justify-center items-center text-center px-2 w-fit flex text-white bg-red-500 m-4">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BioDetailsData;
