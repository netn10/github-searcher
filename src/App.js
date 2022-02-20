
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [submit, setSubmit] = useState(false);
  const [input, setInput] = useState('');
  const [stars, setStars] = useState('');
  const [minMax, setMinMax] = useState('');
  const [date, setDate] = useState('');
  const [langs, setLangs] = useState('');
  const [data, setData] = useState('');
  const [previousSearches, setPreviousSearches] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();

    setSubmit(!submit);

   axios.post("http://127.0.0.1:5000/search", {
    input: input,
    stars: stars,
    minMax: minMax,
    date: date,
    langs: langs,
  })
  .then(function (response) {
    console.log(response);
    setData(response.data.response.items);
    setPreviousSearches([...previousSearches, response.data.last_query]);
  })
  .catch(function (error) {
    console.log(error);
  });

 }

  return(
    <div className="wrapper">
      <h1>Github Searcher</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Search Input</p>
          </label>
          <input name="name" onChange= {(e) => setInput(e.target.value)} value = {input} />
          <label>
            <p>By:</p>
          </label>
          <label>
            <p>Stars</p>
            <select onChange={(e) => setMinMax(e.target.value)} value = {minMax}>
          <option value="empty"></option>
          <option value="min">Min</option>
          <option value="max">Max</option>
        </select>
        <input type="number" name="stars" onChange= {(e) => setStars(e.target.value)} value = {stars} />

          </label>
          <label>
            <p>Last Update Repository (Date)</p>

          <input name="date" onChange= {(e) => setDate(e.target.value)} value = {date} />

          </label>
          <label>
            <p>Programing language/s (Seperate by ,)</p>

          <input name="langs" onChange= {(e) => setLangs(e.target.value)} value = {langs} />

          </label>
        </fieldset>
      
        <button type="submit">Search</button>
      </form>
      
      {previousSearches ? <pre>Previous Searches: {previousSearches}</pre> : null}
      {submit ? <Table data={data} /> : null}
    </div>
  )
}

export default App;
