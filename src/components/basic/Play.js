// play.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import fetchQuizData from './quizapi';
import './play.css';

const Play = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        setQuizData(data);
      } catch (error) {
        console.error('Error loading quiz data:', error);
        // Handle error loading quiz data
      }
    };

    loadQuizData();
  }, []);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizData[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedCategory(null);
  };

  const handleCategoryClick = async (category) => {
    // Load quiz data for the selected category
    try {
      const data = await fetchQuizData();
      const filteredQuestions = data.filter((question) => question.category === category);
      const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

      setQuizData(shuffledQuestions);
      setCurrentQuestion(0);
      setShowScore(false);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error loading quiz data:', error);
      // Handle error loading quiz data
    }
  };

  return (
    <>
      <Navbar />
      <div className="play-body">
        <div className="category-buttons">
          {!selectedCategory && (
            < div className='catgCat'>
              <button onClick={() => handleCategoryClick('Easy')} className='easyCat'>Easy</button>
              <button onClick={() => handleCategoryClick('Medium')} className='medCat'>Medium</button>
              <button onClick={() => handleCategoryClick('Hard')} className='hardCat'>Hard</button>
            </div>
          )}
        </div>
        {selectedCategory && (
          <div className="container-quiz">
            {showScore ? (
              <div>
                <h2>Your Score: {score} out of {quizData.length}</h2>
                <button onClick={resetQuiz}>Play Again</button>
                <Link to='/' className='link-home'>Go to Home</Link>
              </div>
            ) : (
              <div>
                <h2>Question {currentQuestion + 1}</h2>
                <p>{quizData[currentQuestion]?.question}</p>
                <ul>
                  {quizData[currentQuestion]?.options.map((option, index) => (
                    <li key={index} onClick={() => handleAnswerClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      
      </div>
    </>
  );
};

export default Play;
