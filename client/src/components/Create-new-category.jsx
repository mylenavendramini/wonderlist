import { useState } from "react";
import apiService from "../apiService";

function CreateCategory ({ setCatArray, travelId, handleCategoryCreation, selectedCity }) {
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState("");

  function handleSubmit (e) {
    e.preventDefault();
    if (category.trim() === "") {
      setFormError("Please enter a category name");
      return;
    }
    const newCategory = {
      cityName: selectedCity,
      title: category.trim(),
      place: '',
      address: '',
      icon_url: '/icons8-new-50.png',
    }
    console.log(newCategory)
    console.log(travelId)
    // apiService.createCategory(newCategory, travelId).then(newCategory => setCatArray(categories => [...categories, newCategory]));
    apiService.createCategory(newCategory, travelId).then((createdCategory) => {
      setCatArray((prevCategories) => [...prevCategories, createdCategory]);
      handleCategoryCreation(createdCategory);
    });

    setCategory('');
    setFormError("");
  };


  return (
    <div className="create-category">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="category-name">Category name:</label>
        <input
          type="text"
          name="category-name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {formError && <p className="error-message">{formError}</p>}
        <button className="btn" type="submit">
          Create category
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;