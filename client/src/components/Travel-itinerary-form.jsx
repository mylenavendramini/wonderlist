import { useContext, useState } from "react";
import { formatDate, futureDate, getDatesBetween } from "../utils/helper";
import apiService from "../apiService";
import { Context } from "../context/Context";
import TravelInfo from "./Travel-info";

class TravelCollection {
  constructor (travelName, city, startDate, endDate, datesBetween) {
    this.travelName = travelName.trim();
    this.details = {
      cityName: city,
      startingDate: formatDate(startDate),
      endingDate: formatDate(endDate),
      datesBetween: datesBetween
    };
  }
}

function TravelItineraryForm ({ travelNameParent }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [travelCollections, setTravelCollections] = useState([]);
  const { user, cities, updateCities, startDates, updateStartDates, endDates, updateEndDates, } = useContext(Context);

  function handleAddInput () {
    if (cities[cities.length - 1].trim() === "") {
      setFormError("Please fill in the previous city details");
      return;
    }
    updateCities([...cities, ""]);
    updateStartDates([...startDates, ""]);
    updateEndDates([...endDates, ""]);
    setFormError("");
  }

  function handleCityChange (idx, e) {
    const updatedCities = [...cities];
    updatedCities[idx] = e.target.value;
    updateCities(updatedCities);
  }

  function handleStartDateChange (idx, e) {
    const updatedStartDates = [...startDates];
    updatedStartDates[idx] = e.target.value;
    updateStartDates(updatedStartDates);
  }

  function handleEndDateChange (idx, e) {
    const updatedEndDates = [...endDates];
    updatedEndDates[idx] = e.target.value;
    updateEndDates(updatedEndDates);
  }

  function handleFinishForm () {
    if (cities.some((c) => c.trim() === "") || startDates.some((d) => d.trim() === "") || endDates.some((d) => d.trim() === "")) {
      setFormError("Please fill in all fields");
      return;
    }
    if (startDates.some((d) => futureDate(d)) || endDates.some((d) => futureDate(d))) {
      setFormError("Plase choose a future date.");
      return;
    }

    const newTravelCollections = cities.map((city, idx) => {
      const startDate = startDates[idx];
      const endDate = endDates[idx];
      const datesBetween = getDatesBetween(startDate, endDate);
      return new TravelCollection(travelNameParent, city.trim(), startDate, endDate, datesBetween);
    });
    setTravelCollections(prev => [...prev, ...newTravelCollections]);
    newTravelCollections.forEach(newTravel => {
      apiService.createTravelCollection(newTravel, user._id);
    })
    setFormSubmitted(true);
  }

  return (
    <>
      {formSubmitted ? (
        <TravelInfo travelCollections={travelCollections} />
      ) : (
        <form className="form">
          <label htmlFor="travel-itinerary">Travel itinerary:</label>
          <button className="btn btn-plus" type="button" onClick={handleAddInput}>
            Add more
          </button>
          {cities.map((city, idx) => {
            return (
              <div key={idx} className="travel-itinerary-container">
                <input
                  name="travel-itinerary"
                  placeholder="City"
                  onChange={(e) => handleCityChange(idx, e)}
                  value={city}
                  type="text"
                  required
                />
                <input
                  name="travel-itinerary"
                  onChange={(e) => handleStartDateChange(idx, e)}
                  value={startDates[idx]}
                  type="date"
                  required
                />
                <input
                  name="travel-itinerary"
                  onChange={(e) => handleEndDateChange(idx, e)}
                  value={endDates[idx]}
                  type="date"
                  required
                />
              </div>
            );
          })}
          {formError && <p className="error-message">{formError}</p>}
          <button className="btn btn-check" type="button" onClick={handleFinishForm}>
            <i className="fa fa-check"></i>
          </button>
        </form>
      )}
    </>
  );
}

export default TravelItineraryForm;
