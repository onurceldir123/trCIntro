import { data } from '../data/questions.js';
import { userAnswers } from './questionManager.js';

// --- YENİ FONKSİYON --- 
// Cevap stringindeki tüm boşlukları kaldırır
function normalizeAnswer(answer) {
    if (typeof answer !== 'string') {
        return ''; // String değilse boş döndür
    }
    return answer.replace(/\s+/g, ''); // Tüm boşluk karakterlerini kaldırır
}
// --- YENİ FONKSİYON SONU ---

// SVG donut grafiği oluşturma fonksiyonu
function createDonutChart(percentage) {
    const size = 120; // SVG boyutu
    const strokeWidth = 15; // Halka kalınlığı
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return `
        <div class="chart-container">
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="donut-chart">
                <circle class="donut-background"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    stroke-width="${strokeWidth}"
                />
                <circle class="donut-progress"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    r="${radius}"
                    stroke-width="${strokeWidth}"
                    stroke-dasharray="${circumference}"
                    stroke-dashoffset="${offset}"
                />
                <text x="50%" y="50%" class="donut-text" dominant-baseline="middle" text-anchor="middle">
                    %${Math.round(percentage)}
                </text>
            </svg>
        </div>
    `;
}

// showResults artık hedef DOM elementini parametre olarak alıyor
export function showResults(targetElement) {
    if (!targetElement) {
        console.error("Sonuçların gösterileceği hedef element bulunamadı!");
        return;
    }
    
    let correctAnswers = 0;
    const totalQuestions = Object.keys(data.questions).filter(key => key.startsWith('question')).length;
    let resultsContentHTML = ''; // Sonuç ekranının içeriği
    let summaryHTML = '';
    let detailsHTML = '';

    // Detayları hesapla ve detailsHTML'i doldur (PDF'te görünmese de hesaplama gerekli)
    for (let i = 0; i < totalQuestions; i++) {
        const questionNumber = i + 1; // 1-based index for accessing data
        
        // --- Cevap Alma Güncellemesi --- 
        // Önce o soru için cevap dizisi var mı kontrol et
        const answersForQuestion = userAnswers[i]; 
        // Varsa ve dizi ise ilk elemanı al, yoksa boş string veya '(Cevaplanmadı)'
        const userAnswerOriginal = Array.isArray(answersForQuestion) && answersForQuestion.length > 0 
                                   ? (answersForQuestion[0] || '') // İlk eleman boşsa boş string
                                   : '(Cevaplanmadı)'; 
        // --- Güncelleme Sonu ---
        
        const correctAnswer = data.c[questionNumber]?.[0] || '';
        
        const normalizedUserAnswer = normalizeAnswer(userAnswerOriginal);
        const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);
        // '(Cevaplanmadı)' durumunu yanlış kabul et
        const isCorrect = userAnswerOriginal !== '(Cevaplanmadı)' && 
                          totalQuestions > 0 && 
                          normalizedUserAnswer === normalizedCorrectAnswer; 

        if (isCorrect) {
            correctAnswers++;
            detailsHTML += `
                <div class="result-item correct">
                    <div class="result-header">
                        <span class="question-number">Soru ${questionNumber}</span>
                        <span class="result-status">Doğru</span>
                    </div>
                    <div class="result-details">
                        <p class="question-text">${data.questions["question" + questionNumber]}</p>
                        <p>Verdiğiniz cevap: <strong>${userAnswerOriginal}</strong></p>
                        <p class="correct-message">${data.comment[questionNumber][0][0]}</p>
                    </div>
                </div>
            `;
        } else {
            detailsHTML += `
                <div class="result-item incorrect">
                    <div class="result-header">
                        <span class="question-number">Soru ${questionNumber}</span>
                        <span class="result-status">Yanlış</span>
                    </div>
                    <div class="result-details">
                        <p class="question-text">${data.questions["question" + questionNumber]}</p>
                        <p>Verdiğiniz cevap: <strong>${userAnswerOriginal}</strong></p>
                        <p>Doğru cevap: <strong>${correctAnswer}</strong></p>
                        <p class="explanation">${data.comment[questionNumber][0][1]}</p>
                    </div>
                </div>
            `;
        }
    }

    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    summaryHTML = `
        <div class="results-summary">
            <h3>Genel Sonuç</h3>
            <div class="summary-content">
                ${createDonutChart(percentage)} 
                <div class="summary-details">
                    <div class="summary-item">
                        <span class="summary-label">Toplam Soru</span>
                        <span class="summary-value">${totalQuestions}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Doğru Cevap</span>
                        <span class="summary-value correct">${correctAnswers}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Yanlış Cevap</span>
                        <span class="summary-value incorrect">${totalQuestions - correctAnswers}</span>
                    </div>
                 </div>
            </div>
        </div>
    `;

    // Tüm Sonuç Ekranı İçeriğini Oluştur
    resultsContentHTML = `
        <div class="content-box">
            <h2 class="results-title">Test Sonuçları</h2>
            <div class="button-group print-button-container results-top-button">
                 <button class="save-pdf-button btn btn-secondary" onclick="window.print()">Sonuçları PDF Olarak Kaydet</button>
            </div>
            ${summaryHTML}
            <div class="result-details-container"> ${detailsHTML} </div>
        </div>
    `;
    
    // Hedef elementin içeriğini güncelle
    targetElement.innerHTML = resultsContentHTML;
} 