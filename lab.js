var currentQuestion = 0;
var timer;
var timeLeft = 30; // Her soru için 30 saniye
var userAnswers = {}; // Kullanıcı cevaplarını saklamak için obje

function init() {
    // Sayfa yüklendiğinde ilk soruyu göster
    document.getElementById("myH").innerHTML = "Lab 1: Soru 1";
    document.getElementById("question0").innerHTML = data.questions.question1;
    document.getElementById("code").innerHTML = soruyaz(data.questions.code1);
    currentQuestion = 0; // Başlangıçta 1. sorudayız
    
    showQuestion();
    startTimer(); // Zamanlayıcıyı başlat
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimerDisplay();
    timer = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            next();
        }
    }, 1000);
}

function updateTimerDisplay() {
    var timerElement = document.getElementById("timer");
    var progressElement = document.getElementById("progress");
    
    timerElement.textContent = timeLeft;
    progressElement.style.width = (timeLeft / 30 * 100) + "%";
    
    // Son 5 saniyede kırmızı uyarı efekti
    if (timeLeft <= 5) {
        timerElement.style.color = "#ff4444";
        progressElement.style.backgroundColor = "#ff4444";
    } else {
        timerElement.style.color = "white";
        progressElement.style.backgroundColor = "white";
    }
}

function clearComments(x) {
    document.getElementById("comment0").innerHTML = " ";
    document.getElementById("comment1").innerHTML = " ";
}

function parseCFiles(txt) {
  var startQuestion = txt.indexOf("/*");
  var endQuestion   = txt.indexOf("*/",startQuestion);
  var question      = txt.substring(startQuestion,endQuestion+2);
  console.log(question);
}

function myFunction(inputElement) {
    // Cevabı kaydet
    if (!userAnswers[currentQuestion]) {
        userAnswers[currentQuestion] = [];
    }
    var inputIndex = parseInt(inputElement.id.substring(1));
    userAnswers[currentQuestion][inputIndex] = inputElement.value;

    // Cevap kontrolü
    var questionNumber = currentQuestion + 1;
    var test = data.c[questionNumber][inputIndex];
    var tline = document.getElementById("comment" + inputIndex);
    
    if (test.indexOf(inputElement.value) != 0) {
        tline.innerHTML = data.comment[questionNumber][inputIndex][1];
    } else if (test == inputElement.value) {
        tline.innerHTML = data.comment[questionNumber][inputIndex][0];
    }
}

function next() {
    clearInterval(timer);
    // Soru sayısını hesapla
    var totalQuestions = Object.keys(data.questions).filter(key => key.startsWith('question')).length;
    
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
}

function showFinishButton() {
    // "Sonraki Soru" butonunu kaldır
    var nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.style.display = "none"; // "Sonraki Soru" butonunu gizle
    }

    // "Testi Bitir" butonunu oluştur
    var finishButton = document.createElement("button");
    finishButton.innerText = "Testi Bitir";
    finishButton.onclick = function() {
        showResults(); // Testi bitir butonuna tıklandığında sonuçları göster
    };
    finishButton.style.marginTop = "20px"; // Butona üstten boşluk ekle

    document.body.appendChild(finishButton); // Butonu sayfaya ekle
}

function previous() {
    clearInterval(timer);
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        startTimer();
    }
}

function showQuestion() {
    var x = document.getElementById("myH");
    var y = document.getElementById("question0");
    var questionNumber = currentQuestion + 1;
    var previousButton = document.querySelector('button[onclick="previous()"]');
    var nextButton = document.getElementById("nextButton");

    x.innerHTML = "Lab 1: Soru " + questionNumber;
    y.innerHTML = data.questions["question" + questionNumber];
    document.getElementById("code").innerHTML = soruyaz(data.questions["code" + questionNumber]);

    // Önceki cevapları yükle
    if (userAnswers[currentQuestion]) {
        var inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach((input, index) => {
            if (userAnswers[currentQuestion][index] !== undefined) {
                input.value = userAnswers[currentQuestion][index];
                // Cevap kontrolünü tetikle
                var event = new Event('input');
                input.dispatchEvent(event);
            }
        });
    }

    // İlk soruda önceki butonunu gizle
    if (currentQuestion === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    // Son soruda "Sonraki Soru" butonunu "Testi Bitir" olarak değiştir
    var totalQuestions = Object.keys(data.questions).filter(key => key.startsWith('question')).length;
    if (currentQuestion === totalQuestions - 1) {
        nextButton.textContent = "Testi Bitir";
    } else {
        nextButton.textContent = "Sonraki Soru";
    }
}

function showResults() {
    clearInterval(timer);
    var correctAnswers = 0;
    var totalQuestions = Object.keys(data.questions).filter(key => key.startsWith('question')).length;
    var resultsHTML = '<div class="results-container">';
    
    // Sonuç başlığı
    resultsHTML += '<h2 class="results-title">Test Sonuçları</h2>';
    
    // Her soru için sonuçları kontrol et
    for (var i = 0; i < totalQuestions; i++) {
        var userAnswer = userAnswers[i] ? userAnswers[i][0] : '';
        var correctAnswer = data.c[i + 1][0];
        var isCorrect = userAnswer === correctAnswer;
        
        if (isCorrect) {
            correctAnswers++;
            resultsHTML += `
                <div class="result-item correct">
                    <div class="result-header">
                        <span class="question-number">Soru ${i + 1}</span>
                        <span class="result-status">Doğru</span>
                    </div>
                    <div class="result-details">
                        <p class="question-text">${data.questions["question" + (i + 1)]}</p>
                        <p>Verdiğiniz cevap: <strong>${userAnswer}</strong></p>
                        <p class="correct-message">${data.comment[i + 1][0][0]}</p>
                    </div>
                </div>
            `;
        } else {
            resultsHTML += `
                <div class="result-item incorrect">
                    <div class="result-header">
                        <span class="question-number">Soru ${i + 1}</span>
                        <span class="result-status">Yanlış</span>
                    </div>
                    <div class="result-details">
                        <p class="question-text">${data.questions["question" + (i + 1)]}</p>
                        <p>Verdiğiniz cevap: <strong>${userAnswer}</strong></p>
                        <p>Doğru cevap: <strong>${correctAnswer}</strong></p>
                        <p class="explanation">${data.comment[i + 1][0][1]}</p>
                    </div>
                </div>
            `;
        }
    }
    
    // Genel sonuç özeti
    resultsHTML += `
        <div class="results-summary">
            <h3>Genel Sonuç</h3>
            <div class="summary-grid">
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
                <div class="summary-item">
                    <span class="summary-label">Başarı Oranı</span>
                    <span class="summary-value percentage">%${Math.round((correctAnswers / totalQuestions) * 100)}</span>
                </div>
            </div>
        </div>
    `;
    
    resultsHTML += '</div>';
    
    // Mevcut içeriği temizle ve sonuçları göster
    document.querySelector('.question-container').innerHTML = resultsHTML;
}

function soruyaz(soru) {
    var i = 0;
    return soru.replace(/(TAG[0-9]+)/g, function(number) {
        var tagin = '<input id="f' + i + '" type="text" value="" size="' + number.slice(3) + '" oninput="myFunction(this)">';
        i += 1;
        clearComments(i.toString());
        return tagin;
    });
}



