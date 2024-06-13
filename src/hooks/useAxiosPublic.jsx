import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://life-partner-matrimony-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;