import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout';
import Home from './Home';
import TimelineList from './Timeline-list';
import CategoriesList from './Categories-list';
import TravelCollections from './Travel-collections';
import UserMap from './Map';
import Places from './Places';


const Dashboard = ({ setIsAuthenticated }) => {
  const cityName = "London";
  return (
    <section className="dashboard">
      <Routes>
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timeline/:id" element={<TimelineList />} />
        <Route path="/categories/:id" element={<CategoriesList />} />
        <Route path="/places/:id" element={<Places />} />
        <Route path="/user-map/:id" element={<UserMap cityName={cityName} />} />
        <Route path="/travel-collections" element={<TravelCollections />} />

        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </section>
  );
};

export default Dashboard;