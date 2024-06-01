import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Marrital Status :', 159, 6.0, 24, 4.0),
  createData('Permanent Division :', 237, 9.0, 37, 4.3),
  createData('Age :', 262, 16.0, 24, 6.0),
  createData('Occupation :', 305, 3.7, 67, 4.3),
];

const Featured = () => {
  return (
   <div>
      
      <div className="container flex flex-col w-fit h-fit max-w-lg p-3 mx-auto divide-y rounded-md border-2  divide-gray-700 bg-white text-black">
          <div className="flex justify-between p-4  gap-10">
            <div className="flex space-x-4">
                <img src={featuredImg} alt="" className="object-cover w-12 h-12 rounded-full bg-gray-500" />
              <div>
                <h4 className="font-bold">Biodata Id : </h4>
                <span className="text-xs text-gray-400">Biodata Type :  </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
             
              <span className="text-xl font-bold">Premium</span>
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm text-gray-400">
            <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
              <Table >
                
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <Link className="btn btn-xs btn-outline hover:bg-green-500 border-0 border-b-2 mx-auto rounded-lg justify-center items-center text-center px-2 w-fit flex text-white bg-blue-500 m-4">View Profile</Link>
            </TableContainer>
          </div>
        </div>
      
    </div>
  );
};

export default Featured;
