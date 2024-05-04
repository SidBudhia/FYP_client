import React, { useState } from "react";
import "./Frontend.css"; // Import CSS file for styling
import axios from "axios";

const Frontend = () => {
  // State variables to store input values and units
  const [infillDensity, setInfillDensity] = useState("");
  const [rasterAngle, setRasterAngle] = useState("");
  const [layerThickness, setLayerThickness] = useState("");

  const [result, setResult] = useState("");

  const server = process.env.REACT_APP_SERVER;

  // Function to handle search button click
  const handleSearch = async () => {
    // Perform actions for triggering the prediction
    console.log("Search button clicked");
    // You can send these input values to the backend for prediction
    const data = {
      num1: infillDensity,
      num2: rasterAngle,
      num3: layerThickness,
    };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const resp = await axios.post(`${server}/predict`, data, config);
      console.log("resp", resp);

      const result = resp.data.result;
      console.log("data", result);

      setResult(result);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  return (
    <div className="frontend-container">
      <h2>Predict tensile strength of your specimen</h2>
      <div className="input-group">
        <label>
          Infill Density (in %):
          <input
            type="number"
            value={infillDensity}
            onChange={(e) => setInfillDensity(e.target.value)}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Raster Angle (in degree):
          <input
            type="number"
            value={rasterAngle}
            onChange={(e) => setRasterAngle(e.target.value)}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Layer Thickness:
          <input
            type="number"
            value={layerThickness}
            onChange={(e) => setLayerThickness(e.target.value)}
          />
        </label>
      </div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>

      <div className="result">{result && <h3>{result}</h3>}</div>
    </div>
  );
};

export default Frontend;
