
import CreateNewActivity from './Create-new-activity';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Context } from '../context/Context';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../apiService';

function TimelineItem ({ date }) {
  const { activities, updateActivities } = useContext(Context);
  const { id } = useParams();

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

  useEffect(() => {
    getAllActivities();
  }, []);


  return (
    <div>
      <div className="timeline-item">
        <h3 className="vertical-timeline-element-title">London</h3>
        {activities.filter((activity) => activity.date === date).map((activity, idx) => (
          <div className='list-items' key={idx}>
            <i className="fa fa-check btn btn-close"></i>
            <li>{activity.activity}</li>
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
                {' '}
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