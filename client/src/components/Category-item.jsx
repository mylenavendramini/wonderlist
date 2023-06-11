import 'reactjs-popup/dist/index.css';
import { useEffect, useState, useContext } from 'react';
import apiService from '../apiService';
import { useParams } from 'react-router';
import { Context } from "../context/Context";

function CategoryItem ({ category, placeInfo }) {
  // console.log(placeInfo)
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [categoryItems, setCategoryItems] = useState([])
  const [uniqueCatArray, setUniqueCatArray] = useState([])
  const { id } = useParams(); // travelId
  const { categories } = useContext(Context);
  console.log({ categories })
  const categoryTitle = category.title;

  const placesArray = [];
  function uniquePlaces () {
    for (const obj of categoryItems) {
      const place = obj.place;
      if (!placesArray.includes(place) && place !== '') {
        placesArray.push(place);
        setUniqueCatArray((prev) => (
          [...prev, obj])
        )
      }
    }
  }

  // the place need to be filter after go to categories


  // TODO: get the category items with the same title
  function getCategoryItems () {
    categories.forEach(cat => {
      console.log(cat)

      if (cat.title === categoryTitle) {

        console.log(cat.title, 'cat title');
        console.log({ categoryTitle });
        // no duplicates
        setCategoryItems((prev) => (
          [...prev, cat])
        )
      }
    })
  }
  console.log({ uniqueCatArray })
  console.log(categoryItems, 'categoryItems')

  useEffect(() => {
    getCategoryItems()
  }, [])

  useEffect(() => {
    uniquePlaces()
  }, [categoryItems])


  useEffect(() => {
    updatePlaceAndAddress()
  }, [placeInfo])

  useEffect(() => {
    if (place !== '' && address !== '') {
      addNewCategory();
    }
  }, [place, address]);

  // every time the user clicks, we update the category

  function updatePlaceAndAddress () {
    if (placeInfo.length !== 0) {
      if (placeInfo[placeInfo.length - 1].name) setPlace(placeInfo[placeInfo.length - 1].name);
      if (placeInfo[placeInfo.length - 1].formatted_address) setAddress(placeInfo[placeInfo.length - 1].formatted_address);
      // updateCategory();
      // addNewCategory();
    }
  }

  // function updateCategory () {
  //   apiService.editCategory(id, place, address)
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  function addNewCategory () {
    const newCategory = {
      title: categoryTitle,
      place: place,
      address: address,
      icon_url: '/icons8-new-50.png',
    }
    console.log(newCategory)
    console.log(id)
    apiService.createCategory(newCategory, id).then(data => console.log(data)).catch(error => console.log(error));
  }

  return (
    <div className="category-item">
      <h2>TODO: Travel Name</h2>
      <h3>TODO: Travel City</h3>
      <h3>{categoryTitle}</h3>
      <div className='map-container'>
        <h3>Find your places and add them to your list</h3>
      </div>
      <div>
        {uniqueCatArray.map((cat, idx) => (
          <div className='list-items' key={idx}>
            <ul>
              <li>{cat.place}</li>
              <li>{cat.address}</li>
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