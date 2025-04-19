import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './VotingB.css';
import uv from './uv.jpg';
import Harsha from './Harsha.jpg';
import Loki from './loki.jpg';
import Gana from './Gana.jpg';
import Gopi from './Gopi.jpg';

const contestants = {
  President: [
    {
      id: 1,
      name: "Vamsi Uyyala",
      department: "CSE",
      year: "3rd",
      manifesto: "Student Side",
      image: uv
    },
    {
      id: 2,
      name: "Lokeswara Rao Gade",
      department: "CSE",
      year: "3rd",
      manifesto: "Trust me!!!",
      image: Loki
    },
    {
      id: 3,
      name: "GopiChand Kattamuri",
      department: "CSE",
      year: "3rd",
      manifesto: "Believe me!!!",
      image: Gopi
    }
  ],
  "Vice President": [
    {
      id: 4,
      name: "Harsha Vardhan Balaka",
      department: "CSE",
      year: "3rd",
      manifesto: "Good Person here",
      image: Harsha
    },
    {
      id: 5,
      name: "Gana Abhiram Reddi",
      department: "CSE",
      year: "3rd",
      manifesto: "Do or Die",
      image: Gana
    }
  ]
};

const NonVotersVotingPage = () => {
  const handleVote = (candidateId, position) => {
    alert(`You voted for candidate ID ${candidateId} for ${position}`);
    // Here you can integrate Web3 vote logic using contract.methods.vote(candidateId).send(...)
  };

  return (
    <div className="container mt-4">
      <h2 className="main-heading">🗳️ Contestants</h2>

      {Object.entries(contestants).map(([category, candidates]) => (
        <div
          key={category}
          className={`section ${category === 'President' ? 'section-president' : 'section-vice-president'}`}
        >
          <h4 className="category-title">{category}</h4>
          <div className="contestants-grid">
            {candidates.map((c, index) => (
              <Card
                key={c.id}
                className={`custom-card ${category === 'President' ? 'president-card' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card.Img variant="top" src={c.image} alt={c.name} className="card-img-top" />
                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>
                  <Card.Text><strong>ID:</strong> {c.id}</Card.Text>
                  <Card.Text><strong>Dept:</strong> {c.department}</Card.Text>
                  <Card.Text><strong>Year:</strong> {c.year}</Card.Text>
                  <Card.Text><strong>Manifesto:</strong> {c.manifesto}</Card.Text>
                  <Button
                    variant="primary"
                    className="vote-button mt-2"
                    onClick={() => handleVote(c.id, category)}
                  >
                    Vote
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NonVotersVotingPage;
