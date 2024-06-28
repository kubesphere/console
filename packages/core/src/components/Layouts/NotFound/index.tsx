import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { homePage } = globals.config;

  useEffect(() => {
    if (homePage) {
      navigate(homePage);
    } else {
      navigate('/dashboard');
    }
  }, []);

  return null;
};

export default Home;
