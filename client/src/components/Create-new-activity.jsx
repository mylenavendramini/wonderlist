import { useContext, useState } from "react";
import apiService from "../apiService";
import { Context } from '../context/Context';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function CreateNewActivity ({ date, travelId }) {
  const [activity, setActivity] = useState('')
  const [addInput, setAddInput] = useState(false);
  // const [date, setDate] = useState('');
  const { dates, updateDates, activities, updateActivities } = useContext(Context);


  function handleAddInput (inputDate) {
    console.log(inputDate)
    // setDate(inputDate)
    setAddInput(true);
  }

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
      <form className="form" onSubmit={(e) => handleActivitySubmit(e)}>
        <label htmlFor="activity-name">Activity name:</label>
        <input
          type="text"
          name="activity-name"
          value={activity}
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        />
        <button className="btn" type="submit" >
          Create activity
        </button>
      </form>
    </>
  );
}

export default CreateNewActivity;