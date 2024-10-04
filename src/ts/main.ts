const userCard = document.getElementById('user') as HTMLElement
const countNum = document.querySelectorAll('.counting-num') as NodeListOf<HTMLSpanElement>;
const counterSpeed = 150; // Adjusted speed control
const process = document.getElementById('process') as HTMLElement;
const loadLine = document.querySelectorAll('.load-line');

// Function to format the number with a period as a thousands separator
const formatNumber = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Function to start counting animation
const startCounting = (item: HTMLSpanElement) => {
	const value = +item.getAttribute('num')!;
	const data = parseInt(item.textContent!.replace(/\./g, ''), 10) || 0; // Use textContent
	const increment = Math.ceil(value / counterSpeed); // Calculate incremental steps

	let currentValue = data;
	const animate = () => {
		if (currentValue < value) {
			currentValue = Math.min(currentValue + increment, value);
			item.textContent = formatNumber(currentValue); // Use textContent
			requestAnimationFrame(animate); // Smooth animation control
		} else {
			item.textContent = formatNumber(value); // Ensure final value is displayed correctly
		}
	};

	animate(); // Start the animation
};

const onScroll = () => {
	const scrollPosition: number = window.innerHeight - 400; // 400px offset

	countNum.forEach(item => {
		const blockPosition: number = item.getBoundingClientRect().top;
		if (blockPosition < scrollPosition) {
			startCounting(item);
		}
	});

	if (process) {
		const blockPosition: number = process.getBoundingClientRect().top;
		if (blockPosition < scrollPosition) {
			loadLine.forEach(item => {
				item.classList.add('active');
			});
			countNum.forEach(item => {
				startCounting(item);
			});
		}
	}
};

// Add scroll event listener
window.addEventListener('scroll', onScroll);












// TypeScript code
const typingElements = userCard.querySelectorAll('.typing') as NodeListOf<HTMLElement>;

function isElementInViewport(el: HTMLElement): boolean {
	const rect = el.getBoundingClientRect();
	const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	return (
		rect.top <= windowHeight * 0.5 &&
		rect.bottom >= windowHeight * 0.5
	);
}

function typeText(element: HTMLElement, text: string, delay: number) {
	let index = 0;
	element.textContent = ''; // Clear the text

	const interval = setInterval(() => {
		if (index < text.length) {
			element.textContent += text.charAt(index);
			index++;
		} else {
			clearInterval(interval);
		}
	}, delay);
}

function startTyping() {

	if (userCard && isElementInViewport(userCard)) {
		// Elementlarni DOMdan olish
		const counters: NodeListOf<HTMLElement> = document.querySelectorAll('.counter');

		// Har bir counter uchun funksiyani boshlash
		counters.forEach((counter: HTMLElement) => {
			const updateCounter = (): void => {
				// Atributdan olingan qiymatni raqamga o'girish
				const target: number = parseFloat(counter.getAttribute('data-target')!.replace('+', ''));
				const count: number = parseFloat(counter.innerText);

				// O'sish miqdorini hisoblash
				const increment: number = target / 800;

				// Maqsadga yetguncha raqamni oshirish
				if (count < target) {
					counter.innerText = (count + increment).toFixed(3); // Kasr sonni 3 xonali qilish
					setTimeout(updateCounter, 1); // 1 ms kutish
				} else {
					counter.innerText = target.toFixed(3); // Maqsad raqamni to'g'ri formatlash
				}
			};

			// Funksiyani ishga tushirish
			updateCounter();
		});

		typingElements.forEach((element, index) => {
			const text = element.getAttribute('data-text');
			if (text) {
				setTimeout(() => {
					typeText(element, text, 100); // Adjust delay as needed
				}, index * 2500); // Delay between texts
			}
		});
		// Remove the scroll event listener after typing to prevent it from triggering again
		window.removeEventListener('scroll', startTyping);
	}
}

// Add scroll and load event listeners
window.addEventListener('scroll', startTyping);
window.addEventListener('load', startTyping); // Initial check on page load

const closeAll = document.querySelectorAll('.close-all') as NodeListOf<HTMLElement>
const sidebarBtn = document.querySelector('.sidebar-btn') as HTMLButtonElement
const closeBg = document.querySelector('.close-bg') as HTMLElement
const sidebar = document.querySelector('.sidebar') as HTMLElement
const body = document.querySelector('body') as HTMLBodyElement

sidebarBtn?.addEventListener('click', () => {
	body.style.overflow = 'hidden'
	closeBg.classList.add('active')
	sidebar.classList.add('show')
})

closeAll?.forEach(item => {
	item.addEventListener('click', () => {
		closeBg.classList.remove('active')
		sidebar.classList.remove('show')
		body.style.overflow = 'auto'
	})
})