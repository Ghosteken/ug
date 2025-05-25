import './PointsDisplay.css';

export default function PointsDisplay({ points }) {
  return (
    <div className="points-container">
      <h2>Your Points</h2>
      <div className="points-value">{points}</div>
      <p>Redeem your points for rewards</p>
    </div>
  );
}