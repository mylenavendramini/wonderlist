import { useState } from "react";
import TravelItineraryForm from "./Travel-itinerary-form";

function TravelNameForm ({ setFormSubmitted, setCities, cities, formSubmitted, setTravelCollection, travelCollection }) {

  const [travelName, setTravelName] = useState('');
  const [formError, setFormError] = useState("");

  function handleTravelNameChange (e) {
    const newName = e.target.value;
    setTravelName(newName);
  };
  function handleTravelNameSubmit (e) {
    e.preventDefault();
    if (travelName.trim() === "") {
      setFormError("Please enter a travel name");
      return;
    }
    setFormSubmitted(true)
    setTravelName('');
    setFormError("");
  };


  return (
    <>
      {formSubmitted ?
        <TravelItineraryForm travelName={travelName} setCities={setCities} cities={cities} setTravelCollection={setTravelCollection} travelCollection={travelCollection} />
        :
        <form className="form" onSubmit={handleTravelNameSubmit}>
          <label htmlFor="travel-name">Travel name:</label>
          <input
            type="text"
            name="travel-name"
            value={travelName}
            onChange={handleTravelNameChange}
            required
          />
          <button className="btn btn-check" type="submit">
            <i className="fa fa-check"></i>
          </button>
        </form>}
    </>
  );
}

export default TravelNameForm;