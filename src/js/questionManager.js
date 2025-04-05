import { data } from '../data/questions.js';

let currentQuestionIndex = 0; // 0-based index
export const userAnswers = {};
const totalQuestions = Object.keys(data.questions).filter(key => key.startsWith('question')).length;

// DOM Elementlerini Önbelleğe Al (Yeni ID'ler ve yapı)
// const questionTitleElement = document.getElementById("question-title");
const questionTextElement = document.getElementById("question-text");
const codeElement = document.getElementById("code");
const commentFeedbackElement = document.getElementById("comment-feedback"); // Yorumlar için tek konteyner
// Buton referansları main.js'de

function updateElementHTML(element, html) {
    if (element) {
        element.innerHTML = html;
    } else {
        // console.error("Element not found for updating HTML"); // Daha sessiz olabiliriz
    }
}

// Sadece mevcut soruyu ekrana yükler
function displayCurrentQuestion() {
    if (!questionTextElement || !codeElement || !commentFeedbackElement) {
        console.error("Soru görüntüleme için gerekli elementler bulunamadı!");
        return;
    }
    
    // Yorumları temizle (varsa)
    updateElementHTML(commentFeedbackElement, ""); 

    const questionNumber = currentQuestionIndex + 1; // 1-based for data access
    const questionKey = "question" + questionNumber;
    const codeKey = "code" + questionNumber;

    // Soru başlığını güncelleme kaldırıldı
    updateElementHTML(questionTextElement, data.questions[questionKey] || "");
    updateElementHTML(codeElement, soruyaz(data.questions[codeKey], questionNumber));

    // Cevapları yükle
    const currentAnswers = userAnswers[currentQuestionIndex];
    if (currentAnswers && codeElement) {
        const inputs = codeElement.querySelectorAll('input[type="text"]');
        inputs.forEach((input, index) => {
            input.value = currentAnswers[index] !== undefined ? currentAnswers[index] : '';
        });
    }
}

// Uygulama başladığında çağrılır (main.js tarafından)
export function loadQuestionData() {
    currentQuestionIndex = 0;
    // userAnswers'ı temizle? (Opsiyonel, test tekrar başlarsa)
    // Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
    displayCurrentQuestion();
}

// Sonraki soruya geçer ve gösterir
export function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

// Önceki soruya geçer ve gösterir
export function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

// Cevap kaydetme (değişiklik yok)
export function myFunction(inputElement) {
    const inputIndex = parseInt(inputElement.id.substring(1));
    if (!userAnswers[currentQuestionIndex]) {
        userAnswers[currentQuestionIndex] = [];
    }
    userAnswers[currentQuestionIndex][inputIndex] = inputElement.value;
}

// Helper Fonksiyonlar (main.js için)
export function getCurrentQuestionNumber() {
    return currentQuestionIndex + 1; // 1-based
}

export function getTotalQuestions() {
    return totalQuestions;
}

export function isLastQuestion() {
    return currentQuestionIndex === totalQuestions - 1;
}

// soruyaz fonksiyonu (değişiklik yok, önceki hali iyiydi)
function soruyaz(soru = "", questionNumber) { 
    if (!soru) return "";
    let i = 0;
    return soru.replace(/(TAG[0-9]+)/g, () => {
        let inputSize = 10;
        try {
            const correctAnswer = data.c[questionNumber]?.[i];
            if (correctAnswer) {
                inputSize = Math.max(5, correctAnswer.length + 2);
            }
        } catch (e) {
            console.error(`Answer calculation error for question ${questionNumber}, input index ${i}:`, e);
        }
        
        const inputId = `f${i}`;
        const tagin = `<input id="${inputId}" type="text" value="" size="${inputSize}" oninput="myFunction(this)">`;
        i += 1;
        return tagin;
    });
} 