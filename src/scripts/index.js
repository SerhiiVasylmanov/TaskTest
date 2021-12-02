/////////////////////////Бургер меню/////////////////////////////////
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header-menu');
const body = document.querySelector('body');

headerBurger.addEventListener('click', onBurgerClick);

function onBurgerClick() {
    headerBurger.classList.toggle('active');
    headerMenu.classList.toggle('active');

    body.classList.toggle('lock');
}
//////////////////////////////////////////////////////////////////////


/////////////////////////Добавления класса хедеру////////////////////
const header = document.querySelector('.header');
const scrollChange = 80;

window.addEventListener('scroll', onBodyScroll)

function onBodyScroll() {
    scrollpos = window.scrollY;

    if (window.innerWidth > 768) {
        if (scrollpos >= 150) {
            header.classList.add('fx');
        } else {
            header.classList.remove('fx');
        }
    } else {
        if (scrollpos >= 80) {
            header.classList.add('bg');
        } else {
            header.classList.remove('bg');
        }
    }
}
//////////////////////////////////////////////////////////////////////


/////////////////////////////////Управление скроллом/////////////////
const btnPartnersLeft = document.querySelector('.scroll-btn-left');
const btnPartnersRight = document.querySelector('.scroll-btn-right');
const btnReviewsLeft = document.querySelector('#btn-left');
const btnReviewsright = document.querySelector('#btn-right');
const cardsReviews = document.querySelector('.reviews__cards_track');
const cardsPartners = document.querySelector('.partners-content-scroll');

btnReviewsLeft.addEventListener('click', onSliderClickLeft);
btnReviewsright.addEventListener('click', onSliderClickRight);

btnPartnersRight.addEventListener('click', onSliderPartnersClickRight);
btnPartnersLeft.addEventListener('click', onSliderPartnersClickLeft);

function onSliderClickLeft() {
    const cardsMob = cardsReviews.offsetWidth;
    if (window.innerWidth > 540) {
        cardsReviews.scrollLeft -= 340;
    } else {
        cardsReviews.scrollLeft -= cardsMob;
    }
}

function onSliderClickRight() {
    const cardsMob = cardsReviews.offsetWidth;
    if (window.innerWidth > 540) {
        cardsReviews.scrollLeft += 340;
    } else {
        cardsReviews.scrollLeft += cardsMob;
    }
}

function onSliderPartnersClickRight() {
    const cardsMob = cardsPartners.offsetWidth;
    if (window.innerWidth > 540) {
        cardsPartners.scrollLeft += 280;
    } else {
        cardsPartners.scrollLeft += cardsMob;
    }
}

function onSliderPartnersClickLeft() {
    const cardsMob = cardsPartners.offsetWidth;
    if (window.innerWidth > 540) {
        cardsPartners.scrollLeft -= 280;
    } else {
        cardsPartners.scrollLeft -= cardsMob;
    }
}

const carLogos = document.querySelector('.services__cars-logos');

function onSliderCarsScroll() {
    clientwidth = carLogos.clientWidth;
    offsetwidth = carLogos.scrollWidth;

    x = offsetwidth - clientwidth
    let position = 0

    function startscroll() {
        if (carLogos.scrollLeft < x) { position++; carLogos.scrollLeft = position }
        if (carLogos.scrollLeft >= x) { carLogos.scrollLeft = 0; position = 0 }
    }
    setInterval(startscroll, 50)
}
onSliderCarsScroll();
//////////////////////////////////////////////////////////////////////


/////////////////////////////Плавный скролл по якорям/////////////////
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;

anchors.forEach(function (item) {

    item.addEventListener('click', function (e) {
        e.preventDefault();

        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - 100;

        let scroller = setInterval(function () {
            let scrollBy = coordY / framesCount;

            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
        }, animationTime / framesCount);
    });
});
//////////////////////////////////////////////////////////////////////


/////////////////////Появление и выбор item с validate////////////////
const select = document.querySelector('.select');
const optionBox = document.querySelector('.issueProblem');
const options = [...document.querySelectorAll('.issueProblem .item')];

let activeOption = 0;

window.onclick = (e) => {
    if (!e.target.className.includes('select')) {
        select.classList.remove('active');
        optionBox.classList.remove('active');
        if (select.value !== 'Choose your problem') {
            select.style.color = 'rgba(90,90,90,1)';
            select.classList.add('valid');
        }
        return;
    } else {
        select.classList.toggle('active');
        optionBox.classList.toggle('active');
    }
}

options.forEach((item, i) => {
    item.onmousemove = () => {
        hoverOptions(i);
    }
})

const hoverOptions = (i) => {
    options[activeOption].classList.remove('active');
    options[i].classList.add('active');
    activeOption = i;
    setValue();
}

