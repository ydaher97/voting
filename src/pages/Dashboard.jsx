import React, { useEffect } from 'react';
import { items } from '../utilits/cards';
import Card from '../components/Card';
import './dashboard.css';
import { useAuth } from '../providers/AuthContext';
import { useState } from 'react';
import { useMessage } from '../providers/MessageContext';
import { useTheme } from '../providers/ThemeContext';

const Dashboard = () => {
  const { user, updateUserAfterVote } = useAuth();
  const [votedCards, setVotedCards] = useState([]);
  const { errorMessage, successMessage, showError, showSuccess } = useMessage();
  const { changeTheme } = useTheme();

  const handleVote = async (cardId) => {
    if (votedCards.includes(cardId)) {
      console.log('User has already voted for this card.');
      return;
    }

    const updateUserEndpoint = `https://6571bb42d61ba6fcc013635d.mockapi.io/users/${user.id}`;

    try {
      const response = await fetch(updateUserEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isVoting: true,
          votes: {
            [cardId]: true,
          },
        }),
      });

      if (response.ok) {
        await updateUserAfterVote();

        showSuccess('Vote successful!');
        setVotedCards([...votedCards, cardId]);

        switch (cardId) {
          case 1:
          changeTheme('air');
            break;
          case 2:
            changeTheme('water');
            break;
          case 3: 
            changeTheme('earth');
            break;
            case 4: 
            changeTheme('fire');
            break;
          default:
            changeTheme('default');
            break;
        }
        
      } else {
        console.error('Failed to update user data');
        showError('Error.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Regular User Dashboard</h2>
      {errorMessage && <div className="error-banner">{errorMessage}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}
      <div className="dashboard">
        {items.map((item) => (
          <Card key={item.id} item={item} handleVote={() => handleVote(item.id)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
