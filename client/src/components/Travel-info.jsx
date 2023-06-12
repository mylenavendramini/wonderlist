import { useNavigate } from 'react-router-dom';


function TravelInfo ({ travelCollections }) {
  const navigate = useNavigate();

  function handleClick () { navigate('/travel-collections') };

  return (
    <div className="travel-info">
      <form className="form">
        <h3>Travel information:</h3>
        <div className="edit-information-item">
          {travelCollections.map((travelCol, idx) => (
            <div className="new-date-city" key={idx}>
              <p><span>City: </span>{travelCol.details.cityName}</p>
              <p><span>Dates: </span>{travelCol.details.startingDate} to {travelCol.details.endingDate}</p>
            </div>
          ))}

          <button className="btn btn-check" onClick={handleClick}>
            <i className="fa fa-check"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TravelInfo;