window.onkeydown = (e) => {
    if (select.className.includes('active')) {
        e.preventDefault();
        if (e.key === 'ArrowDown' && activeOption < options.length - 1) {
            hoverOptions(activeOption + 1);
        } else if (e.key === 'ArrowUp' && activeOption > 0) {
            hoverOptions(activeOption - 1);
        } else if (e.key === 'Enter') {
            select.classList.remove('active');
            optionBox.classList.remove('active');
        }
    }
}

const setValue = () => {
    select.innerHTML = select.value = options[activeOption].innerHTML;
}

function valSel() {
    if (select.value == 'Choose your problem') {
        select.style.color = 'rgba(90,90,90,0.5)';
    }
    return;
}

valSel();
//////////////////////////////////////////////////////////////////////


///////////////////////Validate message textarea/////////////////////
const message = document.querySelector('.message');

message.addEventListener('input', validateMessage);

function validateMessage() {
    const messageError = document.querySelector('.messageError');
    if (message.value.length > 5) {
        message.classList.add('valid');
        messageError.style.display = 'none';
        if (message.classList.contains('notvalid')) {
            message.classList.remove('notvalid');
        }
    }
    else {
        message.classList.add('notvalid');
        messageError.style.display = 'block';
        if (message.classList.contains('valid')) {
            message.classList.remove('valid');
        }
    }

};
//////////////////////////////////////////////////////////////////////

///////////////////////Validate input Name User/////////////////////
const nameUser = document.querySelector('.name');

nameUser.addEventListener('input', validateUserName);

function validateUserName() {
    const messageError = document.querySelector('.messageErrorName');
    const re = /^[a-zA-Zа-яА-Я'][a-za-zа-яа-я']{2,14}?$/u;
    const myName = document.querySelector('.name').value;
    const valid = re.test(myName);
    if (valid) {
        nameUser.classList.add('valid');
        messageError.style.display = 'none';
        if (nameUser.classList.contains('notvalid')) {
            nameUser.classList.remove('notvalid');
        }
    } else {
        nameUser.classList.add('notvalid');
        messageError.style.display = 'block';
        if (nameUser.classList.contains('valid')) {
            nameUser.classList.remove('valid');
        }
    }
}
//////////////////////////////////////////////////////////////////////


///////////////////////Validate input Phone User/////////////////////
const phoneUser = document.querySelector('.phone');

phoneUser.addEventListener('input', validateUserPhone);

function validateUserPhone() {
    const messageError = document.querySelector('.messageErrorPhone');
    const re = /^\d[\d\(\)\ -]{4,14}\d$/;
    const myPhone = document.querySelector('.phone').value;
    const valid = re.test(myPhone);
    if (valid) {
        phoneUser.classList.add('valid');
        messageError.style.display = 'none';
        if (phoneUser.classList.contains('notvalid')) {
            phoneUser.classList.remove('notvalid');
        }
    } else {
        phoneUser.classList.add('notvalid');
        messageError.style.display = 'block';
        if (phoneUser.classList.contains('valid')) {
            phoneUser.classList.remove('valid');
        }
    };

    return valid;
}
//////////////////////////////////////////////////////////////////////


///////////////////////Validate input Mail User/////////////////////
const mailUser = document.querySelector('.mail');

mailUser.addEventListener('input', validateUserMail);

function validateUserMail() {
    const messageError = document.querySelector('.messageErrorMail');
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const myPhone = document.querySelector('.mail').value;
    const valid = re.test(myPhone);
    if (valid) {
        mailUser.classList.add('valid');
        messageError.style.display = 'none';
        if (mailUser.classList.contains('notvalid')) {
            mailUser.classList.remove('notvalid');
        }
    } else {
        mailUser.classList.add('notvalid');
        messageError.style.display = 'block';
        if (mailUser.classList.contains('valid')) {
            mailUser.classList.remove('valid');
        }
    };

    return valid;
}
//////////////////////////////////////////////////////////////////////


///////////////////////Проверка формы перед отправкой/////////////////////
const form = document.querySelector('.support__form_form');

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const messageError = document.querySelector('.messageForm');
    messageError.style.display = 'block';

    setTimeout(() => messageError.textContent = '', 4000);

    if (!nameUser.classList.contains('valid')) {
        messageError.innerHTML = 'Name field is not filled in correctly'
        return;
    }

    if (!select.classList.contains('valid')) {
        messageError.innerHTML = 'The problem field is not filled';
        return;
    }

    if (!phoneUser.classList.contains('valid')) {
        messageError.innerHTML = 'Phone number field is not filled in correctly';
        return;
    }

    if (!message.classList.contains('valid')) {
        messageError.innerHTML = 'The comment field is not filled correctly';
        return;
    }

    if (!mailUser.classList.contains('valid')) {
        messageError.innerHTML = 'Email field is not correct';
        return;
    }

    this.submit();
});
//////////////////////////////////////////////////////////////////////
