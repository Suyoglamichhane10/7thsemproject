import { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, FaArrowLeft, FaStar, FaTrophy, FaRedo } from 'react-icons/fa';
import { getSubjects } from '../services/subjectService';
import { submitQuizScore } from '../services/progressService';
import './Quiz.css';

function Quiz() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timerActive && timeLeft === 0) {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [timerActive, timeLeft]);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const generateQuestions = () => {
    // Mock questions - in real app, these would come from backend
    const mockQuestions = {
      mathematics: [
        { id: 1, text: "What is the derivative of x²?", options: ["x", "2x", "x²", "2"], correct: 1 },
        { id: 2, text: "What is 5 + 7?", options: ["10", "11", "12", "13"], correct: 2 },
        { id: 3, text: "What is the square root of 16?", options: ["2", "4", "6", "8"], correct: 1 },
        { id: 4, text: "What is 15% of 200?", options: ["15", "20", "25", "30"], correct: 3 },
        { id: 5, text: "Solve: 3x + 5 = 20", options: ["3", "5", "7", "9"], correct: 1 },
      ],
      physics: [
        { id: 1, text: "What is Newton's first law about?", options: ["Force", "Inertia", "Acceleration", "Energy"], correct: 1 },
        { id: 2, text: "What is the unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
        { id: 3, text: "What is the speed of light?", options: ["3×10⁶ m/s", "3×10⁷ m/s", "3×10⁸ m/s", "3×10⁹ m/s"], correct: 2 },
      ],
      chemistry: [
        { id: 1, text: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
        { id: 2, text: "What is H₂O?", options: ["Oxygen", "Hydrogen", "Water", "Peroxide"], correct: 2 },
      ],
      default: [
        { id: 1, text: "Sample Question 1?", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0 },
        { id: 2, text: "Sample Question 2?", options: ["Option A", "Option B", "Option C", "Option D"], correct: 1 },
      ]
    };

    let subjectQuestions = mockQuestions[selectedSubject.toLowerCase()] || mockQuestions.default;
    let generated = [...subjectQuestions];
    
    // Adjust number of questions
    while (generated.length < questionCount) {
      generated = [...generated, ...subjectQuestions];
    }
    generated = generated.slice(0, questionCount);
    
    // Add difficulty variations
    generated = generated.map(q => ({
      ...q,
      difficulty: difficulty,
      timeLimit: difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30
    }));
    
    setQuestions(generated);
    setTimeLeft(generated.length * (difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30));
  };

  const startQuiz = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      generateQuestions();
      setQuizStarted(true);
      setTimerActive(true);
      setLoading(false);
    }, 500);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuizComplete = () => {
    setTimerActive(false);
    
    let correctCount = 0;
    const detailedResults = questions.map((q, idx) => {
      const userAnswer = selectedAnswers[q.id];
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correctCount++;
      return {
        question: q.text,
        userAnswer: userAnswer !== undefined ? q.options[userAnswer] : 'Not answered',
        correctAnswer: q.options[q.correct],
        isCorrect,
        explanation: q.explanation || 'No explanation available'
      };
    });
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setResults(detailedResults);
    setQuizCompleted(true);
    
    // Submit score to backend
    submitQuizScore({
      subject: selectedSubject,
      score: finalScore,
      totalQuestions: questions.length,
      correctAnswers: correctCount
    }).catch(err => console.error('Error submitting score:', err));
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSelectedSubject('');
    setDifficulty('medium');
    setQuestionCount(10);
    setScore(0);
    setResults([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Preparing your quiz...</p>
      </div>
    );
  }

  if (!quizStarted && !quizCompleted) {
    return (
      <div className="quiz-page">
        <div className="quiz-setup">
          <h1>📝 Take a Quiz</h1>
          <p>Test your knowledge and track your progress</p>

          <div className="setup-form">
            <div className="form-group">
              <label>Select Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="">Choose a subject</option>
                {subjects.map(sub => (
                  <option key={sub._id} value={sub.name}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty Level</label>
              <div className="difficulty-options">
                <button className={`difficulty-btn easy ${difficulty === 'easy' ? 'active' : ''}`} onClick={() => setDifficulty('easy')}>
                  🟢 Easy
                </button>
                <button className={`difficulty-btn medium ${difficulty === 'medium' ? 'active' : ''}`} onClick={() => setDifficulty('medium')}>
                  🟡 Medium
                </button>
                <button className={`difficulty-btn hard ${difficulty === 'hard' ? 'active' : ''}`} onClick={() => setDifficulty('hard')}>
                  🔴 Hard
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Number of Questions</label>
              <input type="range" min="5" max="20" step="5" value={questionCount} onChange={(e) => setQuestionCount(parseInt(e.target.value))} />
              <div className="range-values">
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
              <p className="question-count">{questionCount} questions</p>
            </div>

            <button className="start-quiz-btn" onClick={startQuiz}>
              Start Quiz <FaArrowRight />
            </button>
          </div>

          <div className="quiz-tips">
            <h3>📌 Quiz Tips</h3>
            <ul>
              <li>Read each question carefully</li>
              <li>You can skip and come back to questions</li>
              <li>Timer starts when you begin</li>
              <li>Review your answers before submitting</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-page">
        <div className="quiz-results">
          <div className="results-header">
            <FaTrophy className="trophy-icon" />
            <h1>Quiz Completed!</h1>
            <p>Here's how you performed</p>
          </div>

          <div className="score-card">
            <div className="score-circle">
              <span className="score-value">{score}%</span>
            </div>
            <div className="score-details">
              <div className="detail">
                <FaCheckCircle className="correct-icon" />
                <span>{results.filter(r => r.isCorrect).length} Correct</span>
              </div>
              <div className="detail">
                <FaTimesCircle className="incorrect-icon" />
                <span>{results.filter(r => !r.isCorrect).length} Incorrect</span>
              </div>
            </div>
          </div>

          <div className="results-breakdown">
            <h2>Detailed Results</h2>
            {results.map((result, idx) => (
              <div key={idx} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-question">
                  <span className="question-number">{idx + 1}.</span>
                  <span className="question-text">{result.question}</span>
                </div>
                <div className="result-answers">
                  <p><strong>Your answer:</strong> <span className={result.isCorrect ? 'correct-text' : 'incorrect-text'}>{result.userAnswer}</span></p>
                  <p><strong>Correct answer:</strong> <span className="correct-text">{result.correctAnswer}</span></p>
                  {result.explanation && <p className="explanation">{result.explanation}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button className="retake-btn" onClick={resetQuiz}>
              <FaRedo /> Take Another Quiz
            </button>
            <button className="review-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-info">
            <span className="subject-badge">{selectedSubject}</span>
            <span className={`difficulty-badge ${difficulty}`}>{difficulty}</span>
          </div>
          <div className="quiz-timer">
            <FaClock />
            <span className={timeLeft < 60 ? 'urgent' : ''}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="quiz-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
          <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
        </div>

        <div className="question-container">
          <h2 className="question-text">{currentQ?.text}</h2>
          <div className="options-grid">
            {currentQ?.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${selectedAnswers[currentQ.id] === idx ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQ.id, idx)}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                <span className="option-text">{option}</span>
                {selectedAnswers[currentQ.id] === idx && <FaCheckCircle className="check-icon" />}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button className="nav-btn prev" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
            <FaArrowLeft /> Previous
          </button>
          <button className="nav-btn next" onClick={handleNextQuestion}>
            {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'} <FaArrowRight />
          </button>
        </div>

        <div className="quiz-stats">
          <div className="stat">
            <span>Answered: {Object.keys(selectedAnswers).length}/{questions.length}</span>
          </div>
          <div className="stat">
            <span>Remaining: {questions.length - Object.keys(selectedAnswers).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;