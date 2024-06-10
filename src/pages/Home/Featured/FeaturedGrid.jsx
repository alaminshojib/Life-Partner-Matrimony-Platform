import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Biodata from '../../Order/Biodatas/Biodata';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {},
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const FeaturedGrid = () => {
  const axiosPublic = useAxiosPublic();
  const [premiumBiodatas, setPremiumBiodatas] = useState([]);
  const [sortOrder, setSortOrder] = useState('ascending');

  useEffect(() => {
    const fetchPremiumBiodata = async () => {
      try {
        // Make a GET request to fetch all premium biodata
        const response = await axiosPublic.get(`/biodatas`);
        const premiumData = response.data.filter(biodata => biodata?.isPremium);
        setPremiumBiodatas(premiumData);
      } catch (error) {
        console.error('Error fetching premium biodata:', error);
      }
    };

    fetchPremiumBiodata();
  }, [axiosPublic]); // Include axiosPublic in dependencies

  // Sorting the premiumBiodatas based on the selected order
  const sortedPremiumBiodatas = [...premiumBiodatas].sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a?.age - b?.age;
    } else {
      return b?.age - a?.age;
    }
  });

  return (
    <div className="featured-item bg-fixed py-5">
      <SectionTitle heading="Some premium Members!" />
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="ascending">Age: Ascending</option>
          <option value="descending">Age: Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-around px-5 pt-3">
        {sortedPremiumBiodatas.slice(0, 6).map((premiumBiodata) => (
          <Biodata key={premiumBiodata._id} singleData={premiumBiodata} />
        ))}
      </div>

    </div>
  );
};

export default FeaturedGrid;
