import { useNavigate } from 'react-router-dom';

function Home () {
  const navigate = useNavigate();
  const handleOnClick = () => navigate('/register');
  return (
    <div className="home-wrap">
      <div className="home-content">
        <h1>Wonder List</h1>
        <h2>Unlock the Wonders of Travel</h2>
        <button className="btn" onClick={handleOnClick}>Start</button>
      </div>
    </div>
  );
}

export default Home;