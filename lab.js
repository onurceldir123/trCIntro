var timer; // Zamanlayıcı değişkeni
var timeLeft = 600; // 10 dakika (600 saniye)
var currentQuestionIndex = 1; // Mevcut soru indeksini takip etmek için

function init() {
    // Sayfa yüklendiğinde ilk soruyu göster
    document.getElementById("myH").innerHTML = "Lab 1: Soru 1";
    document.getElementById("question0").innerHTML = data.questions.question1;
    document.getElementById("code").innerHTML = soruyaz(data.questions.code1);
    currentQuestionIndex = 1; // Başlangıçta 1. sorudayız
    
    startTimer(); // Zamanlayıcıyı başlat
}

function startTimer() {
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Süre doldu!"); // Süre dolduğunda uyarı göster
            showResults(); // Sonuçları göster
        } else {
            timeLeft--;
            document.getElementById("timer").innerHTML = formatTime(timeLeft); // Zamanlayıcıyı güncelle
        }
    }, 1000); // Her saniyede bir güncelle
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + " dakika " + (remainingSeconds < 10 ? "0" : "") + remainingSeconds + " saniye"; // Zaman formatını ayarla
}

function clearComments(x) {
document.getElementById("comment0").innderHTML=" ";
document.getElementById("comment1").innderHTML=" ";
}

function parseCFiles(txt) {
  var startQuestion = txt.indexOf("/*");
  var endQuestion   = txt.indexOf("*/",startQuestion);
  var question      = txt.substring(startQuestion,endQuestion+2);
  console.log(question);
}
function myFunction(fnum) {
  console.log("myfunc");
  console.log(fnum.id);
  var txt =document.getElementById("myH").innerHTML;
  var x = txt.replace(/.* ([0-9]+)$/, '$1');
  console.log(txt);
  console.log(x);
  var test = data.c[parseInt(x)][parseInt(fnum.id.substring(1))];
  var t = document.getElementById(fnum.id).value;
  var tline = document.getElementById("comment"+(fnum.id.substring(1)));
  if (test.indexOf(t)!=0) {
  tline.innerHTML = data.comment[parseInt(x)][parseInt(fnum.id.substring(1))][1];
  } else if (test==t) {
  tline.innerHTML =data.comment[parseInt(x)][parseInt(fnum.id.substring(1))][0];
  }
}

function next() {
    if (currentQuestionIndex < 4) { // Toplam 4 soru var
        currentQuestionIndex++;
        updateQuestion();
    } else {
        // 4. soruya gelindiğinde "Testi Bitir" butonunu göster
        showFinishButton();
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
    if (currentQuestionIndex > 1) { // 1. sorudan önceye gidemez
        currentQuestionIndex--;
        updateQuestion();
        
        // Eğer 3. soruya geri dönersek "Testi Bitir" butonunu gizle
        var finishButton = document.querySelector("button:contains('Testi Bitir')");
        if (finishButton) {
            finishButton.style.display = "none"; // "Testi Bitir" butonunu gizle
        }
    }
}

function updateQuestion() {
    var x = document.getElementById("myH");
    var y = document.getElementById("question0");

    x.innerHTML = "Lab 1: Soru " + currentQuestionIndex;
    y.innerHTML = data.questions["question" + currentQuestionIndex];
    document.getElementById("code").innerHTML = soruyaz(data.questions["code" + currentQuestionIndex]);
}

function showResults() {
    clearInterval(timer); // Zamanlayıcıyı durdur
    var correctAnswers = 0;
    var totalQuestions = 4; // Toplam soru sayısı
    var results = ""; // Sonuçları tutacak değişken

    for (var i = 0; i < totalQuestions; i++) {
        var userAnswer = document.getElementById("f" + i).value;
        var correctAnswer = data.c[i + 1][0]; // Doğru cevapları kontrol et
        if (userAnswer === correctAnswer) {
            correctAnswers++;
            results += "Soru " + (i + 1) + ": Doğru\n"; // Doğru cevap
        } else {
            results += "Soru " + (i + 1) + ": Yanlış (Doğru Cevap: " + correctAnswer + ")\n"; // Yanlış cevap
        }
    }

    // Sonuçları göster
    var resultMessage = "Sonuçlar:\n" +
                        "Doğru Cevaplar: " + correctAnswers + "\n" +
                        "Yanlış Cevaplar: " + (totalQuestions - correctAnswers) + "\n\n" +
                        results;

    // Sonuçları bir alert yerine ekranda göstermek için
    var resultDiv = document.createElement("div");
    resultDiv.style.backgroundColor = "#fff";
    resultDiv.style.border = "1px solid #ddd";
    resultDiv.style.borderRadius = "5px";
    resultDiv.style.padding = "20px";
    resultDiv.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    resultDiv.style.marginTop = "20px";
    resultDiv.innerText = resultMessage;

    document.body.appendChild(resultDiv); // Sonuçları sayfaya ekle

    // Testi bitir
    var endMessage = document.createElement("div");
    endMessage.style.fontSize = "20px";
    endMessage.style.marginTop = "20px";
    endMessage.innerText = "Test tamamlandı!";
    document.body.appendChild(endMessage);
}

function soruyaz(soru){
    var i=0;
    return soru.replace(/(TAG[0-9]+)/g,function(number) {
    console.log(number);
    var tagin ='<input id="f'+i+'", type="text", value="", size="'+number.slice(3)+'" oninput="myFunction(f'+i+')">';
    
    console.log(tagin);
    console.log(i);
    i+=1;
    clearComments(i.toString());
       return tagin;});
  }



