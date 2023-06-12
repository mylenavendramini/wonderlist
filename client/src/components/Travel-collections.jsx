

import { useEffect, useState } from "react";
import apiService from "../apiService";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext } from "react";
import { ScrollToTop, firstLetterUpperCase } from "../utils/helper";

function TravelCollections () {
  // const [travelCollections, setTravelCollections] = useState([]);
  // const [open, setOpen] = useState(false);  // dropdown
  const [openIndex, setOpenIndex] = useState(null); // index of the open dropdown
  const { user, travelCollections, updateTravelCollections } = useContext(Context);

  async function getAllTravelCollections () {
    const travelCollections = await apiService.getTravelCollections();
    updateTravelCollections(travelCollections);
  }
  useEffect(() => {
    getAllTravelCollections();
  }, []);


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

  const handleOpen = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="travel-collection-container">
      {travelCollections.length > 0 ? (
        <>
          <h2>Your travel collections:</h2>
          <div className="travel-collection-boxes">
            {travelCollections
              .filter((travel) => checkUserId(travel._id))
              .map((travel, idx) => {
                const travelId = travel._id;
                return (
                  <div className="travel-collection-box" key={travel._id}>
                    <h3>
                      {firstLetterUpperCase(travel.travelName)}
                    </h3>
                    <div className="travel-collection-btns">
                      <Link onClick={ScrollToTop} to={`/timeline/${travelId}`} className="btn btn-travel">
                        Timeline
                      </Link>
                      <Link onClick={ScrollToTop} to={`/categories/${travelId}`} className="btn btn-travel">
                        Categories
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