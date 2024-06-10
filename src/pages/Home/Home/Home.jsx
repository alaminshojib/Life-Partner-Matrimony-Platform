import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeaturedGrid from "../Featured/FeaturedGrid";
import HowWorks from "../HowWorks/HowWorks";
import SuccessPartner from "../SuccessPartner.jsx/SuccessPartner";
import SuccessStory from "../SuccessHistory/SuccessStory";

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
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;