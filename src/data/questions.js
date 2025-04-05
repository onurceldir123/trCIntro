export const data = {
    questions: {
        question1: "Aşağıdaki C programında eksik olan kodu tamamlayınız. Program, kullanıcıdan alınan iki sayının toplamını hesaplamalıdır.",
        code1: `#include <stdio.h>

int main() {
    int sayi1, sayi2, toplam;
    
    printf("İlk sayıyı girin: ");
    scanf("%d", &sayi1);
    
    printf("İkinci sayıyı girin: ");
    scanf("%d", &sayi2);
    
    toplam = TAG1;
    
    printf("Toplam: %d\\n", toplam);
    
    return 0;
}`,
        question2: "Aşağıdaki C programında eksik olan kodu tamamlayınız. Program, kullanıcıdan alınan sayının faktöriyelini hesaplamalıdır.",
        code2: `#include <stdio.h>

int main() {
    int sayi, faktoriyel = 1;
    
    printf("Bir sayı girin: ");
    scanf("%d", &sayi);
    
    for(int i = 1; i <= sayi; i++) {
        faktoriyel = TAG1;
    }
    
    printf("%d! = %d\\n", sayi, faktoriyel);
    
    return 0;
}`,
        question3: "Aşağıdaki C programında eksik olan kodu tamamlayınız. Program, kullanıcıdan alınan sayının asal olup olmadığını kontrol etmelidir.",
        code3: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int sayi;
    bool asal = true;
    
    printf("Bir sayı girin: ");
    scanf("%d", &sayi);
    
    for(int i = 2; i <= sayi/2; i++) {
        if(sayi % i == 0) {
            asal = TAG1;
            break;
        }
    }
    
    if(asal && sayi > 1)
        printf("%d bir asal sayıdır.\\n", sayi);
    else
        printf("%d bir asal sayı değildir.\\n", sayi);
    
    return 0;
}`,
        question4: "Aşağıdaki C programında eksik olan kodu tamamlayınız. Program, kullanıcıdan alınan iki sayının en büyük ortak bölenini (EBOB) hesaplamalıdır.",
        code4: `#include <stdio.h>

int main() {
    int sayi1, sayi2, ebob;
    
    printf("İlk sayıyı girin: ");
    scanf("%d", &sayi1);
    
    printf("İkinci sayıyı girin: ");
    scanf("%d", &sayi2);
    
    for(int i = 1; i <= sayi1 && i <= sayi2; i++) {
        if(sayi1 % i == 0 && sayi2 % i == 0)
            ebob = TAG1;
    }
    
    printf("EBOB(%d, %d) = %d\\n", sayi1, sayi2, ebob);
    
    return 0;
}`,
        question5: "Aşağıdaki C programında eksik olan kodu tamamlayınız. Program, kullanıcıdan alınan bir dizinin elemanlarının toplamını hesaplamalıdır.",
        code5: `#include <stdio.h>

int main() {
    int dizi[5], toplam = 0;
    
    printf("5 sayı girin:\\n");
    for(int i = 0; i < 5; i++) {
        scanf("%d", &dizi[i]);
        toplam = TAG1;
    }
    
    printf("Dizi elemanlarının toplamı: %d\\n", toplam);
    
    return 0;
}`
    },
    c: {
        1: ["sayi1 + sayi2"],
        2: ["faktoriyel * i"],
        3: ["false"],
        4: ["i"],
        5: ["toplam + dizi[i]"]
    },
    comment: {
        1: [["Doğru! İki sayının toplamını hesaplamak için + operatörü kullanılır."], 
            ["Yanlış! İki sayının toplamını hesaplamak için + operatörü kullanmalısınız."]],
        2: [["Doğru! Faktöriyel hesaplamak için çarpma işlemi kullanılır."], 
            ["Yanlış! Faktöriyel hesaplamak için çarpma işlemi kullanmalısınız."]],
        3: [["Doğru! Sayı bölünebiliyorsa asal değildir."], 
            ["Yanlış! Sayı bölünebiliyorsa asal değildir, bu durumda asal değişkeni false olmalıdır."]],
        4: [["Doğru! EBOB, iki sayıyı da bölen en büyük sayıdır."], 
            ["Yanlış! EBOB, iki sayıyı da bölen en büyük sayıdır. Bu durumda i değerini kullanmalısınız."]],
        5: [["Doğru! Dizi elemanlarının toplamını hesaplamak için her elemanı toplama eklemelisiniz."], 
            ["Yanlış! Dizi elemanlarının toplamını hesaplamak için her elemanı toplama eklemelisiniz."]]
    }
}; 