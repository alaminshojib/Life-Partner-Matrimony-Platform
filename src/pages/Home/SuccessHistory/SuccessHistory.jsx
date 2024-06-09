import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuccessHistory = () => {
  const [biodatas, setBiodatas] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/home');
        setBiodatas(response.data.biodatas);
        setSuccessStories(response.data.successStories);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <section>
        <h2>Biodatas</h2>
        <ul>
          {biodatas.map((biodata) => (
            <li key={biodata._id}>
              <h3>{biodata.name}</h3>
              <p>{biodata.occupation}</p>
              {/* Add more biodata details as needed */}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Success Stories</h2>
        <ul>
          {successStories.map((story) => (
            <li key={story._id}>
              <h3>{story.coupleName}</h3>
              <p>{story.story}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SuccessHistory;
