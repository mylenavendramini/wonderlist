import { useState } from "react";
import apiService from "../apiService";

function CreateCategory ({ setCatArray, travelId }) {
  const [category, setCategory] = useState('');

  function handleSubmit (e) {
    e.preventDefault();
    const newCategory = {
      title: category,
      place: '',
      address: '',
      icon_url: '/icons8-new-50.png',
    }
    console.log(newCategory)
    console.log(travelId)
    apiService.createCategory(newCategory, travelId).then(newCategory => setCatArray(categories => [...categories, newCategory]));
    setCategory('');
  };

  function validateForm () { }
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
        <button className="btn" type="submit" disabled={validateForm()}>
          Create category
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;