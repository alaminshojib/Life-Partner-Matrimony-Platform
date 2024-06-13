import { Carousel } from 'antd';
import img1 from '../../../assets/home/01.png';
import img2 from '../../../assets/home/02.png';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.png';

const images = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src:img4 }
];

const Banner = () => {
    
    return (
        <div className="text-center">
            <Carousel autoplay className='md:h-screen h-96  relative'>
                {images.map((image, index) => (
                    <div className='md:h-screen h-96 relative' key={index}>
                        <img src={image.src} alt="img" className="h-screen w-full  opacity-90" />
                        <div className='absolute  text-white right-0  bottom-6 py-2 px-4 rounded  left-0'>
                            <h3 className='lg:text-4xl text-xl mb-10 font-bold text-white'>For your eternal life partner <br />Our small effort!</h3>
                            <h3 className='w-fit text-xs md:text-xl bg-slate-500 rounded-md p-2 text-center items-center mx-auto'>
                                "Marry those among you who are unmarried, even if  they are destitute,<br /> Allah will make them free from poverty by His grace."<br /> <span className='font-bold text-red-300'>(Surah An Noor: Verse 32)</span>
                            </h3>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
