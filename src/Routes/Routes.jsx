import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import BiodatasPage from "../pages/Order/Biodatas/BiodatasPage";
import BioDetails from "../pages/Order/Biodatas/BioDetails";
import EditBiodata from "../pages/Dashboard/EditBiodata/EditBiodata";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ViewBiodata from "../pages/Dashboard/ViewBiodata/ViewBiodata";
import MyContactRequest from "../pages/Dashboard/MyContactRequest/MyContactRequest";
import MyfavouritesBiodata from "../pages/Dashboard/MyfavouritesBiodata/MyfavouritesBiodata";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ApprovedPremium from "../pages/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../pages/ApprovedContactRequest/ApprovedContactRequest";
import CheckoutPage from "../pages/Dashboard/CheckoutPage/CheckoutPage";
import GotMarried from "../pages/Dashboard/GotMarried/GotMarried";
import PaymentModal from "../components/Payments/PaymentModal";
import MarriedSuccess from "../pages/Shared/MarriedSuccess/MarriedSuccess";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        
     
        {
          path: 'biodatas',
          element: <BiodatasPage></BiodatasPage>
        },
        {
          path: 'bioDetails/:id',
          element: <BioDetails></BioDetails>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'aboutUs',
          element: <About></About>
        },
        {
          path: 'contactUs',
          element: <Contact></Contact>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
       
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'edit-biodata',
          element: <EditBiodata></EditBiodata>
        },
        {
          path: 'view-biodata',
          element: <ViewBiodata></ViewBiodata>
        },
        {
          path: 'my-contact-request',
          element: <MyContactRequest></MyContactRequest>
        },
        {
          path: 'my-favourites-biodata',
          element: <MyfavouritesBiodata></MyfavouritesBiodata>
        },
       
        {
          path: 'checkouts',
          element: <CheckoutPage></CheckoutPage>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

        // admin only routes
        {
          path: 'adminHome',
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'addItems',
          element: <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path: 'manageItems',
          element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/biodatas/${params.id}`)
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'manage',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'approvedPremium',
          element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
        },
        {
          path: 'approvedContactRequest',
          element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>
        },
        {
          path: 'success-stories',
          element: <AdminRoute><MarriedSuccess></MarriedSuccess> </AdminRoute>
        },
        {
          path: 'success-story',
          element: <GotMarried></GotMarried>
        },
        {
          path: 'payments',
          element: <PaymentModal></PaymentModal>
        }


      ]
    }
  ]);