// UploadWaste.jsx
import { useState } from 'react';
import { usePoints } from './PointsContext';
import './waste.css';

const wasteTypes = [
  { type: 'Plastic', points: 100, description: 'Plastic bottles, containers, packaging', minWeight: 0.1 },
  { type: 'Paper', points: 50, description: 'Newspapers, cardboard, paper bags', minWeight: 0.5 },
  { type: 'Glass', points: 75, description: 'Glass bottles, jars', minWeight: 0.3 },
  { type: 'Metal', points: 100, description: 'Aluminum cans, steel containers', minWeight: 0.2 },
  { type: 'Organic', points: 50, description: 'Food waste, garden waste', minWeight: 1.0 },
  { type: 'Electronic', points: 150, description: 'Old devices, batteries, cables', minWeight: 0.5 },
  { type: 'Hazardous', points: 200, description: 'Chemicals, paints, solvents', minWeight: 0.2 }
];

export default function UploadWaste() {
  const { addSubmission } = usePoints();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

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

  const calculatePoints = (wasteType, weight, quantity) => {
    const basePoints = wasteType.points;
    const weightMultiplier = Math.max(1, Math.floor(weight / wasteType.minWeight));
    return basePoints * weightMultiplier * quantity;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !selectedType || !location || !weight) {
      alert('Please fill in all required fields');
      return;
    }

    const wasteType = wasteTypes.find(w => w.type === selectedType);
    const calculatedPoints = calculatePoints(wasteType, parseFloat(weight), quantity);

    const newSubmission = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type: wasteType.type,
      points: calculatedPoints,
      location,
      imageUrl: imagePreview,
      weight: parseFloat(weight),
      quantity,
      description: description.trim() || 'No description provided',
    };

    addSubmission(newSubmission);

    // Reset form
    setImage(null);
    setImagePreview(null);
    setLocation('');
    setSelectedType('');
    setWeight('');
    setQuantity(1);
    setDescription('');
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
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kilograms"
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            placeholder="Number of items"
            required
          />
        </div>

        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details about the waste"
            rows="3"
          />
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

        {selectedType && weight && quantity && (
          <div className="points-preview">
            <p>Estimated Points: {calculatePoints(
              wasteTypes.find(w => w.type === selectedType),
              parseFloat(weight) || 0,
              quantity
            )}</p>
          </div>
        )}

        <button type="submit" className="submit-btn">Submit Waste</button>
      </form>
    </div>
  );
}
