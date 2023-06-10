import { useEffect, useState } from "react";
import apiService from '../apiService'
import CreateCategory from "./Create-new-category";
import { Context } from "../context/Context";
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function CategoriesList () {
  const [categories, setCategories] = useState([]);
  const [currCat, setCurrCat] = useState({});
  const [catArray, setCatArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate()

  function getAllCategories () {
    apiService.getCategories().then(data => {
      console.log(data)
      setCatArray(data)
    });
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  function handleCreateCategory () {
    setCreateCategory(true);
    //TODO:
    // stop showing the component
  }

  function checkUserId (travelId) {
    if (user) {
      const travelCol = user.travelCollections;
      return travelCol.includes(travelId);
    }
  }

  return (
    <div className="categories-list">
      <h2>Categories</h2>
      <div className="categories-item-container">
        <h3>TODO: London</h3>
        <div className="categories-item-boxes">
          {catArray.map((cat, idx) => (
            <div key={idx} className="categories-item-icon">
              <img src={cat.icon_url} alt={cat.title} onClick={() => {
                setCurrCat(cat);
                setClicked(true)
                navigate("/user-map/" + cat._id);
              }} />
            </div>
          )
          )}
          <div className="categories-item-icon close-item" onClick={handleCreateCategory}>
            <i className="fa fa-plus btn btn-close"></i>
          </div>
        </div>
      </div>
      {createCategory ? <CreateCategory setCatArray={setCatArray} travelId={id} /> : ''}
      {/*{clicked && <CategoryItem category={catArray.find((cat) => cat.title === currCat.title)} />}*/}
      {/*clicked && <UserMap category={catArray.find((cat) => cat.title === currCat.title)} />*/}
    </div>
  );
}

export default CategoriesList;