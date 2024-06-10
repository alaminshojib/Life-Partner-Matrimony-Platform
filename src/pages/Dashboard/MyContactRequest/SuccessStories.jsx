import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SuccessStories = () => {
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
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Success Stories</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Male Biodata Id</th>
                            <th className="px-4 py-2 text-left">Female Biodata Id</th>
                            <th className="px-4 py-2 text-left">View Story</th>
                        </tr>
                    </thead>
                    <tbody>
                        {successStories.map((story, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="px-4 py-2">{story.maleBiodataId || 'N/A'}</td>
                                <td className="px-4 py-2">{story.femaleBiodataId || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleViewStory(story)}
                                        className="text-blue-500 hover:text-blue-700 focus:outline-none"
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
            <SuccessStories />
        </QueryClientProvider>
    );
};

export default App;
