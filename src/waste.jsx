// UploadWaste.jsx
import { useState } from 'react';
import './waste.css';

const wasteTypes = [
  { type: 'Recyclable', points: 100 },
  { type: 'Organic', points: 50 },
  { type: 'Hazardous', points: 150 },
];

export default function UploadWaste({ onNewSubmission }) {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');

  const getRandomWasteType = () => {
    const randomIndex = Math.floor(Math.random() * wasteTypes.length);
    return wasteTypes[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image');
      return;
    }

    const { type, points } = getRandomWasteType();
    const newSubmission = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type,
      points,
      location,
      image, // You might want to handle image upload separately
    };

    onNewSubmission(newSubmission);

    // Reset form
    setImage(null);
    setLocation('');
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
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Waste</button>
      </form>
    </div>
  );
}
