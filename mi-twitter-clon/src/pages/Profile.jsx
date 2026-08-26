import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTweets } from '../context/TweetsContext';
import Avatar from '../components/Avatar';

function Profile() {
  const { user } = useAuth();
  const { tweets } = useTweets();

  const misTweets = tweets.filter(tweet => tweet.autorId === user.id);

  return (
    <div className="profile">
      <h2>Perfil</h2>
      <div className="profile-header">
        <Avatar nombre={user.nombre} color={user.avatarColor} tamaño={80} />
        <h3>{user.nombre}</h3>
      </div>
      <div className="stats">
        <p><strong>{misTweets.length}</strong> tweets</p>
        <p><strong>{misTweets.reduce((total, tweet) => total + tweet.likes, 0)}</strong> likes recibidos</p>
      </div>
    </div>
  );
}

export default Profile;