const userCard = document.getElementById('user') as HTMLElement;
const countNum = document.querySelectorAll('.counting-num') as NodeListOf<HTMLSpanElement>;
const counterSpeed = 150; // Скорость анимации подсчета
const process = document.getElementById('process') as HTMLElement;
const loadLine = document.querySelectorAll('.load-line');

// Функция форматирования числа с точкой в качестве разделителя тысяч
const formatNumber = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Функция запуска анимации подсчета
const startCounting = (item: HTMLSpanElement) => {
	const value = +item.getAttribute('num')!; // Получаем целевое значение из атрибута
	const data = parseInt(item.textContent!.replace(/\./g, ''), 10) || 0; // Текущее значение из текстового содержимого элемента
	const increment = Math.ceil(value / counterSpeed); // Рассчитываем шаг увеличения

	let currentValue = data;
	const animate = () => {
		if (currentValue < value) {
			currentValue = Math.min(currentValue + increment, value); // Увеличиваем текущее значение до целевого
			item.textContent = formatNumber(currentValue); // Форматируем и обновляем текст элемента
			requestAnimationFrame(animate); // Плавное обновление анимации
		} else {
			item.textContent = formatNumber(value); // Убедиться, что финальное значение отображается правильно
		}
	};

	animate(); // Запускаем анимацию
};

// Функция, срабатывающая при прокрутке страницы
const onScroll = () => {
	const scrollPosition: number = window.innerHeight - 400; // Смещение на 400px от нижней границы окна

	countNum.forEach(item => {
		const blockPosition: number = item.getBoundingClientRect().top;
		if (blockPosition < scrollPosition) {
			startCounting(item); // Запуск анимации для каждого элемента, когда он попадает в зону видимости
		}
	});

	if (process) {
		const blockPosition: number = process.getBoundingClientRect().top;
		if (blockPosition < scrollPosition) {
			loadLine.forEach(item => {
				item.classList.add('active'); // Добавляем класс активности для линий загрузки
			});
			countNum.forEach(item => {
				startCounting(item); // Запуск анимации счетчика
			});
		}
	}
};

// Добавление слушателя события прокрутки
window.addEventListener('scroll', onScroll);


// Код TypeScript для анимации печати текста
const typingElements = userCard.querySelectorAll('.typing') as NodeListOf<HTMLElement>;

// Функция проверки, находится ли элемент в зоне видимости
function isElementInViewport(el: HTMLElement): boolean {
	const rect = el.getBoundingClientRect();
	const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	return (
		rect.top <= windowHeight * 0.5 &&
		rect.bottom >= windowHeight * 0.5
	);
}

// Функция для анимации печати текста с задержкой
function typeText(element: HTMLElement, text: string, delay: number) {
	let index = 0;
	element.textContent = ''; // Очищаем текст

	const interval = setInterval(() => {
		if (index < text.length) {
			element.textContent += text.charAt(index); // Добавляем букву к тексту
			index++;
		} else {
			clearInterval(interval); // Останавливаем анимацию, когда весь текст напечатан
		}
	}, delay);
}

// Функция для запуска анимации печати текста
function startTyping() {
	if (userCard && isElementInViewport(userCard)) {
		// Получаем элементы счетчиков из DOM
		const counters: NodeListOf<HTMLElement> = document.querySelectorAll('.counter');

		// Для каждого счетчика запускаем обновление
		counters.forEach((counter: HTMLElement) => {
			const updateCounter = (): void => {
				// Преобразуем значение из атрибута в число
				const target: number = parseFloat(counter.getAttribute('data-target')!.replace('+', ''));
				const count: number = parseFloat(counter.innerText);

				// Рассчитываем шаг увеличения
				const increment: number = target / 800;

				// Увеличиваем значение до целевого
				if (count < target) {
					counter.innerText = (count + increment).toFixed(3); // Округляем до трех знаков после запятой
					setTimeout(updateCounter, 1); // Повторяем через 1 мс
				} else {
					counter.innerText = target.toFixed(3); // Окончательное значение
				}
			};

			// Запускаем обновление счетчика
			updateCounter();
		});

		// Запуск анимации печати текста для каждого элемента
		typingElements.forEach((element, index) => {
			const text = element.getAttribute('data-text');
			if (text) {
				setTimeout(() => {
					typeText(element, text, 100); // Настроить задержку при необходимости
				}, index * 2500); // Задержка между текстами
			}
		});

		// Удаляем слушатель события прокрутки после выполнения анимации
		window.removeEventListener('scroll', startTyping);
	}
}

// Добавление слушателей событий прокрутки и загрузки страницы
window.addEventListener('scroll', startTyping);
window.addEventListener('load', startTyping); // Проверка при загрузке страницы

// Логика работы боковой панели
const closeAll = document.querySelectorAll('.close-all') as NodeListOf<HTMLElement>;
const sidebarBtn = document.querySelector('.sidebar-btn') as HTMLButtonElement;
const closeBg = document.querySelector('.close-bg') as HTMLElement;
const sidebar = document.querySelector('.sidebar') as HTMLElement;
const body = document.querySelector('body') as HTMLBodyElement;

// Событие для кнопки открытия боковой панели
sidebarBtn?.addEventListener('click', () => {
	body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
	closeBg.classList.add('active'); // Добавляем фоновый активный класс
	sidebar.classList.add('show'); // Показываем боковую панель
});

// Событие для закрытия боковой панели
closeAll?.forEach(item => {
	item.addEventListener('click', () => {
		closeBg.classList.remove('active'); // Убираем активный фон
		sidebar.classList.remove('show'); // Скрываем боковую панель
		body.style.overflow = 'auto'; // Восстанавливаем прокрутку страницы
	});
});
