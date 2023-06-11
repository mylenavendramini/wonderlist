import { createContext, useState } from "react";

export const Context = createContext();


export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [travelCollections, setTravelCollections] = useState([]);
  const [dates, setDates] = useState(['9th June, 2023', '10th June, 2023']);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [placeInfo, setPlaceInfo] = useState([]);

  const updateUser = (newUser) => {
    setUser(newUser)
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
    <Context.Provider value={{ user, updateUser, travelCollections, updateTravelCollections, dates, updateDates, activities, updateActivities, categories, updateCategories, placeInfo, updatePlaceInfo }}>
      {children}
    </Context.Provider>
  )
}