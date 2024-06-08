// // BioGrid.js
// import React, { useState } from 'react';
// import BioDetailsData from './BioDetailsData';

// const BioGrid = ({ biodatas }) => {
//   // State for current page
//   const [currentPage, setCurrentPage] = useState(1);
//   // Number of items to display per page
//   const itemsPerPage = 6;

//   // Calculate the index of the first and last item to display
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // Slice the array of biodatas to display only the items for the current page
//   const currentBiodatas = biodatas.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className=" bg-fixed text-white ">
//       <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-md justify-around">
//         {currentBiodatas.map((bio, index) => (
//           <BioDetailsData key={index} singleData={bio} />
//         ))}
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         {biodatas.length > itemsPerPage && (
//           <ul className="flex space-x-2">
//             {Array.from({ length: Math.ceil(biodatas.length / itemsPerPage) }, (_, i) => (
//               <li key={i}>
//                 <button
//                   onClick={() => paginate(i + 1)}
//                   className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'}`}
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BioGrid;
