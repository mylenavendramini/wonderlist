import { Fragment, useEffect, useState } from "react";
import apiService from '../apiService'
import CreateCategory from "./Create-new-category";
import { Context } from "../context/Context";
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { firstLetterUpperCase } from "../utils/helper";
import PlaneIcon from "./Icons/PlaneIcon";
import LocationIcon from "./Icons/Location";


function CategoriesList () {
  const [currCat, setCurrCat] = useState({});
  const [catArray, setCatArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [createCategory, setCreateCategory] = useState(false);
  const { user, categories, updateCategories, travelCollections } = useContext(Context);
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
      console.log(data)
      setCatArray(data)
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
    const element = document.getElementById("bottom");
    element.scrollIntoView({ behavior: "smooth" });
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
    <div className="categories-list">
      <h2>Categories</h2>
      <div className="categories-item-container">
        <h3>Travel Collection: {travelCollectionArr.length && firstLetterUpperCase(travelCollectionArr[0].travelName)}</h3>
        {travelCollectionArr.map((travelCol, idx) => {
          const details = travelCol.details;
          return (
            <div className="categories-item-boxes" key={idx}>
              <h3>City: {firstLetterUpperCase(details.cityName)}</h3>
              <h4>Add you categories here:</h4>
              <div className="categories-item-box">
                <div className="categories-item" >
                  <div className="categories-item-icon">
                    <LocationIcon />
                  </div>
                  <h3>Favorite Coffees</h3>
                </div>
              </div>

              {uniqueCatArray.filter((cat) => cat.cityName === details.cityName).map((cat, idx) => {
                return (
                  <div className="categories-item-box" key={idx}>
                    <div className="categories-item" >
                      <div className="categories-item-icon" key={idx} onClick={() => {
                        setCurrCat(cat);
                        setClicked(true);
                        navigate("/user-map/" + id, { state: { category: cat, travelCol } });
                      }}>
                        <LocationIcon />
                      </div>
                      <h3>{firstLetterUpperCase(cat.title)}</h3>
                    </div>
                  </div>
                )
              }
              )}

              <div className="categories-item-icon close-item no-border" id="btn-center" onClick={() => handleCreateCategory(details.cityName)}>
                <i className="fa fa-plus btn btn-close btn-plus-blue"></i>
              </div>
            </div>)
        })}
        {createCategory && <CreateCategory
          setCatArray={setCatArray}
          travelId={id}
          selectedCity={selectedCity}
          handleCategoryCreation={handleCategoryCreation}
        />
        }

      </div>

      {/*{clicked && <CategoryItem category={catArray.find((cat) => cat.title === currCat.title)} />}*/}
      {/*clicked && <UserMap category={catArray.find((cat) => cat.title === currCat.title)} />*/}
    </div >
  );
}





export default CategoriesList;