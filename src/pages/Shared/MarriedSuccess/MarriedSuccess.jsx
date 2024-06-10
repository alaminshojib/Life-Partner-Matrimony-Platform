import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MarriedSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedStory, setSelectedStory] = useState(null);

    const { data: successStories = [], refetch } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/success-stories');
            return res.data;
        }
    });

    const handleViewStory = (story) => {
        setSelectedStory(story);
    };

    const handleCloseModal = () => {
        setSelectedStory(null);
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Married Success Stories</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg text-center overflow-hidden">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        <tr>
                            <th className="py-3 px-4 ">Male Biodata Id</th>
                            <th className="py-3 px-4 ">Female Biodata Id</th>
                            <th className="py-3 px-4 ">View Story</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {successStories.map((story, index) => (
                            <tr key={index} className="border-b transition duration-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{story.selfBiodataId || 'N/A'}</td>
                                <td className="py-3 px-4">{story.partnerBiodataId || 'N/A'}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleViewStory(story)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow focus:outline-none transition duration-200"
                                    >
                                        View Story
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedStory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">Success Story</h2>
                        <p>{selectedStory.story}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow focus:outline-none transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MarriedSuccess />
        </QueryClientProvider>
    );
};

export default App;
