import './App.scss';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [message, setMessage] = useState("Click the button to load data!")

  const fetchData = () => {
    axios.get('/api/data')
      .then((response) => {
        setMessage(response.data.message);
      });
  };

  return (
    <div className="App">
        <h1>{message}</h1>
        <button onClick={fetchData} >
          Fetch Data
        </button>  
    </div>
  );
}

export default App;
