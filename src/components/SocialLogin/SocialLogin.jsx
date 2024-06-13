import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    });
            });
    };

    return (
        <div >
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-fit mx-auto mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:text-white bg-gray-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
            >
                <FcGoogle className="w-6 h-6 mr-2" />
                <span>Continue with Google</span>
                
            </button>
        </div>
    );
};

export default SocialLogin;
