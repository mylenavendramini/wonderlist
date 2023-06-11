import { useState } from "react";

import TravelInfo from "./Travel-info";
import { useContext } from 'react';
import { Context } from '../context/Context';
import TravelNameForm from "./Travel-name-form";


function TravelForm () {

  const [travelCollection, setTravelCollection] = useState({});
  const [cities, setCities] = useState(['']);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user, updateUser, dates, updateDates } = useContext(Context);
  console.log(user)

  return (
    <div className="travel-form">
      <TravelNameForm setFormSubmitted={setFormSubmitted} cities={cities} setCities={setCities} formSubmitted={formSubmitted} setTravelCollection={setTravelCollection} travelCollection={travelCollection} />
    </div>
  );
}

export default TravelForm;