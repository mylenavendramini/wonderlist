import { useNavigate } from 'react-router-dom';


function Home ({ isAuthenticated }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    isAuthenticated ? navigate('/profile') : navigate('/login');
  }
  return (
    <div className="home-wrap">
      <div className="home-content">
        <h1>Wonder List</h1>
        <h2>Unlock the Wonders of Travel</h2>
        <button className="btn btn-grad" onClick={handleOnClick}>LET'S TRAVEL</button>
      </div>
    </div>
  );
}

export default Home;