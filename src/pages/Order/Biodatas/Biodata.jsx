// Biodata.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import featuredImg from '../../../assets/home/featured.jpg'; // Import your image file
import { TableContainer } from '@mui/material';

const Biodata = ({ bio }) => {
  if (!bio) return null;

  return (
    <div className="container flex flex-col w-fit max-h-96  max-w-lg p-3 mx-auto rounded-md border-2 divide-gray-700 bg-white text-black">
      <div className='flex justify-between px-4'>
        <img src={featuredImg} alt="Profile" className="object-cover w-12 h-12 rounded-full bg-gray-500" />
        <div className="text-yellow-500">
          <span className="text-sm font-bold">Premium</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-between gap-20 px-2">
            <h4 className="font-bold">Biodata Id: {0}</h4>
            <span className="text-xs text-gray-400">{bio.biodata_type}</span>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-400">
        <TableContainer component={Paper} className="max-w-full text-xs">
          <Table>
            <TableBody>
              <TableRow >
                <TableCell >
                  <p>Name</p>
                </TableCell>
                <TableCell align="center">{bio.name}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell>
                  <p>Age</p>
                </TableCell>
                <TableCell align="center">{bio.age}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell >
                  <p>Occupation</p>
                </TableCell>
                <TableCell align="center">{bio.occupation}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell >
                  <p>P. Division</p>
                </TableCell>
                <TableCell align="center">{bio.permanent_division}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={`/bioDetails/${bio._id}`} className="btn btn-sm btn-outline rounded-md py-1 hover:bg-green-500 border-0 border-b-2 mx-auto justify-center items-center text-center px-2 w-fit flex text-white bg-blue-500 m-4">View Profile</Link>
      </div>
    </div>
  );
};

export default Biodata;
