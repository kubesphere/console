/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
