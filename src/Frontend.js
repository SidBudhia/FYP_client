import React, { useState, useEffect } from "react";
import "./Frontend.css"; // Import CSS file for styling
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Frontend = () => {
  // State variables to store input values and units
  const [infillDensity, setInfillDensity] = useState(0);
  const [rasterAngle, setRasterAngle] = useState(0);
  const [layerThickness, setLayerThickness] = useState(0);

  const [result, setResult] = useState(null);
  const [errorShown, setErrorShown] = useState("");
  const [loading, setLoading] = useState(false);


  const server = process.env.REACT_APP_SERVER;

  // Function to handle search button click
  const handleSearch = async () => {

    setLoading(true);
    // Perform actions for triggering the prediction
    console.log("Search button clicked");
    // You can send these input values to the backend for prediction
    const data = {
      num1: layerThickness,
      num2: rasterAngle,
      num3: infillDensity,
    };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const resp = await axios.post(`${server}/predict`, data, config);
      // console.log("resp", resp);

      const result = resp.data.result;
      // console.log("data", result);

      setResult(result);
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    } finally {
      // Set loading state to false after the request is completed
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if any error condition is met, and if so, set the error state
    if (
      (parseFloat(infillDensity) > 100 || parseFloat(infillDensity) <= 0) ||
      (parseFloat(rasterAngle) > 90 || parseFloat(rasterAngle) < 0) ||
      (parseFloat(layerThickness) > 5 || parseFloat(layerThickness) <= 0)
    ) {
      setErrorShown(true);
    } else {
      setErrorShown(false);
    }
  }, [infillDensity, rasterAngle, layerThickness]);

  return (
    <div className="frontend-container">
      <h2>Predict tensile strength of your ABS reinforced with carbon fiber</h2>

      <div className="input-group">
        <label>
          Layer Thickness (in mm):</label>
          <input
            type="number"
            min="0"
            max="5"
            step=".01"
            value={layerThickness}
            onChange={(e) => setLayerThickness(e.target.value)}
          />
        {(parseFloat(layerThickness) > 5 || parseFloat(layerThickness) < 0) && <p style={{ color: 'red' }}>Value must be between 0 and 5</p>}

      </div>

      <div className="input-group">
        <label>
          Raster Angle (in degree):</label>
          <input
            type="number"
            min="0"
            max="90"
            step="1"
            value={rasterAngle}
            onChange={(e) => setRasterAngle(e.target.value)}
          />
          {(parseFloat(rasterAngle) > 90 || parseFloat(rasterAngle) <0 ) && <p style={{ color: 'red' }}>Value must be between 0 and 90</p>}
      </div>

      <div className="input-group">
        <label>
          Infill Density (in %):</label>
          <input
            type="number"
            min="0"
            max="100"
            step=".01"
            value={infillDensity}
            onChange={(e) => setInfillDensity(e.target.value)}
          />
          {(parseFloat(infillDensity) > 100 || parseFloat(infillDensity) <0 ) && <p style={{ color: 'red' }}>Value must be between 1 and 100</p>}
      </div>

      <button className={`search-button ${!errorShown ? "active" : ""}`} onClick={handleSearch} disabled={errorShown}>
        Search
      </button>

      <div className="result">
        {loading ? <p>Loading...</p> : (result && <h3>Tensile Strength : {parseFloat(result).toFixed(3)} Mpa</h3>)}
      </div>
      
      {/* {errorShown && <p style={{ color: 'red' }}>An error occurred. Please check your inputs.</p>} */}
      <Toaster />
    </div>
  );
};

export default Frontend;
