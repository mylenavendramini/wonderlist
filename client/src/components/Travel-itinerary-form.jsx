import { useContext, useState } from "react";
import { formatDate, getDatesBetween } from "../utils/helper";
import apiService from "../apiService";
import { Context } from "../context/Context";

function TravelItineraryForm ({ travelName, setFormSubmitted, cities, setCities }) {
  const [travelCollection, setTravelCollection] = useState({});
  const [city, setCity] = useState('');

  // const [dates, setDates] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formError, setFormError] = useState("");
  const { user, updateUser, dates, updateDates } = useContext(Context);

  // Itinerary inputs
  function handleAddInput () {
    if (city.trim() === "") {
      setFormError("Please enter a city name");
      return;
    }
    setCities([...cities, '']);
    updateDates([...dates, '']);
    setFormError("");
  };

  // TODO: it's only working for ONE city

  function handleCityChange (e) {
    const newCity = e.target.value;
    setCity(newCity);
  };

  function handleCitiesChange (idx, e) {
    const updatedCities = [...cities];
    updatedCities[idx] = e.target.value;
    setCities(updatedCities);
  };

  function handleDatesBetweenChange (e, idx) {
    // const updatedDates = [...dates];
    // updatedDates[idx] = e.target.value;
    // setDates(updatedDates);
  };

  function handleStartDateChange (e) {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
  };

  function handleEndDateChange (e) {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
  };

  function handleDateCitySubmit (e) {
    e.preventDefault();
    // Do something with the city and date values

  };

  function handleFinishForm () {

    if (travelName.trim() === "" || cities.some((c) => c.trim() === "")) {
      setFormError("Please fill in all fields");
      return;
    }
    validateForm();

    const datesBetween = getDatesBetween(startDate, endDate);
    updateDates(datesBetween);
    // store all dates -> array of dates
    // send each date to ACTIVITIES MODEL -> map array of dates and send each date to ActivityComponent

    const newTravelCollection = {
      travelName,
      details: {
        cityName: city,
        startingDate: formatDate(startDate),
        endingDate: formatDate(endDate),
      }
    }
    setTravelCollection(newTravelCollection)
    apiService.createTravelCollection(newTravelCollection, user._id);
    setCity('');
    setFormError('');
    setFormSubmitted(true);

  }

  function validateForm () {
    // Only future dates:
    const now = new Date()
    const inputStartDate = new Date(startDate);
    const inputEndDate = new Date(startDate);
    if (inputStartDate < now || inputEndDate < now) return alert('You have to choose a future date.');
    // if (!city || !travelName || !startDate || !endDate) {
    //   // TODO: set message
    //   return alert('Please, fill the required fields.')
    // }
  }

  return (
    <div className="TravelItineraryForm">
      <form className="form" onSubmit={handleDateCitySubmit}>
        <label htmlFor="travel-itinerary">Travel itinerary:</label>
        <button className="btn btn-plus" type="submit" onClick={handleAddInput}>
          <i className="fa fa-plus" ></i>
        </button>
        {cities.map((city, idx) => {
          return (
            <div key={idx} className="travel-itinerary-container">
              <input
                name="travel-itinerary"
                placeholder='City'
                onChange={(e) => {
                  handleCityChange(e);
                  handleCitiesChange(idx, e)
                }}
                value={city}
                type="text"
                required
              />
              <input
                name="travel-itinerary"
                onChange={(e) => {
                  handleStartDateChange(e);
                  handleDatesBetweenChange(idx, e)
                }}
                value={startDate}
                type="date"
                required
              />
              <input
                name="travel-itinerary"
                onChange={(e) => {
                  handleEndDateChange(e);
                  handleDatesBetweenChange(idx, e)
                }}
                value={endDate}
                type="date"
                required
              />
            </div>
          );
        })}
        <button className="btn btn-check" onClick={handleFinishForm}>
          <i className="fa fa-check"></i>
        </button>
      </form>
      {formError && <p className="error-message">{formError}</p>}
    </div>
  );
}

export default TravelItineraryForm;