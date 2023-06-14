

import { useEffect, useState } from "react";
import apiService from "../apiService";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext } from "react";
import { scrollToTop, firstLetterUpperCase, counterDate } from "../utils/helper";

function TravelCollections () {

  const [uniqueTravelCollections, setUniqueTravelCollections] = useState([]);
  const { user, travelCollections, updateTravelCollections } = useContext(Context);

  async function getAllTravelCollections () {
    const travelCollections = await apiService.getTravelCollections();
    updateTravelCollections(travelCollections);
  }
  useEffect(() => {
    getAllTravelCollections();
  }, []);

  useEffect(() => {
    const uniqueCollections = [];
    const uniqueNames = [];
    travelCollections.forEach((travel) => {
      if (!uniqueNames.includes(travel.travelName)) {
        uniqueNames.push(travel.travelName);
        uniqueCollections.push(travel);
      }
    });
    setUniqueTravelCollections(uniqueCollections);
  }, [travelCollections]);


  async function handleDelete (id) {
    const travelCollectionToDelete = await apiService.deleteTravelCollection(id);
    console.log(travelCollectionToDelete);
    updateTravelCollections((prevData) =>
      prevData.filter((travel) => travel._id !== id)
    );
  }

  function checkUserId (travelId) {
    if (user) {
      const travelCol = user.travelCollections;
      return travelCol.includes(travelId);
    }
  }

  function getCounter (date) {
    const daysLeft = counterDate(date)
    if (daysLeft === 0) return 'Today is the day!  🥳'
    else if (daysLeft === 1) return `${daysLeft} day for your trip!`
    else return `${daysLeft} days for your trip!`
  }

  function getTodayIsTheDay () {
    return uniqueTravelCollections.filter((travel) => checkUserId(travel._id)).map((travel) => {
      const daysLeft = counterDate(travel.details.startingDate);
      return daysLeft === 0 ? `${firstLetterUpperCase(travel.travelName)} is today!` : '';
    })
  }

  function getOneDay () {
    return uniqueTravelCollections.filter((travel) => checkUserId(travel._id)).map((travel) => {
      const daysLeft = counterDate(travel.details.startingDate);
      return daysLeft === 1 ? `${firstLetterUpperCase(travel.travelName)} is tomorrow! ` : '';
    })
  }

  return (
    <div className="travel-collection-container">
      {travelCollections.length > 0 ? (
        <>
          <h2>YOUR TRAVEL COLLECTIONS</h2>
          <div className="calendar">
            <i className="fa fa-calendar calendar-icon"></i>
            <div>
              <h2>{getOneDay()}</h2>
              <h2>{getTodayIsTheDay()}</h2>
            </div>
          </div>
          <div className="travel-collection-image">
            <div className="travel-collection-boxes">
              {uniqueTravelCollections
                .filter((travel) => checkUserId(travel._id))
                .map((travel) => {
                  const travelId = travel._id;
                  return (
                    <div className="travel-collection-box" key={travel._id}>
                      <h3>
                        {firstLetterUpperCase(travel.travelName)}
                      </h3>
                      <h2 id="counter">{getCounter(travel.details.startingDate)}</h2>
                      <p><span>City: </span>{travel.details.cityName}</p>
                      <p><span>Dates: </span>{travel.details.startingDate} to {travel.details.endingDate}</p>
                      <div className="travel-collection-btns">
                        <Link onClick={scrollToTop} to={`/timeline/${travelId}`} className="btn btn-travel">
                          Timeline
                        </Link>
                        <Link onClick={scrollToTop} to={`/places/${travelId}`} className="btn btn-travel">
                          Fav Places
                        </Link>
                      </div>
                      <Link onClick={scrollToTop} to={`/categories/${travelId}`} className="btn btn-travel-text">
                        Add new places
                      </Link>
                      <div className="close-item btn-close-absolute">
                        <i
                          className="fa fa-close btn btn-close"
                          onClick={() => handleDelete(travelId)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>You need to be logged in to access the travel collections.</h2>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default TravelCollections;