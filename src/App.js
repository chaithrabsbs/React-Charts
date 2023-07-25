import logo from './logo.svg';
import './App.css';
import BarChart from './Charts/BarChart';
import Piechart from './Charts/PieChart';
import DoughnutChart from './Charts/DoughnutChart';
import "./styles.css";
import React, { useState, useEffect } from 'react'


function App() {
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Barchart':
        return <BarChart />;
      case 'Piechart':
        return <Piechart />;
        case 'Doughnutchart':
        return <DoughnutChart />;
      default:
        return null;
    }
  };
  return (

    <div className="chartCard">
      <div className="chartBox">
      {renderSelectedComponent()}
      <label  style={{color : 'rgba(54,162,235,1)'}}>Select a Chart to display:</label>
      
      <select onChange={handleComponentChange} style={{color : 'rgba(54,162,235,1)'}}>
        <option value="">Select...</option>
        <option value="Barchart">Barchart<BarChart/></option>
        <option value="Piechart">Piechart<Piechart/></option>
        <option value="Doughnutchart">Doughnutchart<DoughnutChart/></option>
      </select>
      </div>
    </div>
  );
}

export default App;
