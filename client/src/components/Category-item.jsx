import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from 'react';
import apiService from '../apiService';
import { useParams } from 'react-router';

function CategoryItem ({ category, placeInfo }) {
  // console.log(placeInfo)
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  // const [categoryItems, setCategoryItems] = useState([])
  const { id } = useParams();

  // TODO: get the category items with the categoryId

  useEffect(() => {
    updatePlaceAndAddress()
    // setCategoryItems(prev => {
    //   return [...prev, ...placeInfo]
    // })
  }, [placeInfo])

  useEffect(() => {
    if (place !== '' && address !== '') {
      updateCategory();
    }
  }, [place, address]);

  // every time the user clicks, we update the category

  function updatePlaceAndAddress () {
    if (placeInfo.length !== 0) {
      if (placeInfo[placeInfo.length - 1].name) setPlace(placeInfo[placeInfo.length - 1].name);
      if (placeInfo[placeInfo.length - 1].formatted_address) setAddress(placeInfo[placeInfo.length - 1].formatted_address);
      updateCategory();
    }
  }

  function updateCategory () {
    apiService.editCategory(id, place, address)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  return (
    <div className="category-item">
      <h2>TODO: Travel Name</h2>
      <h3>TODO: Travel City</h3>
      <h3>{category && category.title}</h3>
      <div className='map-container'>
        <h3>Find your places and add them to your list</h3>
      </div>
      <div>
        {placeInfo.map((place, idx) => (
          <div className='list-items' key={idx}>
            <ul>
              <li>
                {place.name}
              </li>
              <li>{category && category.place}</li>
              <li>{category && category.address}</li>
            </ul>
            <div className='close-item'>
              <i className="fa fa-close btn btn-close"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryItem;