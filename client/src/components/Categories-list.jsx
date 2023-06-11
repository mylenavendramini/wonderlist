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
  const { user, categories, updateCategories, travelCollections } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate()

  function getTravelCollection () {
    return travelCollections.find((travel) => travel._id === id)
  }
  const travelCollection = getTravelCollection();

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
  }

  function handleCategoryCreation (newCategory) {
    setCatArray(prevCategories => [...prevCategories, newCategory]);
    setCreateCategory(false);
  }


  const uniqueCatArray = [];
  const titlesArray = [];

  for (const obj of catArray) {
    const title = obj.title;
    if (!titlesArray.includes(title)) {
      titlesArray.push(title);
      uniqueCatArray.push(obj);
    }
  }

  // console.log({ uniqueCatArray })
  // console.log({ titlesArray })


  return (
    <div className="categories-list">
      <h2>Categories</h2>
      <div className="categories-item-container">
        <h3>{travelCollection && travelCollection.travelName}</h3>
        <div className="categories-item-boxes">
          {uniqueCatArray.map((cat, idx) => (
            <div key={idx} className="categories-item-icon">
              <img src={cat.icon_url} alt={cat.title} onClick={() => {
                setCurrCat(cat);
                setClicked(true)
                // navigate("/user-map/" + cat._id);
                console.log('wasiudhasiudhasd')
                navigate("/user-map/" + id, { state: cat });
                // Refresh the /user-map page to be abble to add places to placeInfo
                // window.location.reload();
              }} />
            </div>
          )
          )}
          <div className="categories-item-icon close-item" onClick={handleCreateCategory}>
            <i className="fa fa-plus btn btn-close"></i>
          </div>
        </div>
      </div>
      {createCategory && <CreateCategory
        setCatArray={setCatArray}
        travelId={id}
        handleCategoryCreation={handleCategoryCreation}
      />
      }
      {/*{clicked && <CategoryItem category={catArray.find((cat) => cat.title === currCat.title)} />}*/}
      {/*clicked && <UserMap category={catArray.find((cat) => cat.title === currCat.title)} />*/}
    </div>
  );
}

export default CategoriesList;