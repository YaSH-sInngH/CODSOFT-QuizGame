// App.js

import React,  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/basic/home';
import MakeQuiz from './components/basic/MakeQuiz';
import Play from './components/basic/Play';
import TestPage from './components/basic/TestPage';
const App = () => {

  const [questions, setQuestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/makequiz" element={<MakeQuiz setQuestions={setQuestions}/>} />
        <Route path="/play" element={<Play />} />
        <Route path="/" element={<Home />} />
        <Route path="/testpage" element={<TestPage questions={questions}/>} />
      </Routes>
    </Router>
  );
};

export default App;
