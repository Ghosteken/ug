// Dashboard.jsx
import { usePoints } from './PointsContext';
import PointsDisplay from './PointsDisplay';
import SubmissionHistory from './SubmissionHistory';
import Waste from './waste';
import './dashboard.css';

export default function Dashboard() {
  const { points, submissions } = usePoints();

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>

      <PointsDisplay points={points} />

      <Waste />

      <div className="dashboard-section">
        <h2>Recent Submissions</h2>
        <SubmissionHistory submissions={submissions} />
      </div>

      <button className="redeem-btn">Redeem Rewards</button>
    </div>
  );
}
