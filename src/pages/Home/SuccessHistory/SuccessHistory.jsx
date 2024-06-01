import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const SuccessHistory = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(3);
    const [sortBy, setSortBy] = useState('desc'); // Default to descending

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                // Sort the data based on marriage date
                const sortedData = data.sort((a, b) => {
                    if (sortBy === 'asc') {
                        return new Date(a.marriageDate) - new Date(b.marriageDate);
                    } else {
                        return new Date(b.marriageDate) - new Date(a.marriageDate);
                    }
                });
                setReviews(sortedData);
            });
    }, [sortBy]);

    const indexOfLastReview = currentPage * pageSize;
    const indexOfFirstReview = indexOfLastReview - pageSize;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (increment) => {
        const nextPage = currentPage + increment;
        if (nextPage >= 1 && nextPage <= Math.ceil(reviews.length / pageSize)) {
            setCurrentPage(nextPage);
        }
    };

    return (
        <section className="my-10">
            <SectionTitle
                heading='SUCCESSFULL MARRIAGE STORY!'
                
            ></SectionTitle>
             <div className="mx-auto justify-center items-center text-center mb-5">
                <label>
                    Sort By:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentReviews.map(review => (
                    <div key={review._id} className="max-w-xs rounded-md shadow-md mx-auto justify-center items-center">
                        <img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-md h-48 bg-gray-500" />
                        <div className="space-y-2 px-2 flex flex-col justify-between items-center pt-2">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="text-xl font-semibold tracking-wide">Marriage Date: {review.marriageDate}</p>
                        </div>
                        <div className="flex flex-col justify-between p-3 space-y-2">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold tracking-wide">Alhamdulillah! 3rd success post!</h2>
                                <p className="">{review.details.slice(0, 100)} ....</p>
                            </div>
                            <button type="button" className="flex items-center justify-center w-fit mx-auto py-1 px-2 text-white font-semibold tracking-wide rounded-md bg-blue-600">Read more</button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-5">
                <button className="mx-1" onClick={() => paginate(-1)}>Previous</button>
                <button className="mx-1" onClick={() => paginate(1)}>Next</button>
            </div>
        </section>
    );
};


export default SuccessHistory;
