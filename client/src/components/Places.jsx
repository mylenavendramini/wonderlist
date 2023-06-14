import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import apiService from '../apiService';

function Places () {
  const location = useLocation();
  const categoryObj = location.state && location.state;
  const uniqueCatArray = categoryObj && categoryObj.dataArray;
  const [placesData, setPlacesData] = useState([]);
  const [uniquePlacesData, setUniquePlacesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the uniqueCatArray from localStorage
    const storedArray = localStorage.getItem('uniqueCatArray');
    if (storedArray) {
      setPlacesData(JSON.parse(storedArray));
    }
    localStorage.setItem('placesData', JSON.stringify(uniqueCatArray));
  }, []);

  useEffect(() => {
    // Update placesData in local storage whenever uniqueCatArray changes
    localStorage.setItem('placesData', JSON.stringify(uniqueCatArray));
    setPlacesData(uniqueCatArray);
  }, [uniqueCatArray]);

  async function handleDelete (id) {
    const categoryToDelete = await apiService.deleteCategory(id);
    console.log(categoryToDelete);
    setPlacesData((prevData) =>
      prevData.filter((cat) => cat._id !== id)
    );
  }

  useEffect(() => {
    const uniqueData = [];
    const uniqueNames = [];
    placesData && placesData.forEach((data) => {
      if (!uniqueNames.includes(data.place)) {
        uniqueNames.push(data.place);
        uniqueData.push(data);
      }
    });
    setUniquePlacesData(uniqueData);
  }, [placesData]);

  return (
    <div className="travel-collection-container places-container">
      <h2>MY PLACES</h2>
      <h3 className='go-back' onClick={() => navigate('/travel-collections')}>
        <span>&larr;</span> Go back to Trip Collections</h3>
      {uniquePlacesData.length > 0 && uniquePlacesData.map((cat, idx) => (
        <div className='list-items' key={idx}>
          <ul>
            <li>&#128205; {cat.place}</li>
            <li>{cat.address}</li>
          </ul>
          <div className='close-item'>
            <i className="fa fa-close btn btn-close" onClick={() => handleDelete(cat._id)}></i>
          </div>
        </div>
      ))
      }
    </div>
  );
}

export default Places;