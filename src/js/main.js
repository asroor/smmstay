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
let i = 0;
const typingTxt = document.querySelectorAll('.typing');
function typeWriter() {
    if (i < typingTxt.length) {
    }
}
typeWriter();
