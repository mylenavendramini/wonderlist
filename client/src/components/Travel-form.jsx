import { useState } from "react";
import TravelNameForm from "./Travel-name-form";

function TravelForm () {
  const [cities, setCities] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="travel-form">
      <TravelNameForm setFormSubmitted={setFormSubmitted} cities={cities} setCities={setCities} formSubmitted={formSubmitted} />
    </div>
  );
}

export default TravelForm;