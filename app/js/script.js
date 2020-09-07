let bulletsArray = Array.from(document.querySelectorAll('.main__slider-item')).map(elem => elem.dataset.slideName);

const swiperMain = new Swiper(`.main__slider`, {
    direction: 'vertical',
    slidesPerView: 1,
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


