'use client';

import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import './Navbar.css'
export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h2>Talent<span>Flow</span></h2>
        </div>

        <nav className="nav-links">
          <Link href="#features">Features</Link>
          <Link href="#about">About</Link>
          <Link href="#careers">Careers</Link>
        </nav>

        <div className="nav-buttons">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="btn-outline">Sign In</button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="btn-primary">Get Started</button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}