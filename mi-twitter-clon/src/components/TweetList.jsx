import React from 'react';
import Tweet from './Tweet';
import { useTweets } from '../context/TweetsContext';

function TweetList({ filtro }) {
  const { tweets, likeTweet, editarTweet, eliminarTweet } = useTweets();

  const tweetsFiltrados = filtro
    ? tweets.filter(tweet => tweet.texto.toLowerCase().includes(filtro.toLowerCase()))
    : tweets;

  return (
    <div className="tweet-list">
      {tweetsFiltrados.length === 0 ? (
        <p className="vacio">No hay tweets.</p>
      ) : (
        tweetsFiltrados.map(tweet => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            onLike={likeTweet}
            onEdit={editarTweet}
            onDelete={eliminarTweet}
          />
        ))
      )}
    </div>
  );
}

export default TweetList;