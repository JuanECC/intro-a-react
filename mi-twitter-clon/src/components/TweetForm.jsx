import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetsContext';

function TweetForm() {
  const { user } = useAuth();
  const { agregarTweet } = useTweets();
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    agregarTweet(texto.trim());
    setTexto('');
  };

  if (!user) {
    return <p className="mensaje-login">Inicia sesión para publicar tweets.</p>;
  }

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="¿Qué estás pensando?"
        rows="3"
      />
      <button type="submit" className="btn-tweet">Tweet</button>
    </form>
  );
}

export default TweetForm;