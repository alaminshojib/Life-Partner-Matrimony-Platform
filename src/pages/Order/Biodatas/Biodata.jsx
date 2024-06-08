
import React, { useState, useEffect } from "react";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCheckout from "../../../hooks/useCheckouts";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";

const Biodata = ({ singleData }) => {
  const [showFavouriteModal, setShowFavouriteModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [checkouts, refetch] = useCheckout();
  const [menu] = useMenu();
  const [alert, setAlert] = useState(null);


  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2000); // Auto dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleRequestContact = async () => {
    try {
      if (!user || !user.email) {
        throw new Error("User not logged in");
      }

      const checkoutsItem = {
        menuId: singleData?._id,
        email: user?.email,
        name: singleData?.name,
        image: singleData?.image,
        contact_email: singleData?.contact_email,
        mobile_number: singleData?.mobile_number,


      };

      const alreadyInCheckouts = checkouts.some(item => item.menuId === checkoutsItem.menuId);
      if (alreadyInCheckouts) {
        throw new Error(`${singleData.name} is already in your checkouts`);
      }

      const res = await axiosSecure.post('/checkouts', checkoutsItem);
      if (res.data && res.data.message === 'Checkout item saved successfully') {
        setAlert(
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
          >
            {`${singleData.name} added to your checkouts`}
          </Alert>
        );
        refetch();
      } else {
        throw new Error("Failed to add to checkouts");
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert(
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
        >
          {error.message || 'Failed to add to your checkouts'}
        </Alert>
      );
    } finally {
      navigate("/dashboard/checkouts")
    }
  }

  const handleAddToFavorites = async () => {
    setShowFavouriteModal(true);
    try {
      if (!user || !user.email) {
        throw new Error("User not logged in");
      }

      const favouritesItem = {
        menuId: singleData?._id,
        email: user?.email,
        name: singleData?.name,
        occupation: singleData?.occupation,
        contact_email: singleData?.contact_email,
        permanent_division: singleData?.permanent_division
      };

      const res = await axiosSecure.post('/favourites', favouritesItem);
      if (res?.data && res?.data?.message === 'Favourite item saved successfully') {
        setAlert(
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlert(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
          >
            {`${singleData?.name} added to your favourites`}
          </Alert>
        );
        refetch();
      } else {
        throw new Error(`${singleData?.name} already exists in favourites`);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert(
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
        >
          {error.message || 'Already Added in Favourites Lists'}
        </Alert>
      );
    } finally {
      setShowFavouriteModal(false);
    }
  };


  const handleConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmationConfirm = () => {
    setShowConfirmationModal(false);
    handleRequestContact();
  };

  return (
    <div className="container flex flex-col min-w-64 min-h-fit max-w-md mx-auto divide-y rounded-lg border border-gray-300 shadow-lg">
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <img src={singleData?.featuredImg} alt="" className="w-12 h-12 rounded-full bg-gray-200" />
          <div>
            <h4 className="font-semibold text-white">Biodata Id: {singleData?.id}</h4>
            <span className="text-sm text-gray-100">Type: {singleData?.biodata_type}</span>
          </div>
        </div>
        <div className="text-red-500">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-xl cursor-pointer"
            onClick={handleAddToFavorites}
          />
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Details:</h3>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 text-blue-500">Name:</td>
                <td>{singleData?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-blue-500">Permanent Division:</td>
                <td>{singleData?.permanent_division}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-blue-500">Age:</td>
                <td>{singleData?.age}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 text-blue-500">Occupation:</td>
                <td>{singleData?.occupation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-5">
        
          <Link
            to={`/bioDetails/${singleData._id}`}
            className="btn btn-sm btn-outline rounded-md p-1  hover:bg-blue-500 border-0 border-b-2 mx-auto justify-center items-center text-center px-2 w-fit flex text-white bg-blue-700"
            onClick={() => window.scrollTo(0, 0)}
          >
            View Profile
          </Link>

       </div>
      </div>
      {alert}
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-[10] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <p className="text-lg mb-4">Are you sure you want to request contact info for {singleData?.name}?</p>
            <div className="flex justify-end">
              <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={handleConfirmationClose}>Cancel</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConfirmationConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Biodata;

