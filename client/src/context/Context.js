import { createContext, useState } from "react";

export const Context = createContext();


export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [travelCollections, setTravelCollections] = useState([]);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [placeInfo, setPlaceInfo] = useState([]);

  const [travelName, setTravelName] = useState('')
  // Need to start with something, to have input in the TravelItineraryForm
  const [startDates, setStartDates] = useState([''])
  const [endDates, setEndDates] = useState([''])
  const [cities, setCities] = useState(['']);
  const [dates, setDates] = useState(['9th June, 2023', '10th June, 2023']);

  const updateUser = (newUser) => {
    setUser(newUser)
  }

  const updateCities = (newCities) => {
    setCities(newCities)
  }

  const updateStartDates = (newStartDates) => {
    setStartDates(newStartDates)
  }

  const updateEndDates = (newEndDates) => {
    setEndDates(newEndDates)
  }

  const updateTravelName = (newTravelName) => {
    setTravelName(newTravelName)
  }

  const updateTravelCollections = (newTravelCollections) => {
    setTravelCollections(newTravelCollections)
  }

  const updateDates = (newDates) => {
    setDates(newDates)
  }

  const updateActivities = (newActivities) => {
    setActivities(newActivities)
  }

  const updateCategories = (newCategory) => {
    setCategories(newCategory)
  }

  const updatePlaceInfo = (newPlaceInfo) => {
    setPlaceInfo(newPlaceInfo)
  }


  return (
    <Context.Provider value={{ user, updateUser, travelCollections, updateTravelCollections, dates, updateDates, activities, updateActivities, categories, updateCategories, placeInfo, updatePlaceInfo, cities, updateCities, startDates, updateStartDates, endDates, updateEndDates, travelName, updateTravelName }}>
      {children}
    </Context.Provider>
  )
}