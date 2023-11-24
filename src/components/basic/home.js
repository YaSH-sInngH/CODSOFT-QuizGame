// Home.js
import "./style.css"
import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import './home.css';
import Footer from './footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1> Quizzers </h1>
        <p> Welcome to our interactive quiz platform, where the thrill of both creating and challenging quizzes awaits you! Unleash your creativity as you craft personalized quizzes on a myriad of topics – from your favorite hobbies to the latest trends. Share your quizzes with friends, family, or the wider community and see who can conquer the questions you've carefully curated. Dive into the world of knowledge, fun, and friendly competition.</p>
        <div className="button-container">
          <div className="button-sec">
            <Link to="/MakeQuiz">
              <button>Make a Quiz</button>
            </Link>

            <Link to="/play">
              <button>Take a Quiz</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
