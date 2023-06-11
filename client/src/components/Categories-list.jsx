import { useEffect, useState } from "react";
import apiService from '../apiService'
import CreateCategory from "./Create-new-category";
import { Context } from "../context/Context";
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function CategoriesList () {

  const [currCat, setCurrCat] = useState({});
  const [catArray, setCatArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);
  const { user, categories, updateCategories } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate()

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

  //TODO: I have to filter to only show the categories title once
  // if (cat.title)
  const uniqueCatArray = [];
  const titlesArray = [];

  for (const obj of catArray) {
    const title = obj.title;
    if (!titlesArray.includes(title)) {
      titlesArray.push(title);
      uniqueCatArray.push(obj);
    }
  }

  console.log({ uniqueCatArray })
  console.log({ titlesArray })


  return (
    <div className="categories-list">
      <h2>Categories</h2>
      <div className="categories-item-container">
        <h3>TODO: London</h3>
        <div className="categories-item-boxes">
          {uniqueCatArray.map((cat, idx) => (
            <div key={idx} className="categories-item-icon">
              <img src={cat.icon_url} alt={cat.title} onClick={() => {
                setCurrCat(cat);
                setClicked(true)
                // navigate("/user-map/" + cat._id);
                console.log('wasiudhasiudhasd')
                navigate("/user-map/" + id, { state: cat })
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