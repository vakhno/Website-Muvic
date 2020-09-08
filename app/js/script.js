let bulletsArray = Array.from(document.querySelectorAll('.main__slider-item')).map(elem => elem.dataset.slideName);

const swiperMain = new Swiper(`.main__slider`, {
    direction: 'vertical',
    slidesPerView: 1,
    simulateTouch: false,
    mousewheel: true,
    slideClass: `main__slider-item`,
    slideActiveClass: 'main__slider-item--active',
    wrapperClass: `main__slider-wrapper`,
    keyboard: true,

    pagination: {
        bulletClass: `main__slider-bullet`,
        bulletActiveClass: `main__slider-bullet--active`,
        el: `.main__slider-paggination`,
        type: `bullets`,
        clickable: true,
        renderBullet: function (index, className) {
            return `<div class='main__slider-bullet'>${bulletsArray[index]}</div>`
        },
    },
    navigation: {
        nextEl: '.main__next-slide',
        prevEl: '.main__prev-slide',
    },
});

const swiperAdvantage = new Swiper(`.advantage__slider`, {
    loop: false,
    slidesPerView: 1,
    slideClass: `advantage__slider-item`,
    slideActiveClass: 'advantage__slider-item--active',
    wrapperClass: `advantage__slider-wrapper`,
    keyboard: true,
    navigation: {
        nextEl: '.advantage__next-slide',
        prevEl: '.advantage__prev-slide',
    },
});

function showCharacteristic(item) {
    let line = item.target.parentNode.parentNode.children[0];
    let lineLength = line.width.animVal['value'];
    let description = item.target.parentNode.parentNode.parentNode.children[0];
    console.log(description)
    let checked = item.target.checked;

    if (checked) {
        line.style.strokeDashoffset = lineLength;
        description.style.opacity = 1;
        line.style.animation = 'ani .5s linear forwards';
    } else {
        line.style.strokeDashoffset = lineLength;
        description.style.opacity = 0;
        line.style.animation = 'ani-reverse .5s linear forwards';
    }
    console.log(item)
    console.log(item.target.parentNode.parentNode.children[0])
}

document.querySelectorAll('.characteristic-block__label > input').forEach(elem => {
    elem.addEventListener('click', item => {
        showCharacteristic(item)
    })
})


function showAccordionItem(item) {
    let text = item.target.nextElementSibling;

    if (!text.classList.contains('active')) {
        document.querySelectorAll('.accordion__text-block').forEach((elem) => {
            elem.previousElementSibling.classList.remove('active');
            elem.style.maxHeight = null
        })
        text.style.maxHeight = text.scrollHeight + "px";
        text.previousElementSibling.classList.add('active');
    }
}

document.querySelectorAll('.accordion__header').forEach(elem => {
    elem.addEventListener('click', item => {
        showAccordionItem(item)
    })
})


document.querySelector('.burger-menu').addEventListener('click', (elem) => {
    elem.target.classList.toggle('burger-menu--active');
    document.querySelector('.main__slider-wrapper').classList.toggle('burger-menu__overlay');
    document.querySelector('.main__slider-paggination').classList.toggle('active-menu-item');
    document.querySelector('.header__phone-number').classList.toggle('active-menu-item');

})

document.querySelectorAll('.main__slider-bullet').forEach(elem => {
    elem.addEventListener('click', item => {
        document.querySelector('.main__slider-wrapper').classList.remove('burger-menu__overlay')
        document.querySelector('.main__slider-paggination').classList.remove('active-menu-item');
        document.querySelector('.header__phone-number').classList.remove('active-menu-item');
        document.querySelector('.header__burger-menu').classList.remove('burger-menu--active');
    })
})

window.addEventListener('resize', elem => {
    if (window.innerWidth > 1180) {
        document.querySelector('.main__slider-wrapper').classList.remove('burger-menu__overlay');
        document.querySelector('.header__burger-menu').classList.remove('active-menu-item');
        document.querySelector('.header__phone-number').classList.remove('active-menu-item');
    }
})


function deleteOutline(...args) {
    args.map(elem => {
        elem.addEventListener('click', (item) => {
            console.log(item.target.style.outline = '')
        })
    })
}

function checkText(value) {
    return (value !== '') ? true : false;
};

function checkMail(value) {
    return (value != '' && value.includes('@')) ? true : false;
};

document.querySelector('.error').addEventListener('click', (e) => {
    e.target.style.display = "none";
    document.querySelector('.user-form__name-input').value = '';
    document.querySelector('.user-form__mail-input').value = '';
    document.querySelector('.user-form__description-area').value = '';
})

document.querySelector('.user-form__button').addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.querySelector('.user-form__name-input');
    let mail = document.querySelector('.user-form__mail-input');
    let description = document.querySelector('.user-form__description-area');
    let bg = document.querySelector('.error');

    deleteOutline(name, mail, description);

    if (checkText(name.value) && checkMail(mail.value) && checkText(description.value)) {
        bg.style.display = 'block'
    } else {
        !checkText(name.value) ? name.style.outline = '2px solid red' : name.style.outline = '';
        !checkText(description.value) ? description.style.outline = '2px solid red' : description.style.outline = '';
        !checkMail(mail.value) ? mail.style.outline = '2px solid red' : mail.style.outline = '';
    }
})