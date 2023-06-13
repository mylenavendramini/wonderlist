import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import apiService from '../apiService';

// Mock for London:
const uniquePlacesDataMock = [{ address: 'Great Russell St, London WC1B 3DG', place: 'The British Museum' }, { address: 'Riverside Building, County Hall, London SE1 7PB', place: 'London Eye' }, { address: 'Regal House, 14 James St, London WC2E 8BU', place: 'Covent Garden' }]

function Places () {
  const location = useLocation();
  const categoryObj = location.state && location.state;
  const uniqueCatArray = categoryObj && categoryObj.dataArray;
  const [placesData, setPlacesData] = useState([]);
  const [uniquePlacesData, setUniquePlacesData] = useState([]);




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
    // Filter unique travel collections based on their names
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

  console.log('working')
  return (
    <div className="places-container">
      <h2>MY PLACES</h2>
      {uniquePlacesData.length > 0 ? uniquePlacesData.map((cat, idx) => (
        <div className='list-items' key={idx}>
          <ul>
            <li>{cat.place}</li>
            <li>{cat.address}</li>
          </ul>
          <div className='close-item'>
            <i className="fa fa-close btn btn-close" onClick={() => handleDelete(cat._id)}></i>
          </div>
        </div>
      )) :
        <div>
          {uniquePlacesDataMock.map((cat, idx) => {
            console.log(cat)
            return (
              <div className='list-items' key={idx}>
                <ul>
                  <li>{cat.place}</li>
                  <li>{cat.address}</li>
                </ul>
                <div className='close-item'>
                  <i className="fa fa-close btn btn-close" onClick={() => handleDelete(cat._id)}></i>
                </div>
              </div>
            )
          })}
        </div>
      }

    </div>
  );
}

export default Places;