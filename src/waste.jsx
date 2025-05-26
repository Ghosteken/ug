// UploadWaste.jsx
import { useState } from 'react';
import { usePoints } from './PointsContext';
import './waste.css';

const wasteTypes = [
  { type: 'Plastic', points: 100, description: 'Plastic bottles, containers, packaging' },
  { type: 'Paper', points: 50, description: 'Newspapers, cardboard, paper bags' },
  { type: 'Glass', points: 75, description: 'Glass bottles, jars' },
  { type: 'Metal', points: 100, description: 'Aluminum cans, steel containers' },
  { type: 'Organic', points: 50, description: 'Food waste, garden waste' },
  { type: 'Electronic', points: 150, description: 'Old devices, batteries, cables' },
  { type: 'Hazardous', points: 200, description: 'Chemicals, paints, solvents' }
];

export default function UploadWaste() {
  const { addSubmission } = usePoints();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !selectedType || !location) {
      alert('Please fill in all fields');
      return;
    }

    const wasteType = wasteTypes.find(w => w.type === selectedType);
    const newSubmission = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type: wasteType.type,
      points: wasteType.points,
      location,
      imageUrl: imagePreview,
    };

    addSubmission(newSubmission);

    // Reset form
    setImage(null);
    setImagePreview(null);
    setLocation('');
    setSelectedType('');
    e.target.reset();
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Waste</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Waste Type</label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="">Select waste type</option>
            {wasteTypes.map(waste => (
              <option key={waste.type} value={waste.type}>
                {waste.type} ({waste.points} points) - {waste.description}
              </option>
            ))}
          </select>
        </div>

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

        <button type="submit" className="submit-btn">Submit Waste</button>
      </form>
    </div>
  );
}
