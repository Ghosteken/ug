import React, { createContext, useState, useContext, useEffect } from 'react';

const PointsContext = createContext();

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

const POINTS_KEY = 'wasteManagement_points';
const SUBMISSIONS_KEY = 'wasteManagement_submissions';

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem(POINTS_KEY);
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [submissions, setSubmissions] = useState(() => {
    const savedSubmissions = localStorage.getItem(SUBMISSIONS_KEY);
    return savedSubmissions ? JSON.parse(savedSubmissions) : [];
  });

  useEffect(() => {
    localStorage.setItem(POINTS_KEY, points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission) => {
    setSubmissions(prev => [submission, ...prev]);
    setPoints(prev => prev + submission.points);
  };

  const value = {
    points,
    submissions,
    addSubmission,
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
}; 