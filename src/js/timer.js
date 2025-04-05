// timer.js Güncellemesi
// import { showResults } from './results.js'; // Artık burada gerek yok, main.js çağırıyor

let timer;
const totalTimeSeconds = 600; // Sabit değer
let timeLeft = totalTimeSeconds;

// DOM elementlerini önbelleğe al
const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");

export function startQuizTimer() {
    clearInterval(timer);
    timeLeft = totalTimeSeconds;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            // Süre dolduğunda testi bitirme işlemi main.js'de handle edilebilir
            // Veya burada bir event yayınlanabilir
            // Şimdilik alert ve doğrudan showResults yerine timer'ı temizleyelim
            clearInterval(timer);
            alert("Süreniz doldu! Sonuçlar hesaplanıyor...");
            // finishQuiz() fonksiyonunu çağırmak için main.js'e bilgi vermek lazım
            // Basitlik adına window eventi kullanalım (daha iyi yöntemler mevcut)
            window.dispatchEvent(new CustomEvent('timeUp'));
        }
    }, 1000);
}

export function updateTimerDisplay() {
    // Elementlerin varlığını kontrol et
    if (!timerElement || !progressElement) {
        // console.error("Timer veya progress elementi bulunamadı!"); // Sessiz olabilir
        return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    progressElement.style.width = (timeLeft / totalTimeSeconds * 100) + "%";
    
    const isLowTime = timeLeft <= 60;
    const color = isLowTime ? "var(--incorrect-color)" : "var(--primary-color)"; // CSS değişkeni kullan
    const progressColor = isLowTime ? "var(--incorrect-color)" : "var(--secondary-color)";
    
    // Stilleri doğrudan değiştirmek yerine class ekleyip/kaldırmak daha iyi olabilir
    timerElement.style.color = color;
    progressElement.style.backgroundColor = progressColor;
}

export function clearTimer() {
    clearInterval(timer);
}

// Başlangıç ekranı için toplam süreyi dakika olarak döndürür
export function getTotalTimeMinutes() {
    return Math.floor(totalTimeSeconds / 60);
} 