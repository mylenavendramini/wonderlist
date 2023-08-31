import { useEffect, useState } from "react";
import apiService from '../apiService'
import CreateCategory from "./Create-new-category";
import { Context } from "../context/Context";
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { firstLetterUpperCase, scrollToBottom } from "../utils/helper";
import LocationIcon from "./Icons/Location";


function CategoriesList () {
  const [currCat, setCurrCat] = useState({});
  const [catArray, setCatArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [createCategory, setCreateCategory] = useState(false);
  const { updateCategories, travelCollections } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate()



  function getTravelCollectionArr () {
    const travelElement = travelCollections.find((travel) => travel._id === id);
    const travelNameElement = travelElement && travelElement.travelName;
    return travelCollections.filter((travel) => travel.travelName === travelNameElement);
  }

  const travelCollectionArr = getTravelCollectionArr();

  function getAllCategories () {
    apiService.getCategories().then(data => {
      setCatArray(data);
      updateCategories(data);
    });
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  function handleCreateCategory (cityName) {
    setCreateCategory(true);
    setClicked(false);
    setSelectedCity(cityName);
    scrollToBottom();
  }

  function handleCategoryCreation (newCategory) {
    setCatArray(prevCategories => [...prevCategories, newCategory]);
    setCreateCategory(false);
  }

  const uniqueCatArray = []
  const titlesArray = [];
  const cityNamesArray = [];
  for (const obj of catArray) {
    const title = obj.title && obj.title.trim();
    const city = obj.cityName && obj.cityName.trim();
    if (!titlesArray.includes(title) || !cityNamesArray.includes(city)) {
      titlesArray.push(title);
      cityNamesArray.push(city);
      uniqueCatArray.push(obj)
    }
  }

  return (
    <div className="travel-collection-container categories">
      <h2>{travelCollectionArr.length && firstLetterUpperCase(travelCollectionArr[0].travelName)}</h2>
      <h3 className='go-back' onClick={() => navigate('/travel-collections')}>
        <span>&larr;</span> Go back to Trip Collections</h3>
      <div className="categories-item-container">
        {travelCollectionArr.map((travelCol, idx) => {
          const details = travelCol.details;
          return (
            <div className="categories-item-boxes" key={idx}>
              <h3 id="no-underline">Add you categories here:</h3>
              <h3>{firstLetterUpperCase(details.cityName)}</h3>
              <div className="categories-item-box" >
                <div className="categories-item" >
                  <div className="categories-item-icon">
                    <LocationIcon />
                  </div>
                  <h3>Coffees</h3>
                </div>
                <div className="categories-item" >
                  <div className="categories-item-icon">
                    <LocationIcon />
                  </div>
                  <h3>Restaurants</h3>
                </div>
                {uniqueCatArray.filter((cat) => cat.cityName === details.cityName).map((cat, idx) => {
                  return (
                    <div className="categories-item" key={idx} >
                      <div className="categories-item-icon" onClick={() => {
                        setCurrCat(cat);
                        setClicked(true);
                        navigate("/user-map/" + id, { state: { category: cat, travelCol } });
                      }}>
                        <LocationIcon />
                      </div>
                      <div>
                        <h3>{firstLetterUpperCase(cat.title)}</h3>
                      </div>
                    </div>

                  )
                }
                )}
                <div className="categories-item-icon close-item no-border" id="btn-center" onClick={() => handleCreateCategory(details.cityName)}>
                  <i className="fa fa-plus btn btn-close btn-plus-blue"></i>
                </div>
              </div>

            </div>)
        })}
        <div id="bottom">
          {createCategory && <CreateCategory
            setCatArray={setCatArray}
            travelId={id}
            selectedCity={selectedCity}
            handleCategoryCreation={handleCategoryCreation}
          />
          }
        </div>
      </div>
    </div >
  );
}





export default CategoriesList;