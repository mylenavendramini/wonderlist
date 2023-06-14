import { useContext, useState } from "react";
import apiService from "../apiService";
import { Context } from '../context/Context';

function CreateNewActivity ({ date, travelId }) {
  const [activity, setActivity] = useState('')
  const { updateActivities } = useContext(Context);

  function handleActivitySubmit (e) {
    e.preventDefault();
    const newActivity = {
      date: date,
      activity: activity,
      isImportant: false,
    }
    updateActivities((prevState) => ([
      ...prevState,
      newActivity
    ]));

    apiService.createActivity(newActivity, travelId).then(newActivity => setActivity(''));
  }

  return (
    <>
      <form className="form activity" onSubmit={(e) => handleActivitySubmit(e)}>
        <label htmlFor="activity-name">Activity name:</label>
        <input
          type="text"
          name="activity-name"
          value={activity}
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        />
        <button className="btn btn-travel" type="submit" >
          Create activity
        </button>
      </form>
    </>
  );
}

export default CreateNewActivity;