import 'reactjs-popup/dist/index.css';
import { useEffect, useState, useContext } from 'react';
import apiService from '../apiService';
import { useParams, useNavigate } from 'react-router';
import { Context } from "../context/Context"
import { firstLetterUpperCase } from "../utils/helper";

function CategoryItem ({ category, travelCol }) {
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [categoryItems, setCategoryItems] = useState([])
  const [uniqueCatArray, setUniqueCatArray] = useState([])
  const [categoryObj, setCategoryObj] = useState(null)
  const [travelCollectionObj, setTravelCollectionObj] = useState(null)
  const [message, setMessage] = useState("");
  const { id } = useParams(); // travelId
  const { categories } = useContext(Context);
  const categoryTitle = categoryObj && categoryObj.title;
  const categoryCity = categoryObj && categoryObj.cityName;
  const navigate = useNavigate()
  const { placeInfo } = useContext(Context)

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

  function getCategoryItems () {
    categories.forEach(cat => {
      if (cat.title === categoryTitle) {
        setCategoryItems((prev) => (
          [...prev, cat])
        )
      }
    })
  }

  useEffect(() => {
    getCategoryItems()
    setCategoryObj(category)
    setTravelCollectionObj(travelCol)
  }, [])

  useEffect(() => {
    uniquePlaces()
  }, [categoryItems])


  useEffect(() => {
    updatePlaceAndAddress();
    getCategoryItems()
  }, [placeInfo])

  useEffect(() => {
    if (place !== '' && address !== '') {
      addNewCategory();
    }
  }, [place, address]);

  function updatePlaceAndAddress () {
    if (placeInfo.length !== 0) {
      if (placeInfo[placeInfo.length - 1].name) setPlace(placeInfo[placeInfo.length - 1].name);
      if (placeInfo[placeInfo.length - 1].formatted_address) setAddress(placeInfo[placeInfo.length - 1].formatted_address);
    }
  }

  function addNewCategory () {
    const newCategory = {
      title: categoryTitle,
      place: place,
      address: address,
      icon_url: '/icons8-new-50.png',
    }

    apiService.createCategory(newCategory, id);
    setMessage(`${newCategory.place} added to your list!`);
    getCategoryItems();
    localStorage.setItem('uniqueCatArray', JSON.stringify([...uniqueCatArray, newCategory]));
  }

  function handleGoToList (e) {
    navigate('/places/' + id, { state: { dataArray: uniqueCatArray } })
  }

  return (
    <div className="category-item">
      <h2>{travelCollectionObj && travelCollectionObj.travelName}</h2>
      <h3>Category: {categoryTitle && firstLetterUpperCase(categoryTitle)}</h3>
      <div className="categories-item-box-pointer" >
        <h3 id='no-underline'>Find a place in <span>{categoryCity && firstLetterUpperCase(categoryCity)}</span> and add it to your <span id='clickable' onClick={handleGoToList}>list</span>:</h3>
        {message && <p className="add-message">&#128205; {message}</p>}
      </div>
    </div>
  );
}

export default CategoryItem;