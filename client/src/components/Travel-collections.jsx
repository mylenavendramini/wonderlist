

import { useEffect, useState } from "react";
import apiService from "../apiService";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext } from "react";
import { scrollToTop, firstLetterUpperCase } from "../utils/helper";

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
    // Filter unique travel collections based on their names
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



  return (
    <div className="travel-collection-container">
      {travelCollections.length > 0 ? (
        <>
          <h2>YOUR TRAVEL COLLECTIONS</h2>
          <div className="travel-collection-image">
            <div className="travel-collection-boxes">
              {uniqueTravelCollections
                .filter((travel) => checkUserId(travel._id))
                .map((travel, idx) => {
                  const travelId = travel._id;
                  return (
                    <div className="travel-collection-box" key={travel._id}>
                      <h3>
                        {firstLetterUpperCase(travel.travelName)}
                      </h3>
                      <div className="travel-collection-btns">
                        <Link onClick={scrollToTop} to={`/timeline/${travelId}`} className="btn btn-travel">
                          Timeline
                        </Link>
                        <Link onClick={scrollToTop} to={`/places/${travelId}`} className="btn btn-travel">
                          My places
                        </Link>
                        <Link onClick={scrollToTop} to={`/categories/${travelId}`} className="btn btn-travel">
                          Add new places
                        </Link>
                      </div>
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
            <div className="image-relative">
              <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_Rfd6wq.json" background="transparent" speed="1" loop autoplay></lottie-player>
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