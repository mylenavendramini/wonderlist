
import CreateNewActivity from './Create-new-activity';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Context } from '../context/Context';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../apiService';
import { firstLetterUpperCase } from '../utils/helper';


function TimelineItem ({ date, travelCol }) {
  const [checkedActivities, setCheckedActivities] = useState([]);
  const { activities, updateActivities } = useContext(Context);
  const { id } = useParams();
  const travelCollectionDetails = travelCol.details;

  async function getAllActivities () {
    const activitiesItems = await apiService.getActivities();
    updateActivities(activitiesItems);
  }

  async function handleDelete (id) {
    const activityToDelete = await apiService.deleteActivity(id);
    console.log(activityToDelete);
    updateActivities((prevData) =>
      prevData.filter((activity) => activity._id !== id)
    );
  }

  function handleCheck (activityId) {
    if (checkedActivities.includes(activityId)) {
      setCheckedActivities(checkedActivities.filter((id) => id !== activityId));
    } else {
      setCheckedActivities([...checkedActivities, activityId]);
    }
  }

  useEffect(() => {
    getAllActivities();
  }, []);


  return (
    <div>
      <div className="timeline-item">
        <h3 className="vertical-timeline-element-title">{firstLetterUpperCase(travelCollectionDetails.cityName)}</h3>
        {activities.filter((activity) => activity.date === date).map((activity, idx) => (
          <div className={checkedActivities.includes(activity._id) ? 'list-items checked' : 'list-items'} key={idx}>
            <i className="fa fa-check btn btn-close" onClick={() => handleCheck(activity._id)}></i>
            <li className={checkedActivities.includes(activity._id) ? 'toggle-check' : null}>{activity.activity}</li>
            <div className='close-item'>
              <i className="fa fa-close btn btn-close" onClick={() => handleDelete(activity._id)}></i>
            </div>
          </div>

        ))}

        <Popup trigger={<button className="btn btn-add">
          <i className="fa fa-plus" ></i>
        </button>} modal nested
          position="right center">
          {close => (
            <div className="modal">
              <button className="close" onClick={close}>
                <i className="fa fa-close btn btn-close"></i>
              </button>
              <div className="content">
                <CreateNewActivity date={date} travelId={id} />
              </div>
            </div>
          )}
        </Popup>

      </div>
    </div>
  );
}

export default TimelineItem;