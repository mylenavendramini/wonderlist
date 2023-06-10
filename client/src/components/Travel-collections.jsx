

import { useEffect, useState } from "react";
import apiService from "../apiService";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { useContext } from "react";

function TravelCollections () {
  const [travelCollections, setTravelCollections] = useState([]);
  const [open, setOpen] = useState(false);  // dropdown
  const { user } = useContext(Context);

  async function getAllTravelCollections () {
    const travelCollections = await apiService.getTravelCollections();
    setTravelCollections(travelCollections);
  }
  useEffect(() => {
    getAllTravelCollections();
  }, []);

  async function handleDelete (id) {
    const travelCollectionToDelete = await apiService.deleteTravelCollection(id);
    console.log(travelCollectionToDelete);
  }

  function checkUserId (travelId) {
    if (user) {
      const travelCol = user.travelCollections;
      return travelCol.includes(travelId);
    }
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="travel-collections">
      <h2>Your travel collections: </h2>
      {travelCollections.filter((travel) => checkUserId(travel._id)).map((travel, idx) => {
        const travelId = travel._id;
        return (
          <div className="travel-collection-item" key={idx}>
            <div className="list-items dropdown-container" key={idx}>
              <h3 onClick={handleOpen} className="dropdown-target">{travel.travelName}</h3>
              {open &&
                <div className="menu" key={idx}>
                  <Link to={`/timeline/${travelId}`} key={idx}>&rarr; Check timeline</Link>
                  <Link to={`/categories/${travelId}`} key={idx}>&rarr; Check categories</Link>
                </div>
              }

            </div>
            <div className='close-item'>
              <i className="fa fa-close btn btn-close" onClick={() => handleDelete(travelId)}></i>
            </div>
          </div>
        )
      }
      )}


    </div>
  );
}

export default TravelCollections;