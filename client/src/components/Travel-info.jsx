import { useNavigate } from 'react-router-dom';

function TravelInfo ({ travelCollection, dates, cities }) {
  const navigate = useNavigate();


  // const [travelCol, setTravelCol] = useState({})
  // const [createAct, setCreateAct] = useState(false);

  const travelCollectionInfo = travelCollection.details;

  // const [activities, setActivities] = useState([''])

  // function handleAddActivity () {
  //   setCreateAct(true)
  // }

  // function handleActivitiesChange (date, e, idx) {
  //   console.log(idx)
  //   const updatedActivities = [...activities];
  //   updatedActivities[date] = e.target.value;
  //   console.log(updatedActivities)
  //   setActivities(updatedActivities);
  // }

  function handleClick () { navigate('/travel-collections') };

  return (
    <div className="travel-info">
      <form className="form">
        <h3>Travel information:</h3>
        <div className="edit-information-item">
          <div className="new-date-city">
            <p><span>City: </span>{travelCollectionInfo.cityName}</p>
            <p><span>Date: </span>{travelCollectionInfo.startingDate} to {travelCollectionInfo.endingDate}</p>
          </div>
          <button className="btn btn-check" onClick={handleClick}>
            <i className="fa fa-check"></i>
          </button>


          {/*<button className="btn" onClick={handleAddActivity} type="button">
            Add activities
  </button>*/}

        </div>
      </form>
      {/*
      {createAct ? <CreateNewActivity travelCollection={travelCollection} dates={dates} cities={cities} /> : ''}*/}
    </div>
  );
}

export default TravelInfo;