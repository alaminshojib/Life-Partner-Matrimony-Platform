import { useState } from "react";
import { FaTimes, FaTrashAlt, FaShoppingCart, FaApplePay, FaCcAmazonPay } from "react-icons/fa"; // Added FaShoppingCart icon
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../../hooks/useAuth";
import PaymentModal from "./PaymentModal";

// CheckoutPage component
const CheckoutPage = () => {
    const { user } = useAuth();
    const [cardNumber, setCardNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [biodataId, setBiodataId] = useState(""); // Add state for biodataId
    const cart = [
        { _id: 1, name: "Product 1", price: 10, image: "https://via.placeholder.com/150" },
        { _id: 2, name: "Product 2", price: 20, image: "https://via.placeholder.com/150" },
        { _id: 3, name: "Product 3", price: 30, image: "https://via.placeholder.com/150" }
    ];

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

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
                // Logic to delete item from cart
                console.log("Item deleted:", id);
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            console.log("Payment submitted");
            setModalIsOpen(false); // Close the modal after payment
        }, 2000);
    };

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    return (
        <div className="container mx-auto px-4 relative">
            <SectionTitle heading="Checkout"  />
            <div className="flex justify-between mb-8">
                <div>
                    <h2 className="text-2xl">Items: {cart.length}</h2>
                    <h2 className="text-2xl">Total Price: ${totalPrice}</h2>
                </div>
                <div className="flex items-center space-x-4">
                    {cart.length ? (
                        <button onClick={() => setModalIsOpen(true)} className="btn bg-blue-500 hover:bg-green-500 text-white px-6 p-1 font-bold rounded-md shadow-lg hover:shadow-xl transition duration-300">
                            Pay Now
                        </button>
                    ) : (
                        <button disabled className=" bg-blue-500 hover:bg-green-500 text-white cursor-not-allowed px-6 p-1 font-bold rounded-md shadow-md">Pay Now</button>
                    )}
                    <Link to="/biodatas">
                        <button className=" bg-orange-500 text-white  px-6  p-1 font-bold rounded-md shadow-md transition duration-300">
                            Bio Datas
                        </button>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
            <table className="table w-full border-collapse border border-gray-300">
    <thead>
        <tr>
            <th className="text-center border border-gray-300 px-4 py-2">#</th>
            <th className="text-center border border-gray-300 px-4 py-2">Image</th>
            <th className="text-center border border-gray-300 px-4 py-2">Name</th>
            <th className="text-center border border-gray-300 px-4 py-2">Price</th>
            <th className="text-center border border-gray-300 px-4 py-2">Action</th>
        </tr>
    </thead>
    <tbody>
        {cart.map((item, index) => (
            <tr key={item._id}>
                <td className="text-center border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="text-center border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 overflow-hidden rounded-full">
                            <img src={item.image} alt="Product" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </td>
                <td className="text-center border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="text-center border border-gray-300 px-4 py-2">${item.price}</td>
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
