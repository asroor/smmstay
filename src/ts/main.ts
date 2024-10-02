const loadLine = document.querySelectorAll('.load-line') as NodeListOf<HTMLDivElement>;
const process = document.getElementById('process') as HTMLElement
window.addEventListener('scroll', () => {
	if (process) {
		const blockPosition: number = process.getBoundingClientRect().top;
		const scrollPosition: number = window.innerHeight - 400; // 400px masofa
		if (blockPosition < scrollPosition) {
			loadLine.forEach(item => {
				item.classList.add('active');
			});
		}
	}
});

let i: number = 0
const typingTxt = document.querySelectorAll('.typing') as NodeListOf<HTMLElement>

function typeWriter() {
	if (i < typingTxt.length) {

	}
}

typeWriter()