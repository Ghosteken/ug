import './SubmissionHistory.css';

export default function SubmissionHistory({ submissions }) {
  return (
    <div className="history-container">
      <h3>Your Submissions</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.date}</td>
              <td>{submission.type}</td>
              <td className="points">+{submission.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}