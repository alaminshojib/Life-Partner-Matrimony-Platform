import React, { useState, useEffect } from 'react';

const MyFavouritesBiodata = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Fetch favourite biodata from server or local storage
    const fetchedFavourites = []; // Fetch favourites here
    setFavourites(fetchedFavourites);
  }, []);

  const handleDeleteFavourite = (id) => {
    // Handle deleting favourite with given id
  };

  return (
    <div>
      <h2>My Favourites Biodata</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Biodata Id</th>
            <th>Permanent Address</th>
            <th>Occupation</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((favourite) => (
            <tr key={favourite.id}>
              <td>{favourite.name}</td>
              <td>{favourite.biodataId}</td>
              <td>{favourite.permanentAddress}</td>
              <td>{favourite.occupation}</td>
              <td>
                <button onClick={() => handleDeleteFavourite(favourite.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFavouritesBiodata;
