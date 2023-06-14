import TravelForm from './Travel-form';
import { useContext } from 'react';
import { Context } from '../context/Context';

function Profile () {
  const { user } = useContext(Context);

  return (
    <div className="container">
      <h2>Welcome, {user && user.userName} </h2>
      <TravelForm />
    </div>
  );
}

export default Profile;