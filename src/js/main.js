"use strict";
const loadLine = document.querySelectorAll('.load-line');
const process = document.getElementById('process');
window.addEventListener('scroll', () => {
    if (process) {
        const blockPosition = process.getBoundingClientRect().top;
        const scrollPosition = window.innerHeight - 400; // 400px masofa
        if (blockPosition < scrollPosition) {
            loadLine.forEach(item => {
                item.classList.add('active');
            });
        }
    }
});
const typingTxt = document.querySelectorAll('.typing');
let speed = 50;
function typeWriter(item, text, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            item.innerHTML += text.charAt(i); // Har bir harfni qo'shib borish
            i++;
            setTimeout(typing, speed); // Har bir harfni yozish uchun qayta chaqiriladi
        }
        else {
            callback(); // Yozib tugagandan so'ng, callbackni chaqiramiz
        }
    }
    typing(); // Matn yozishni boshlash
}
function startTyping() {
    const items = Array.from(typingTxt); // NodeListni arrayga o'giramiz
    let currentItemIndex = 0;
    function processNextItem() {
        if (currentItemIndex < items.length) {
            const currentItem = items[currentItemIndex];
            const text = currentItem.getAttribute('data-text') || ''; // Matnni 'data-text' orqali olamiz
            typeWriter(currentItem, text, () => {
                currentItemIndex++;
                processNextItem(); // Navbatdagi elementni yozish
            });
        }
    }
    // Har bir elementning oldindan berilgan matnini o'chirish
    items.forEach(item => {
        item.setAttribute('data-text', item.innerHTML); // Asl matnni 'data-text' sifatida saqlab qo'yamiz
        item.innerHTML = ''; // Matnni tozalaymiz
    });
    processNextItem(); // Typing jarayonini boshlash
}
startTyping();
