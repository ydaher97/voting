import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthContext';
import { useTheme  } from '../providers/ThemeContext';
import {getImageUrl} from '../utilits/path'

const Card = ({ item, handleVote }) => {
  const [vote, setVote] = useState(false);
  const [hasUserVoted, setHasUserVoted] = useState(false);

  const [votesByCard, setVotesByCard] = useState({});
   const { user } = useAuth();
   const { theme } = useTheme();
  let backgroundColor = '';

  switch (theme) {
    case 'water':
      backgroundColor = 'blue';
      break;
    case 'earth':
      backgroundColor = 'green';
      break;
    case 'air':
        backgroundColor = 'purple';
      break;
    case 'fire':
        backgroundColor = 'red';
      break;
    default:
      backgroundColor = 'white'; 
      break;
  }
  const handleVoteBtn = () => {
    setVote((prev) => !prev);
  };

  useEffect(() => {
    fetch('https://6571bb42d61ba6fcc013635d.mockapi.io/users')
      .then((response) => response.json())
      .then((data) => {
        const cardVotes = {};
        data.forEach((user) => {
          const userVotes = user.votes || {};
          Object.keys(userVotes).forEach((cardId) => {
            cardVotes[cardId] = (cardVotes[cardId] || 0) + 1;
          });
        });
        setVotesByCard(cardVotes);
        setVote(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

      });
  }, [user]);

  useEffect(() => {
    if (user && user.votes) {
      setHasUserVoted(!!user.votes[item.id]);
     
    }
  }, [item.id, user]);




  return (
    <div className="card" style={{ backgroundColor }}>
      <img src={getImageUrl(item.src)} alt="" />
      <h3>{item.name}</h3>
      <p>Votes: {votesByCard[item.id] || 0}</p>

      {!vote ? (
        <button onClick={handleVoteBtn} disabled={hasUserVoted}>
          {hasUserVoted ? 'Voted' : 'Vote'}
        </button>
      ) : (
        <div>
          <button onClick={() => handleVote(item.id)}>Yes</button>
          <button onClick={handleVoteBtn}>No</button>
        </div>
      )}
    </div>
  );
};

export default Card;
