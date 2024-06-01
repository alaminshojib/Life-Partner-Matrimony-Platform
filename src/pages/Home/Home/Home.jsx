import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeaturedGrid from "../Featured/FeaturedGrid";
import HowWorks from "../HowWorks/HowWorks";
import SuccessPartner from "../SuccessPartner.jsx/SuccessPartner";
import SuccessHistory from "../SuccessHistory/SuccessHistory";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Life Partner | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedGrid></FeaturedGrid>
            <HowWorks></HowWorks>
            <SuccessPartner></SuccessPartner>
            <SuccessHistory></SuccessHistory>
        </div>
    );
};

export default Home;