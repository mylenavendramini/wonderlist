import { useState } from "react";
import apiService from "../apiService";
import { formatDate, getDatesBetween } from "../utils/helper";
import TravelInfo from "./Travel-info";
import { useContext } from 'react';
import { Context } from '../context/Context';

function TravelForm () {
  const [travelName, setTravelName] = useState('');
  const [city, setCity] = useState('');
  const [cities, setCities] = useState(['']);
  // const [dates, setDates] = useState(['']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelCollection, setTravelCollection] = useState({});
  const { user, updateUser, dates, updateDates } = useContext(Context);
  console.log(user)

  function handleTravelNameChange (e) {
    const newName = e.target.value;
    setTravelName(newName);
  };

  function handleTravelNameSubmit (e) {
    e.preventDefault();
    setTravelName('');
  };

  // Itinerary inputs
  function handleAddInput () {
    setCities([...cities, '']);
    updateDates([...dates, '']);
    if (cities.length > 1 && dates.length > 1) {
      setCities([...cities, '']);
      updateDates([...dates, '']);
    } else {
      // TODO: create error message
      alert('You need to have at least one city and dates.')
    }
  };

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
    console.log(user._id)
    apiService.createTravelCollection(newTravelCollection, user._id);
    setCity('');
    // setStartDate('');
    // setEndDate('');

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
    <div className="travel-form">
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
      </form>

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
      {travelCollection.travelName ? <TravelInfo travelCollection={travelCollection} dates={dates} cities={cities} /> : ''}


    </div>
  );
}

export default TravelForm;