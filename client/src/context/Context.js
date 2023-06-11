import { createContext, useState } from "react";

export const Context = createContext();


export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dates, setDates] = useState(['9th June, 2023', '10th June, 2023']);
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateUser = (newUser) => {
    setUser(newUser)
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

  return (
    <Context.Provider value={{ user, updateUser, dates, updateDates, activities, updateActivities, categories, updateCategories }}>
      {children}
    </Context.Provider>
  )
}