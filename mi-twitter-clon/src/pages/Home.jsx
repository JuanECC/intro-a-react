import React, { useState } from 'react';
import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';
import SearchBar from '../components/SearchBar';

function Home() {
  const [filtro, setFiltro] = useState('');

  return (
    <div className="home">
      <h2>Inicio</h2>
      <TweetForm />
      <SearchBar filtro={filtro} setFiltro={setFiltro} />
      <TweetList filtro={filtro} />
    </div>
  );
}

export default Home;