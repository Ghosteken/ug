// UploadWaste.jsx
import { useState, useEffect } from 'react';
import { usePoints } from './PointsContext';
import './waste.css';

const wasteTypes = [
  { type: 'Plastic', points: 100, description: 'Plastic bottles, containers, packaging', minWeight: 0.1, maxWeight: 5 },
  { type: 'Paper', points: 50, description: 'Newspapers, cardboard, paper bags', minWeight: 0.5, maxWeight: 10 },
  { type: 'Glass', points: 75, description: 'Glass bottles, jars', minWeight: 0.3, maxWeight: 8 },
  { type: 'Metal', points: 100, description: 'Aluminum cans, steel containers', minWeight: 0.2, maxWeight: 6 },
  { type: 'Organic', points: 50, description: 'Food waste, garden waste', minWeight: 1.0, maxWeight: 15 },
  { type: 'Electronic', points: 150, description: 'Old devices, batteries, cables', minWeight: 0.5, maxWeight: 12 },
  { type: 'Hazardous', points: 200, description: 'Chemicals, paints, solvents', minWeight: 0.2, maxWeight: 4 }
];

export default function UploadWaste() {
  const { addSubmission } = usePoints();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate AI analysis of waste image
  const analyzeWasteImage = () => {
    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Randomly select waste type
      const randomWasteType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      
      // Generate random weight within type's range
      const randomWeight = (
        Math.random() * (randomWasteType.maxWeight - randomWasteType.minWeight) + 
        randomWasteType.minWeight
      ).toFixed(1);
      
      // Generate random quantity (1-5 items)
      const randomQuantity = Math.floor(Math.random() * 5) + 1;
      
      // Calculate points
      const basePoints = randomWasteType.points;
      const weightMultiplier = Math.max(1, Math.floor(randomWeight / randomWasteType.minWeight));
      const totalPoints = basePoints * weightMultiplier * randomQuantity;

      setAnalysisResult({
        type: randomWasteType.type,
        weight: parseFloat(randomWeight),
        quantity: randomQuantity,
        points: totalPoints
      });
      
      setIsAnalyzing(false);
    }, 2000); // 2 second delay to simulate processing
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Start analysis when image is loaded
        analyzeWasteImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !location || !analysisResult) {
      alert('Please fill in all required fields and wait for analysis to complete');
      return;
    }

    const newSubmission = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type: analysisResult.type,
      points: analysisResult.points,
      location,
      imageUrl: imagePreview,
      weight: analysisResult.weight,
      quantity: analysisResult.quantity
    };

    addSubmission(newSubmission);

    // Reset form
    setImage(null);
    setImagePreview(null);
    setLocation('');
    setAnalysisResult(null);
    e.target.reset();
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Waste</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Waste Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Waste preview" />
            </div>
          )}
        </div>

        {isAnalyzing ? (
          <div className="analysis-status">
            <div className="spinner"></div>
            <p>Analyzing waste image...</p>
          </div>
        ) : analysisResult && (
          <div className="analysis-result">
            <h3>Analysis Results</h3>
            <div className="result-item">
              <span>Type:</span> {analysisResult.type}
            </div>
            <div className="result-item">
              <span>Weight:</span> {analysisResult.weight} kg
            </div>
            <div className="result-item">
              <span>Quantity:</span> {analysisResult.quantity} items
            </div>
            <div className="result-item points">
              <span>Points Earned:</span> {analysisResult.points}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter waste location"
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isAnalyzing || !analysisResult}
        >
          {isAnalyzing ? 'Analyzing...' : 'Submit Waste'}
        </button>
      </form>
    </div>
  );
}
