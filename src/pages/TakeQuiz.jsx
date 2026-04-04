import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, 
  FaArrowLeft, FaFlag, FaPause, FaPlay, FaSave 
} from 'react-icons/fa';
import { getQuizById, submitQuizAttempt } from '../services/quizService';
import './TakeQuiz.css';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (quiz && timeLeft > 0 && timerActive) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz, timeLeft, timerActive]);

  const fetchQuiz = async () => {
    try {
      const res = await getQuizById(id);
      setQuiz(res.data);
      setTimeLeft(res.data.timeLimit * 60); // Convert minutes to seconds
      setAnswers(new Array(res.data.questions.length).fill(null));
    } catch (err) {
      setError('Failed to load quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleFlagQuestion = (questionIndex) => {
    if (flaggedQuestions.includes(questionIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter(q => q !== questionIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionIndex]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleAutoSubmit = () => {
    const unansweredCount = answers.filter(a => a === null).length;
    if (unansweredCount > 0) {
      if (window.confirm(`You have ${unansweredCount} unanswered questions. Submit anyway?`)) {
        submitQuiz();
      } else {
        setTimerActive(true);
      }
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = answers.map((answer, idx) => ({
        questionId: quiz.questions[idx]._id,
        selectedAnswer: answer,
      }));
      
      const timeTaken = (quiz.timeLimit * 60) - timeLeft;
      
      const res = await submitQuizAttempt(id, {
        answers: formattedAnswers,
        timeTaken,
      });
      
      navigate(`/quiz/results/${id}`, { 
        state: { 
          result: res.data,
          quizTitle: quiz.title,
          questions: quiz.questions,
          userAnswers: answers
        } 
      });
    } catch (err) {
      alert('Failed to submit quiz. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    const unanswered = answers.filter(a => a === null).length;
    if (unanswered > 0) {
      setShowConfirm(true);
    } else {
      submitQuiz();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getProgressPercentage = () => {
    const answered = answers.filter(a => a !== null).length;
    return (answered / quiz.questions.length) * 100;
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  if (loading) {
    return (
      <div className="takequiz-loading">
        <div className="loading-spinner"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="takequiz-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => navigate('/quiz')} className="back-btn">Back to Quizzes</button>
      </div>
    );
  }

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestion];
  const answeredCount = answers.filter(a => a !== null).length;
  const isAnswered = answers[currentQuestion] !== null;

  return (
    <div className="takequiz-page">
      <div className="quiz-header">
        <div className="quiz-info">
          <h1>{quiz.title}</h1>
          <p className="quiz-subject">{quiz.subject}</p>
        </div>
        <div className="quiz-meta">
          <div className={`timer ${timeLeft < 60 ? 'urgent' : ''}`}>
            <FaClock />
            <span>{formatTime(timeLeft)}</span>
            <button onClick={toggleTimer} className="timer-toggle">
              {timerActive ? <FaPause /> : <FaPlay />}
            </button>
          </div>
          <div className="progress-info">
            <span>{answeredCount}/{quiz.questions.length} Answered</span>
          </div>
        </div>
      </div>

      <div className="quiz-progress-bar">
        <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
      </div>

      <div className="quiz-main">
        <div className="question-sidebar">
          <h3>Questions</h3>
          <div className="question-grid">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                className={`question-nav-btn 
                  ${currentQuestion === idx ? 'active' : ''} 
                  ${answers[idx] !== null ? 'answered' : ''}
                  ${flaggedQuestions.includes(idx) ? 'flagged' : ''}
                `}
                onClick={() => handleJumpToQuestion(idx)}
              >
                {idx + 1}
                {flaggedQuestions.includes(idx) && <FaFlag className="flag-icon" />}
              </button>
            ))}
          </div>
        </div>

        <div className="question-container">
          <div className="question-header">
            <div className="question-number">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <button 
              className={`flag-btn ${flaggedQuestions.includes(currentQuestion) ? 'flagged' : ''}`}
              onClick={() => handleFlagQuestion(currentQuestion)}
            >
              <FaFlag /> {flaggedQuestions.includes(currentQuestion) ? 'Flagged' : 'Flag for review'}
            </button>
          </div>

          <div className="question-text">
            <h2>{currentQ.text}</h2>
          </div>

          <div className="options-list">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${answers[currentQuestion] === idx ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQuestion, idx)}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                <span className="option-text">{option}</span>
                {answers[currentQuestion] === idx && <FaCheckCircle className="check-icon" />}
              </button>
            ))}
          </div>

          <div className="question-navigation">
            <button 
              className="nav-btn prev" 
              onClick={handlePrev} 
              disabled={currentQuestion === 0}
            >
              <FaArrowLeft /> Previous
            </button>
            <button 
              className="nav-btn next" 
              onClick={handleNext}
              disabled={currentQuestion === quiz.questions.length - 1}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="quiz-footer">
        <div className="footer-stats">
          <span>📝 {answeredCount} answered</span>
          <span>🏁 {flaggedQuestions.length} flagged</span>
          <span>⏱️ {formatTime(timeLeft)} remaining</span>
        </div>
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={submitting}
        >
          <FaSave /> {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Submit Quiz?</h3>
            <p>You have {answers.filter(a => a === null).length} unanswered question(s).</p>
            <p>Are you sure you want to submit?</p>
            <div className="modal-actions">
              <button onClick={() => setShowConfirm(false)} className="cancel-btn">Cancel</button>
              <button onClick={submitQuiz} className="confirm-btn">Submit Anyway</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;