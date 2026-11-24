import Link from 'next/link';
import './jj.css';
import Navbar from '@/compand/Navbar';

export default function HomePage() {
  return (
    <div className="page-container">

      <section className="hero">
        
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Modern HR & Workforce Management <span>Made Simple</span>
            </h1>
            <p>
              An all-in-one platform to track attendance, manage leave requests, 
              automate payroll, and streamline hiring in a secure workspace.
            </p>
            <div className="hero-buttons">
              <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
              <Link href="/Career" className="btn-outline">Explore Jobs</Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="dashboard-preview">
              <h3>Smart HR Overview</h3>
              <div className="stat-box">
                <p>Employees Present Today</p>
                <h2>42 / 45</h2>
              </div>
              <div className="stat-box">
                <p>Pending Leave Requests</p>
                <h2>3 Requests</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}