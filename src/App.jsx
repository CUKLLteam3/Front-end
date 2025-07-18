import Map from './components/Map/Map';
import AirDataDisplay from './components/AirDataDisplay/AirDataDisplay';
import GuidanceDisplay from './components/GuidanceDisplay/GuidanceDisplay';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>AirAction Frontend</h1>
      <section className="component-section">
        <Map />
      </section>
      <section className="component-section">
        <AirDataDisplay />
      </section>
      <section className="component-section">
        <GuidanceDisplay />
      </section>
    </div>
  );
}

export default App;
