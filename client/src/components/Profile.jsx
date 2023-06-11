import TravelForm from './Travel-form';
import { useContext } from 'react';
import { Context } from '../context/Context';

function Profile () {
  // const initialState = {
  //   userName: '',
  // };
  // const [user, setUser] = useState(initialState);
  const { user } = useContext(Context);
  // const userName = user.userName;

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const getUserProfile = async (accessToken) => {
  //     const userInfo = await profile(accessToken);
  //     if (userInfo) {
  //       const { userName } = userInfo;
  //       setUser((prev) => {
  //         return {
  //           ...prev,
  //           userName,
  //         };
  //       });
  //     } else {
  //       console.log('No user info found 😞');
  //     }
  //   };
  //   getUserProfile(accessToken);
  // }, []);

  return (
    <div className="container">
      <h2>Welcome, {user && user.userName} </h2>
      <TravelForm />
    </div>
  );
}

export default Profile;