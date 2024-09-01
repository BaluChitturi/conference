import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Presentation() {
  const [presentation, setPresentation] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        const data = response.data.data.items.transcript_data.presentation || [];
        setPresentation(data);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="tab-content">
      <h1>Presentation Details</h1>
      {presentation.length > 0 ? (
        presentation.map((item, index) => (
          <div key={index}>
            <h2>{item.participant_name} ({item.participant_designation})</h2>
            <p><strong>Company:</strong> {item.participant_company}</p>
            {item.transcript_data.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        ))
      ) : (
        <p>No presentation data available.</p>
      )}
    </div>
  );
}

function QA() {
  const [qaData, setQAData] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        const data = response.data.data.items.transcript_data.questions_and_answers || [];
        setQAData(data);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="tab-content">
      <h1>Q&A Details</h1>
      {qaData.length > 0 ? (
        qaData.map((qa, index) => (
          <div key={index}>
            {qa.transcript_data.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        ))
      ) : (
        <p>No Q&A data available.</p>
      )}
    </div>
  );
}

function CorporateParticipants() {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        const data = response.data.data.items.transcript_data.participants?.executives || [];
        setExecutives(data);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="tab-content">
      <h1>Corporate Participants</h1>
      {executives.length > 0 ? (
        <ul>
          {executives.map((executive, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {executive.name}</p>
              <p><strong>Company:</strong> {executive.company}</p>
              <p><strong>Designation:</strong> {executive.designation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No executive data available.</p>
      )}
    </div>
  );
}

function ConferenceCallParticipants() {
  const [analysts, setAnalysts] = useState([]);

  useEffect(() => {
    axios.get('/data.json')
      .then((response) => {
        const data = response.data.data.items.transcript_data.participants?.analyst || [];
        setAnalysts(data);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="tab-content">
      <h1>Conference Call Participants</h1>
      {analysts.length > 0 ? (
        <ul>
          {analysts.map((analyst, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {analyst.name}</p>
              <p><strong>Company:</strong> {analyst.company}</p>
              <p><strong>Designation:</strong> {analyst.designation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No analyst data available.</p>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="tabs">
          <Link to="/" className="tab-link">Presentation</Link>
          <Link to="/qa" className="tab-link">Q&A</Link>
          <Link to="/corporate-participants" className="tab-link">Corporate Participants</Link>
          <Link to="/conference-call-participants" className="tab-link">Conference Call Participants</Link>
        </div>

        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/corporate-participants" element={<CorporateParticipants />} />
          <Route path="/conference-call-participants" element={<ConferenceCallParticipants />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
