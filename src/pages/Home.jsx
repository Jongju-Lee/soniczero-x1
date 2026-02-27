import React from 'react';
import Main from '../sections/home/main/Main';
import Storytelling from '../sections/home/storytelling/Storytelling';
import Cta from '../sections/home/cta/Cta';

const Home = () => {
  return (
    <article className="home">
      <Main />
      <Storytelling />
      <Cta />
    </article>
  );
};

export default Home;
