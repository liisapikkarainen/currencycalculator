import './App.css';
import { useState } from 'react';

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = 'adb0a2ada9af439ccb41b04739212c3c';

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);
  
      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);
  
        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate.');
        console.log(response);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div>
          <h3>Exchange rates</h3>
          <label>EUR</label>&nbsp;
          <input type="number" step="0.01"
          value={eur} onChange={e => setEur(e.target.value)} />
          <output> {rate}</output>
        </div>
        <div>
          <label>GBP:</label>&nbsp;
          <output>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;