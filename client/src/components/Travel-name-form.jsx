import { useState } from "react";
import TravelItineraryForm from "./Travel-itinerary-form";
import { useContext } from 'react';
import { Context } from '../context/Context';

function TravelNameForm ({ setFormSubmitted, formSubmitted, }) {
  const [travelNameInput, setTravelNameInput] = useState('');
  const [formError, setFormError] = useState("");
  const { travelName, updateTravelName } = useContext(Context);

  function handleTravelNameChange (e) {
    const newName = e.target.value;
    setTravelNameInput(newName);

  };

  function handleTravelNameSubmit (e) {
    e.preventDefault();
    if (travelNameInput.trim() === '') {
      setFormError("Please enter a trip name");
      return;
    }
    updateTravelName(travelNameInput);
    setFormSubmitted(true)
    setTravelNameInput('');
    setFormError('');
  };

  return (
    <>
      <div className="image">
        <lottie-player src="tickets.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      {formSubmitted ?
        <TravelItineraryForm travelNameParent={travelName} />
        :
        <form className="form" onSubmit={handleTravelNameSubmit}>
          <label htmlFor="travel-name">Trip name:</label>
          <input
            type="text"
            name="travel-name"
            value={travelNameInput}
            onChange={handleTravelNameChange}
            required
          />
          {formError && <p className="error-message">{formError}</p>}
          <button className="btn btn-check" type="submit">
            <i className="fa fa-check"></i>
          </button>
        </form>}
    </>
  );
}

export default TravelNameForm;