import React, { useState } from 'react';
import './styles.css';

function App() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const fetchGender = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.genderize.io/?name=${name}`);
      const data = await response.json();
      setGender(data.gender);
    } catch (error) {
      setError('Error fetching gender data');
    }

    setLoading(false);
  };

  const fetchNationality = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();
      if (data.country && data.country.length > 0) {
        setNationality(data.country[0].country_id);
      } else {
        setNationality('Unknown');
      }
    } catch (error) {
      setError('Error fetching nationality data');
    }

    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchGender();
    await fetchNationality();
  };

  return (
    <div>
      <h1>Gender and Nationality API Demo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Enter Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Gender & Nationality'}
        </button>
      </form>
      {gender && (
        <p>
          Gender for "{name}" is: {gender}
        </p>
      )}
      {nationality && (
        <p>
          Nationality for "{name}" is: {nationality}
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
