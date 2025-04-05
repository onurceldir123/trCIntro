import { startQuizTimer, clearTimer, getTotalTimeMinutes } from './timer.js';
import { loadQuestionData, getCurrentQuestionNumber, getTotalQuestions, nextQuestion, previousQuestion, isLastQuestion, myFunction } from './questionManager.js';
import { showResults } from './results.js';

// Global fonksiyonları window objesine ekle
window.startQuizTimer = startQuizTimer;
window.clearTimer = clearTimer;
window.getTotalTimeMinutes = getTotalTimeMinutes;
window.loadQuestionData = loadQuestionData;
window.getCurrentQuestionNumber = getCurrentQuestionNumber;
window.getTotalQuestions = getTotalQuestions;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.isLastQuestion = isLastQuestion;
window.myFunction = myFunction;
window.showResults = showResults;

// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');

const totalQuestionsInfo = document.getElementById('total-questions-info');
const totalTimeInfo = document.getElementById('total-time-info');
const questionCounterElement = document.getElementById('question-counter');

// --- State ---
let currentScreen = 'start'; // 'start', 'quiz', 'results'

// --- Functions ---

function switchScreen(screenName) {
    // Tüm ekranları gizle
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');

    // İstenen ekranı göster
    let targetScreen;
    switch (screenName) {
        case 'quiz':
            targetScreen = quizScreen;
            break;
        case 'results':
            targetScreen = resultsScreen;
            break;
        case 'start':
        default:
            targetScreen = startScreen;
            break;
    }
    targetScreen.classList.add('active');
    currentScreen = screenName;
}

function updateQuestionCounter() {
    if (questionCounterElement) {
        const current = getCurrentQuestionNumber(); // 1-based
        const total = getTotalQuestions();
        questionCounterElement.textContent = `Soru ${current} / ${total}`;
    }
}

function startQuiz() {
    loadQuestionData(); // İlk soruyu yükle (questionManager'da güncellenecek)
    updateQuestionCounter();
    switchScreen('quiz');
    startQuizTimer();
    updateNavButtons();
}

function handleNextClick() {
    if (isLastQuestion()) {
        finishQuiz();
    } else {
        nextQuestion(); // Sadece soruyu değiştirir
        updateQuestionCounter();
        updateNavButtons();
    }
}

function handlePrevClick() {
    previousQuestion(); // Sadece soruyu değiştirir
    updateQuestionCounter();
    updateNavButtons();
}

function updateNavButtons() {
    if (!prevButton || !nextButton) return;

    const current = getCurrentQuestionNumber();
    const total = getTotalQuestions();

    prevButton.style.display = (current === 1) ? 'none' : 'inline-block';
    nextButton.textContent = (current === total) ? 'Testi Bitir' : 'Sonraki Soru';
}

function finishQuiz() {
    clearTimer();
    showResults(resultsScreen); // Sonuçları #results-screen içine yazdır
    switchScreen('results');
}

function initializeApp() {
    // Başlangıç ekranı bilgilerini doldur
    if (totalQuestionsInfo) {
        totalQuestionsInfo.textContent = getTotalQuestions();
    }
    if (totalTimeInfo) {
        totalTimeInfo.textContent = `${getTotalTimeMinutes()} Dakika`;
    }

    // Olay dinleyicilerini ekle
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }
    if (nextButton) {
        nextButton.addEventListener('click', handleNextClick);
    }
    if (prevButton) {
        prevButton.addEventListener('click', handlePrevClick);
    }

    // Zamanlayıcı olayını dinle
    window.addEventListener('timeUp', finishQuiz);

    // Başlangıç ekranını göster
    switchScreen('start');
}

// --- Initialize --- 
document.addEventListener('DOMContentLoaded', initializeApp); 