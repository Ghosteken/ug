import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add any initialization logic here
  }, []);

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Turn Trash Into Rewards</h1>
        <p>
          Join our sustainable revolution by uploading your sorted waste. 
          Earn valuable points and redeem them for exciting rewards while 
          helping the environment.
        </p>
        <button 
          className="cta-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </section>
      
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Upload Waste</h3>
            <p>
              Simply take a photo of your properly sorted waste using our 
              intuitive mobile interface. Our system makes submission effortless.
            </p>
          </div>
          <div className="step">
            <h3>2. Get Validated</h3>
            <p>
              Our advanced AI technology instantly verifies your submission 
              for accuracy and completeness, ensuring fair reward allocation.
            </p>
          </div>
          <div className="step">
            <h3>3. Earn Rewards</h3>
            <p>
              Accumulate points for each valid submission and redeem them 
              for cash, vouchers, or special eco-friendly products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}