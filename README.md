# trCIntro - C Programlama Test Uygulaması (Geliştirici Notları)

Bu depo, ES6 Modülleri kullanılarak Vanilla JavaScript ile oluşturulmuş interaktif bir C programlama testi uygulamasının kaynak kodunu içerir.

## Gereksinimler

Projeyi yerel olarak çalıştırmak için aşağıdaki yöntemlerden birine ihtiyacınız vardır:

*   **Python 3:** Dahili HTTP sunucusunu kullanmak için.
*   **Node.js ve npm/yarn (Opsiyonel):** Eğer VS Code dışı bir geliştirme sunucusu veya Live Server gibi bir araç kullanmak isterseniz.
*   **Visual Studio Code:** Live Server eklentisi ile kolayca çalıştırmak için.

## Proje Yapısı

```
/trCIntro
|-- src/
|   |-- css/
|   |   |-- styles.css         # Ana stil dosyası
|   |-- data/
|   |   |-- questions.js       # Sorular, cevaplar ve açıklamalar (ES6 Modülü)
|   |-- js/
|   |   |-- main.js            # Uygulama giriş noktası, olay yönetimi, ekran geçişleri
|   |   |-- questionManager.js # Soru yükleme, gezinme, cevap kaydetme mantığı
|   |   |-- results.js         # Sonuç hesaplama ve gösterme mantığı
|   |   |-- timer.js           # Test zamanlayıcı mantığı
|-- index.html                 # Ana HTML dosyası
|-- README.md                  # Bu dosya
```

## Yerel Ortamda Çalıştırma

Proje ES6 modüllerini kullandığından, tarayıcı güvenlik kısıtlamaları nedeniyle doğrudan `file://` protokolü üzerinden çalıştırılamaz. Yerel bir HTTP sunucusu gereklidir.

**Yöntem 1: Visual Studio Code + Live Server (Önerilen)**

1.  VS Code içerisinde "Extensions" (Eklentiler) sekmesinden "Live Server" eklentisini kurun.
2.  Proje klasörünü VS Code ile açın (`trCIntro` ana klasörünü).
3.  Sol taraftaki Dosya Gezgini'nde `index.html` dosyasına sağ tıklayın ve "Open with Live Server" seçeneğini seçin.
4.  Uygulama varsayılan tarayıcınızda otomatik olarak açılacaktır.

**Yöntem 2: Python Basit HTTP Sunucusu**

1.  Terminalinizi veya komut istemcinizi açın.
2.  Projenin ana dizinine gidin:
    ```bash
    cd path/to/trCIntro 
    ```
    *(Not: `path/to/trCIntro` kısmını projenizin bilgisayarınızdaki gerçek yolu ile değiştirin)*
3.  Aşağıdaki komutu çalıştırarak Python'un dahili sunucusunu başlatın:
    ```bash
    python3 -m http.server
    ```
    *(Varsayılan port 8000'dir. Farklı bir port kullanmak için `python3 -m http.server <PORT_NUMARASI>` şeklinde çalıştırabilirsiniz, örneğin `python3 -m http.server 8080`)*
4.  Web tarayıcınızı açın ve adres çubuğuna `http://localhost:8000` (veya farklı bir port belirlediyseniz o port numarasını) yazın.

## Katkıda Bulunanlar

*   Erdem Alkım
*   Onur Mert Çeldir