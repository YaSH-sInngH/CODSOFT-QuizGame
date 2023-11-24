import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './style.css'; // Import the CSS file

const TestPage = ({ questions,setQuestions }) => {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [correctScore, setCorrectScore] = useState(null);
  const [incorrectScore, setIncorrectScore] = useState(null);

  const submitTest = () => {
    // Calculate scores
    const newCorrectScore = questions.reduce(
      (acc, question, index) => acc + (userAnswers[index] === question.correctOption ? 1 : 0),
      0
    );

    const newIncorrectScore = questions.length - newCorrectScore;

    setCorrectScore(newCorrectScore);
    setIncorrectScore(newIncorrectScore);
  };

  const handleOptionChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const restartTest = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCorrectScore(null);
    setIncorrectScore(null);
  };
  const removeAllQuestions = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCorrectScore(null);
    setIncorrectScore(null);
    // Remove all questions by updating the state to an empty array
    setQuestions([]);
  };

  const downloadQuestionsPDF = () => {
    const doc = new jsPDF();
  
    // Add questions to the PDF, each on a new page
    questions.forEach((question, index) => {
      if (index !== 0) {
        doc.addPage(); // Add a new page for each question after the first one
      }
  
      doc.text(`Q${index + 1}. ${question.question}`, 10, 20);
  
      question.options.forEach((option, optionIndex) => {
        doc.text(
          `${String.fromCharCode(65 + optionIndex)}. ${option}`,
          20,
          40 + optionIndex * 15
        );
      });
    });
  
    // Save the PDF
    doc.save('quiz_questions.pdf');
  };
  
  

  return (
    <div>
      <h2>Take Quiz</h2>
      {questions.map((question, index) => (
        <div key={index} className="options-container">
          <p>{`Q${index + 1}. ${question.question}`}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className='option-box'>
              <label>{option}</label>
              <input
                type="radio"
                checked={userAnswers[index] === optionIndex}
                onChange={() => handleOptionChange(index, optionIndex)}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={submitTest}>Submit</button>
      {correctScore !== null && (
        <p>
          Your score: {correctScore} correct, {incorrectScore} incorrect
        </p>
      )}
      <button onClick={restartTest}>Restart</button>
      <button onClick={removeAllQuestions}>Remove All</button>
      <button onClick={downloadQuestionsPDF}>Download Questions as PDF</button>
      <Link to="/" className='link-t'>Go Home</Link>
    </div>
  );
};

export default TestPage;
