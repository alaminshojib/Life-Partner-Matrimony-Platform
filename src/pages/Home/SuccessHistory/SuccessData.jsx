import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const SuccessData = ({ review }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="border-2 container flex flex-col max-w-80 h-96 mt-7 p-10 mx-auto divide-y space-y-3 rounded-lg">
      <div className="w-full">
        <div className="mx-auto justify-between">
          <div className="mx-auto flex justify-center mb-3">
            <img
              src={review.coupleImageLink}
              alt=""
              className="object-cover w-16 h-16 rounded-full"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <div>
              <h4 className="font-bold text-sm">Biodata Id: {review.selfBiodataId}</h4>
              <span className="text-xs">Marriage Date: {new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-700">
              <span className="text-xs font-bold">Rating: <AiFillStar className="text-sm" /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2 text-center text-sm">
        <p>{`${review.story.slice(0, 200)}${review.story.length > 200 ? "..." : ""}`}</p>
        {review.story.length > 200 && (
          <button
            onClick={toggleModal}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            See more
          </button>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Full Story</h2>
            <p>{review.story}</p>
            <button
              onClick={toggleModal}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessData;
