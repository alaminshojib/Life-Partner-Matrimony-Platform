import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import PaymentModal from "./PaymentModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const CheckoutPage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [checkouts, setCheckouts] = useState([]);
    const [error, setError] = useState(null);
    const totalPrice = checkouts.length * 5; // Assuming each item costs $5

    useEffect(() => {
        const fetchCheckouts = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get("/checkouts");
                setCheckouts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCheckouts();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCheckouts = checkouts.filter(item => item._id !== id);
                setCheckouts(updatedCheckouts);
                deleteItemFromServer(id);
            }
        });
    };

    const deleteItemFromServer = async (id) => {
        try {
            await axiosSecure.delete(`/checkouts/${id}`);
            console.log("Item deleted from server:", id);
        } catch (error) {
            console.error("Error deleting item from server:", error);
            // Handle error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Simulate payment processing
            await axiosSecure.post("/create-payment-intent", { price: totalPrice });
            console.log("Payment submitted");
            setModalIsOpen(false); // Close the modal after payment
        } catch (error) {
            console.error("Error processing payment:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 relative">
            <SectionTitle heading="Checkout" />
            {error && <div>Error: {error}</div>}
            <div className="flex justify-between mb-8">
                <div>
                    <h2 className="text-2xl">Items: {checkouts.length}</h2>
                    <h2 className="text-2xl">Total Price: ${totalPrice}</h2>
                </div>
                <div className="flex items-center space-x-4">
                    {checkouts.length ? (
                        <button
                            onClick={() => setModalIsOpen(true)}
                            className={`btn bg-blue-500 ${
                                loading ? "cursor-not-allowed" : "hover:bg-green-500"
                            } text-white px-6 p-1 font-bold rounded-md ${
                                loading ? "opacity-50" : "shadow-lg hover:shadow-xl transition duration-300"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    ) : (
                        <button disabled className=" bg-blue-500 hover:bg-green-500 text-white cursor-not-allowed px-6 p-1 font-bold rounded-md shadow-md">
                            Pay Now
                        </button>
                    )}
                    <Link to="/biodatas">
                        <button className=" bg-orange-500 text-white  px-6  p-1 font-bold rounded-md shadow-md transition duration-300">
                            Bio Datas
                        </button>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                {/* Table to display checkout items */}
                <table className="table w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="text-center border border-gray-300 px-4 py-2">#</th>
                            <th className="text-center border border-gray-300 px-4 py-2">Name</th>
                            <th className="text-center border border-gray-300 px-4 py-2">Price</th>
                            <th className="text-center border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkouts.map((item, index) => (
                            <tr key={item._id}>
                                <td className="text-center border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="text-center border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="text-center border border-gray-300 px-4 py-2">$5</td>
                                <td className="text-center border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg"
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaymentModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSubmit={handleSubmit} user={user} />
        </div>
    );
};

export default CheckoutPage;
