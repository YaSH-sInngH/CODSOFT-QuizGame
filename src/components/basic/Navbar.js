// Navbar.js
import "./style.css";
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        QUIZZERS
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/makequiz">MakeQuiz</Link>
        </li>
        <li>
          <Link to="/play">Play</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
