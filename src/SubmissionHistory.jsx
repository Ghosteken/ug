import React, { useState } from 'react';
import './SubmissionHistory.css';

export default function SubmissionHistory({ submissions }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filterSubmissions = (submissions) => {
    if (filter === 'all') return submissions;
    return submissions.filter(sub => sub.type === filter);
  };

  const sortSubmissions = (submissions) => {
    return [...submissions].sort((a, b) => {
      let compareA = a[sortBy];
      let compareB = b[sortBy];
      
      if (sortBy === 'date') {
        compareA = new Date(compareA);
        compareB = new Date(compareB);
      }

      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });
  };

  const uniqueTypes = [...new Set(submissions.map(sub => sub.type))];
  const processedSubmissions = sortSubmissions(filterSubmissions(submissions));

  const totalPoints = submissions.reduce((sum, sub) => sum + sub.points, 0);
  const totalWeight = submissions.reduce((sum, sub) => sum + sub.weight, 0);

  return (
    <div className="submission-history">
      <div className="submission-stats">
        <div className="stat-item">
          <h3>Total Points</h3>
          <p>{totalPoints}</p>
        </div>
        <div className="stat-item">
          <h3>Total Weight</h3>
          <p>{totalWeight.toFixed(1)} kg</p>
        </div>
        <div className="stat-item">
          <h3>Submissions</h3>
          <p>{submissions.length}</p>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Type:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="points">Points</option>
            <option value="weight">Weight</option>
            <option value="type">Type</option>
          </select>
          <button 
            className="sort-order"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="submissions-grid">
        {processedSubmissions.map(submission => (
          <div key={submission.id} className="submission-card">
            <div className="submission-image">
              <img src={submission.imageUrl} alt={`${submission.type} waste`} />
            </div>
            <div className="submission-details">
              <h4>{submission.type}</h4>
              <p className="submission-date">{new Date(submission.date).toLocaleDateString()}</p>
              <p className="submission-points">Points: {submission.points}</p>
              <p className="submission-weight">Weight: {submission.weight}kg</p>
              <p className="submission-quantity">Quantity: {submission.quantity}</p>
              <p className="submission-location">📍 {submission.location}</p>
              {submission.description && (
                <p className="submission-description">{submission.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {processedSubmissions.length === 0 && (
        <div className="no-submissions">
          <p>No submissions found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}