

import { useEffect, useState } from "react";
import apiService from "../apiService";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext } from "react";

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
    <div className="container horizontal">
      {travelCollections.length > 0 ? (
        <>
          <h2>Your travel collections:</h2>
          {travelCollections
            .filter((travel) => checkUserId(travel._id))
            .map((travel, idx) => {
              const travelId = travel._id;
              const isOpen = openIndex === idx;
              return (
                <div className="container horizontal" key={travel._id}>
                  <div className="list-items dropdown-container" >
                    <h3
                      onClick={() => handleOpen(idx)}
                      className="dropdown-target"
                    >
                      {travel.travelName}
                    </h3>
                    {isOpen && (
                      <div className="menu" key={idx}>
                        <Link to={`/timeline/${travelId}`}>
                          &rarr; Check timeline
                        </Link>
                        <Link to={`/categories/${travelId}`}>
                          &rarr; Check categories
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="close-item">
                    <i
                      className="fa fa-close btn btn-close"
                      onClick={() => handleDelete(travelId)}
                    ></i>
                  </div>
                </div>
              );
            })}
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