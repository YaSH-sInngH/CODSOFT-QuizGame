import React, { useState } from 'react';
import TestPage from './TestPage';
import Navbar from './Navbar';
import './style.css';

const MakeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
  });

  const addQuestion = () => {
    // Check if the question is not empty before adding it
    if (currentQuestion.question.trim() !== '') {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
      });
    }
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.map((option, i) => (i === index ? value : option)),
    });
  };

  const handleCorrectOptionChange = (index) => {
    setCurrentQuestion({ ...currentQuestion, correctOption: index });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Make a Quiz</h2>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={currentQuestion.question}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, question: e.target.value })
            }
          />
        </div>
        <div className="optionSection">
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <label>Correct Option</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <input
                type="radio"
                checked={currentQuestion.correctOption === index}
                onChange={() => handleCorrectOptionChange(index)}
              />
            </div>
          ))}
        </div>
        <button onClick={addQuestion}>Add Question</button>
        <div className="line"></div>
        {/* Display added questions with numbers */}

        {/* Pass questions array to TestPage component */}
        <TestPage questions={questions} setQuestions={setQuestions} />
      </div>
    </div>
  );
};

export default MakeQuiz;
