import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

const CardVotesChart = ({ allUsers }) => {
  const [cardVotesData, setCardVotesData] = useState({});

  useEffect(() => {
    if (allUsers.length > 0) {
      // Calculate the number of votes for each card
      const cardVotes = {};

      allUsers.forEach((user) => {
        const votes = user.votes || {};
        Object.keys(votes).forEach((cardId) => {
          cardVotes[cardId] = (cardVotes[cardId] || 0) + 1;
        });
      });

      setCardVotesData(cardVotes);
    }
  }, [allUsers]);
  console.log(cardVotesData)

  // Explicitly register the required scales and controllers
  Chart.register(CategoryScale, LinearScale, BarController, BarElement);

  // Prepare data for Chart.js
  const chartData = {
    labels: Object.keys(cardVotesData),
    datasets: [
      {
        label: 'Number of Votes',
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
        hoverBorderColor: 'rgba(0, 0, 0, 1)',
        data: Object.values(cardVotesData),
      },
    ],
  };

  return (
    <div style={{ height: '350px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default CardVotesChart;
