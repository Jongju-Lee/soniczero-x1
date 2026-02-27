import React from 'react';
import Main from '../sections/home/main/Main';
import Story from '../sections/home/story/Story';
import Cta from '../sections/home/cta/Cta';

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
