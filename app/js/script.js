// к классу .custom-scroll подключаем SimpleScroll
Array.from(document.querySelectorAll(`.custom-scroll`)).map(elem => new SimpleBar(elem), { autoHide: false });

// слайдер который проходит через всю страницу
// каждый слайд main__slider-a имеет dataset с его заголовком
// этот заголовок будет является елементом навигации
const bulletsArray = Array.from(document.querySelectorAll(`.main__slider-item`)).map(elem => elem.dataset.slideName);
const swiperMain = new Swiper(`.main__slider`, {
	direction: `vertical`,
	slidesPerView: 1,
	allowTouchMove: false,
	simulateTouch: true,
	mousewheel: true,
	slideClass: `main__slider-item`,
	slideActiveClass: `main__slider-item--active`,
	wrapperClass: `main__slider-wrapper`,
	keyboard: true,
	pagination: {
		bulletClass: `main__slider-bullet`,
		bulletActiveClass: `main__slider-bullet--active`,
		el: `.main__slider-paggination`,
		type: `bullets`,
		clickable: true,
		renderBullet: function (index, className) {
			return `<div class='main__slider-bullet'>${bulletsArray[index]}</div>`;
		},
	},
	navigation: {
		nextEl: `.main__next-slide`,
		prevEl: `.main__prev-slide`,
	},
});

// слайдер преимуществ
const swiperAdvantage = new Swiper(`.advantage__slider`, {
	loop: false,
	slidesPerView: 1,
	slideClass: `advantage__slider-item`,
	slideActiveClass: `advantage__slider-item--active`,
	wrapperClass: `advantage__slider-wrapper`,
	keyboard: true,
	simulateTouch: false,
	navigation: {
		nextEl: `.advantage__next-slide`,
		prevEl: `.advantage__prev-slide`,
	},
});

// функция отображения характеристики дрона(при нажатии на серый овал)
function showCharacteristic(item) {
	// определяем линия характеристики, которая идет от точки к описанию
	const line = item.target.parentNode.parentNode.children[0];
	// определяем ее длину
	const lineLength = line.width.animVal[`value`];
	// описание характеристики
	const description = item.target.parentNode.parentNode.parentNode.children[0];
	// проверка активна ли характеристика(если еще не отображается)
	const checked = item.target.checked;

	// если checked, то отображаем характеристику дрона
	// line.style.strokeDashoffset - плавная отрисовка линии 
	if (checked) {
		line.style.strokeDashoffset = lineLength;
		description.style.opacity = 1;
		line.style.animation = `ani .5s linear forwards`;
	} else {
		line.style.strokeDashoffset = lineLength;
		description.style.opacity = 0;
		line.style.animation = `ani-reverse .5s linear forwards`;
	}
}

// отображение характеристики дрона, если нажатие по серому овалу
document.querySelectorAll(`.characteristic-block__label > input`).forEach(elem => {
	elem.addEventListener(`click`, item => {
		showCharacteristic(item);
	}, { passive: true });
});

// функция отображения текста элемента аккордеона
function showAccordionItem(item) {
	// текст, который "прикреплен" к заголовку
	const text = item.target.nextElementSibling;

	// если элемент аккордеона, не является открытым(не виден текст) 
	if (!text.classList.contains(`active`)) {
		// проходимся по каждму элементу аккордеона и скрываем отображаемый текст(поиск активного элемента)
		document.querySelectorAll(`.accordion__text-block`).forEach((elem) => {
			elem.previousElementSibling.classList.remove(`active`);
			elem.style.maxHeight = null;
		});
		// отображение текста
		text.style.maxHeight = text.scrollHeight + "px";
		text.previousElementSibling.classList.add(`active`);
	}
}

// при нажатии на елемент аккордеона 
document.querySelectorAll(`.accordion__header`).forEach(elem => {
	elem.addEventListener(`click`, item => {
		showAccordionItem(item);
	}, { passive: true });
});

// бургер меню
document.querySelector(`.burger-menu`).addEventListener(`click`, (elem) => {
	elem.target.classList.toggle(`burger-menu--active`);
	document.querySelector(`.main__slider-wrapper`).classList.toggle(`burger-menu__overlay`);
	document.querySelector(`.main__slider-paggination`).classList.toggle(`active-menu-item`);
	document.querySelector(`.header__phone-number`).classList.toggle(`active-menu-item`);
}, { passive: true });

document.querySelectorAll(`.main__slider-bullet`).forEach(elem => {
	elem.addEventListener(`click`, () => {
		document.querySelector(`.main__slider-wrapper`).classList.remove(`burger-menu__overlay`);
		document.querySelector(`.main__slider-paggination`).classList.remove(`active-menu-item`);
		document.querySelector(`.header__phone-number`).classList.remove(`active-menu-item`);
		document.querySelector(`.header__burger-menu`).classList.remove(`burger-menu--active`);
	}, { passive: true });
});

window.addEventListener(`resize`, () => {
	if (window.innerWidth > 1180) {
		document.querySelector(`.main__slider-wrapper`).classList.remove(`burger-menu__overlay`);
		document.querySelector(`.header__burger-menu`).classList.remove(`active-menu-item`);
		document.querySelector(`.header__phone-number`).classList.remove(`active-menu-item`);
	}
});

// проверяем текстовое поле
function checkText(value) {
	return (value !== ``) ? true : false;
};

// проверяем поле с почтой
function checkMail(value) {
	return (value != `` && value.includes(`@`)) ? true : false;
};

// при клике на область всплывающего окна, скрываем его, а также текст в полях ввода
document.querySelector(`.error`).addEventListener(`click`, (e) => {
	e.target.style.display = "none";
	document.querySelector(`.user-form__name-input`).value = ``;
	document.querySelector(`.user-form__mail-input`).value = ``;
	document.querySelector(`.user-form__description-area`).value = ``;
});

// клик по кнопке обратной формы
document.querySelector(`.user-form__button`).addEventListener(`click`, (e) => {
	e.preventDefault();
	// если правила проверки каждого инпута отличается
	// можно каждому инпуту задать определенный dataset
	// и общий для инпутов класс и пробежаться по этому классу
	// и в зависимости от dataset использовать определенную ф-ю
	const name = document.querySelector(`.user-form__name-input`);
	const mail = document.querySelector(`.user-form__mail-input`);
	const description = document.querySelector(`.user-form__description-area`);
	const bg = document.querySelector(`.error`);

	// проверка полей
	if (checkText(name.value) && checkMail(mail.value) && checkText(description.value)) {
		bg.style.display = `block`;
		Array.from(e.target.parentNode.children).map(elem => { elem.style.outline = `none` })
	} else {
		!checkText(name.value) ? name.style.outline = `2px solid red` : name.style.outline = ``;
		!checkText(description.value) ? description.style.outline = `2px solid red` : description.style.outline = ``;
		!checkMail(mail.value) ? mail.style.outline = `2px solid red` : mail.style.outline = ``;
	}
});