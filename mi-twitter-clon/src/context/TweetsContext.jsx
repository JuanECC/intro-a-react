import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const { user } = useAuth();
  const [tweets, setTweets] = useState(() => {
    const guardados = localStorage.getItem('tweets');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
  }, [tweets]);

  const agregarTweet = (texto) => {
    const nuevoTweet = {
      id: Date.now(),
      texto,
      autorId: user.id,
      autorNombre: user.nombre,
      likes: 0,
      fecha: new Date().toISOString()
    };
    setTweets([nuevoTweet, ...tweets]);
  };

  const likeTweet = (id) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
    ));
  };

  const editarTweet = (id, nuevoTexto) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, texto: nuevoTexto } : tweet
    ));
  };

  const eliminarTweet = (id) => {
    setTweets(tweets.filter(tweet => tweet.id !== id));
  };

  return (
    <TweetsContext.Provider value={{ tweets, agregarTweet, likeTweet, editarTweet, eliminarTweet }}>
      {children}
    </TweetsContext.Provider>
  );
}

export const useTweets = () => useContext(TweetsContext);