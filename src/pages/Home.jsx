import React from 'react';
import Main from '../sections/home/Main';
import Story from '../sections/home/Story';
import Cta from '../sections/home/Cta';

const Home = () => {
  return (
    <article className="home">
      <Main />
      <Story />
      <Cta />
    </article>
  );
};

export default Home;
