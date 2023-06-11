import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import apiService from '../apiService';
function Places () {
  const location = useLocation();
  const categoryObj = location.state;
  const uniqueCatArray = categoryObj.dataArray || [];
  const [placesData, setPlacesData] = useState([]);

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

  return (
    <div className="travel-collections">
      <h2>Places:</h2>
      {placesData.map((cat, idx) => (
        <div className='list-items' key={idx}>
          <ul>
            <li>{cat.place}</li>
            <li>{cat.address}</li>
          </ul>
          <div className='close-item'>
            <i className="fa fa-close btn btn-close" onClick={() => handleDelete(cat._id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Places;