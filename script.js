const popupLinks = document.querySelectorAll('.popup-link'); // класс для обозначения попапа
const body = document.querySelector('body'); // для блокировки скролла
const lockPadding = document.querySelectorAll(".lock-padding"); // для залочивания пэдинга, в случае если объект двигается

let unlock = true; // для предовращения двойных нажатий

const timeout = 500; // блок на время анимации

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup'); //класс для закрытия попапа
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) { //функция открытия попапа
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnLock = true) { //функция закрытия попапа
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnLock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
// для закрытия попапа клавишей esc
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.webkitMatchsSelector ||
		Element.prototype.mozMatchsSelector ||
		Element.prototype.msMatchsSelector;
	}
})();
/*-----*/
function visibility(show, hide) {
	document.getElementById(hide).style.visibility = "visible";
	document.getElementById(show).style.visibility = "hidden";
}
/*-----*/
var slideIndex = [1,1];
var slideId = ["mySlides1", "mySlides2"]
var dot = ["dot1", "dot2"]
showSlides(1, 0);
showSlides(1, 1);
// Next/previous controls
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}
// Thumbnail image controls
function currentSlide(n, no) {
	showSlides(slideIndex[no] = n, no);
}
function showSlides(n, no) {
	var i;
	var slides = document.getElementsByClassName(slideId[no]);
	var dots = document.getElementsByClassName(dot[no]);
	if (n > slides.length) {slideIndex[no] = 1}
	if (n < 1) {slideIndex[no] = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex[no]-1].style.display = "flex";
	dots[slideIndex[no]-1].className += " active";
}

var slideIndex2 = 1;
showSlides2(slideIndex2);
function plusSlides2(n) {
	showSlides2(slideIndex2 += n);
}
function currentSlide2(n) {
	showSlides2(slideIndex2 = n);
}
function showSlides2(n) {
	var i;
	var slides = document.getElementsByClassName("slides");
	if (n > slides.length) {slideIndex2 = 1}
	if (n < 1) {slideIndex2 = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex2-1].style.display = "block";
}