// Dashboard.jsx
import { useState } from 'react';
import PointsDisplay from './PointsDisplay';
import SubmissionHistory from './SubmissionHistory';
import Waste from './waste';
import './dashboard.css';

export default function Dashboard() {
  const [userPoints, setUserPoints] = useState(1250);
  const [submissions, setSubmissions] = useState([
    { id: 1, date: '2023-05-15', type: 'Recyclable', points: 100 },
    { id: 2, date: '2023-05-10', type: 'Organic', points: 50 },
    { id: 3, date: '2023-05-05', type: 'Hazardous', points: 150 },
  ]);

  const addSubmission = (submission) => {
    setSubmissions(prev => [submission, ...prev]);
    setUserPoints(prev => prev + submission.points);
  };

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>

      <PointsDisplay points={userPoints} />

      <Waste onNewSubmission={addSubmission} />

      <div className="dashboard-section">
        <h2>Recent Submissions</h2>
        <SubmissionHistory submissions={submissions} />
      </div>

      <button className="redeem-btn">Redeem Rewards</button>
    </div>
  );
}
