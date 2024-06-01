import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import featuredImg from '../../../assets/home/featured.jpg'; // Import your image file
import { TableContainer } from '@mui/material';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   fontSize: 14,
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

const Biodata = () => {
  const rows = [
    { name: 'Name', value: 'John Doe' },
    { name: 'Age', value: '30' },
    { name: 'Occupation', value: 'Engineer' },
    // Add more rows as needed
  ];

  return (
    <div className="container flex flex-col w-fit h-fit max-w-lg p-3 mx-auto divide-y rounded-md border-2 divide-gray-700 bg-white text-black">
      <div className="flex justify-between p-4 gap-10">
        <div className="flex space-x-4 items-center">
          <img src={featuredImg} alt="Profile" className="object-cover w-12 h-12 rounded-full bg-gray-500" />
          <div>
            <h4 className="font-bold">Biodata Id: 12345</h4>
            <span className="text-xs text-gray-400">Biodata Type: Basic</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          <span className="text-xl font-bold">Premium</span>
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm text-gray-400">
        <TableContainer component={Paper} className="max-w-full">
          <Table>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link to={"bioDetails"} className="btn btn-xs btn-outline hover:bg-green-500 border-0 border-b-2 mx-auto justify-center items-center text-center px-2 w-fit flex text-white bg-blue-500 m-4">View Profile</Link>
        </TableContainer>
      </div>
    </div>
  );
};

export default Biodata;
