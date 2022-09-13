class OfferPopup {
  constructor(options) {
    this.title = options.title;
    this.text = options.text;
    this.imageSrc = options.imageSrc;
    this.buttonText = options.buttonText;
    this.timeToAppear = options.timeToAppear * 1000;
    this.cookieName = options.cookieName;
    this.theme = options.theme;

    this.componentHTML = this.createPopup();
    this.popupNode;
    this.closeBtn;
    this.form;
    this.textContainer;
  }

  createPopup() {
    const styles = `
    <style>
      .popup-offer {
        position: fixed;
        top: 0;
        left: 0;
        min-width: 100vw;
        min-height: 100vh;
        box-sizing: border-box;
        z-index: 1001;
        background: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: NEXTPanBook, Arial, Helvetica, sans-serif;
        --firm-green: #64CDC9;
        --firm-brown: #817368;
        --firm-grey: #646B70;
        --firm-milky: #f9f9f9;
        opacity: 0;
        pointer-events: none;
        transition: opacity 1s;
      }
      .popup-offer._active {
        opacity: 1;
        pointer-events: all;
      }
      .popup-offer__inner {
        max-width: 600px;
        background: var(--firm-milky);
        position: relative;
      }
      .popup-offer__close {
        width: 30px;
        height: 30px;
        background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMi4wMDEgNTEyLjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyLjAwMSA1MTIuMDAxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjg0LjI4NiwyNTYuMDAyTDUwNi4xNDMsMzQuMTQ0YzcuODExLTcuODExLDcuODExLTIwLjQ3NSwwLTI4LjI4NWMtNy44MTEtNy44MS0yMC40NzUtNy44MTEtMjguMjg1LDBMMjU2LDIyNy43MTcgICAgTDM0LjE0Myw1Ljg1OWMtNy44MTEtNy44MTEtMjAuNDc1LTcuODExLTI4LjI4NSwwYy03LjgxLDcuODExLTcuODExLDIwLjQ3NSwwLDI4LjI4NWwyMjEuODU3LDIyMS44NTdMNS44NTgsNDc3Ljg1OSAgICBjLTcuODExLDcuODExLTcuODExLDIwLjQ3NSwwLDI4LjI4NWMzLjkwNSwzLjkwNSw5LjAyNCw1Ljg1NywxNC4xNDMsNS44NTdjNS4xMTksMCwxMC4yMzctMS45NTIsMTQuMTQzLTUuODU3TDI1NiwyODQuMjg3ICAgIGwyMjEuODU3LDIyMS44NTdjMy45MDUsMy45MDUsOS4wMjQsNS44NTcsMTQuMTQzLDUuODU3czEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1ICAgIEwyODQuMjg2LDI1Ni4wMDJ6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==") center/contain no-repeat;
        display: block;
        position: absolute;
        top: 0;
        right: -50px;
        opacity: 0.6;
        transition: opacity .3s;
        cursor: pointer;
      }
        .popup-offer__close:hover {
          opacity: 1;
        }
      .popup-offer__image {
        display: block;
        max-width: 100%;
      }
      .popup-offer__text-container {
        padding: 30px 20px;
        color: var(--firm-brown);
        text-align: center;
        font-size: 17px;
      }
      .popup-offer__title {
        font-size: 24px;
        margin: 0 0 .5em 0;
      }
      .popup-offer__text {
        margin: 0;
        font-weight: 100;
      }
      .popup-offer__form {
        display: flex;
        flex-direction: column;
        grid-gap: 20px;
        align-items: center;
        margin-top: 20px;
      }
      .popup-offer__form-input {
        outline: none;
        padding: 5px 20px;
        background: var(--firm-milky);
        border: none;
        border-bottom: 1px solid var(--firm-brown);
        width: 100%;
        max-width: 300px;
        box-sizing: border-box;
        font-size: inherit;
        font-family: inherit;
      }
      .popup-offer__form-input::placeholder { font-weight: 100; }
      .popup-offer__form-button {
        background: var(--firm-green);
        color: #fff;
        padding: 15px 40px;
        box-sizing: border-box;
        transition: transform .3s;
        font-family: inherit;
        border: none;
        cursor: pointer;
        width: 100%;
        max-width: 300px;
        margin-top: 10px;
        font-size: inherit;
      }
        .popup-offer__form-button:hover {
          transform: scale(1.05);
        }
      .popup-offer__success-message {
        margin: 20px 0;
        font-size: 21px;
      }
        .popup-offer__success-message span {
          color: var(--firm-green);
          font-size: 24px;
          font-weight: 400;
        }
      @media (max-width: 768px) {
        .popup-offer__close {
          top: 20px;
          right: 20px;
        }
        .popup-offer__text-container {
          font-size: 14px;
        }
        .popup-offer__title {
          font-size: 18px;
        }
      }
    </style>
    `;

    return `
    <div class="popup-offer">
      ${styles}
      <div class="popup-offer__inner">
        <div class="popup-offer__close"></div>
        <img src="${this.imageSrc}" alt="background" class="popup-offer__image"> <!-- SRC -->
        <div class="popup-offer__text-container">
          <p class="popup-offer__title">${this.title}</p>
          ${this.text.map(i => `<p class="popup-offer__text">${i}</p>`).join('')}
          <form action="#" class="popup-offer__form">
            <input name="usertel" type="tel" class="popup-offer__form-input" autocomplete="off" placeholder="Телефон" required>
            <input name="username" type="text" class="popup-offer__form-input" autocomplete="off" placeholder="Имя" required>
            <input name="theme" type="hidden" class="popup-offer__form-input" value="${this.theme}">
            <button onclick="ym(86004166,'reachGoal','vspliv')" class="popup-offer__form-button">${this.buttonText}</button>
          </form>
        </div>
      </div>
    </div>
    `;
  }

  timer(ms) { return new Promise(function(resolve, reject){ setTimeout(resolve, ms) }) }

  addListeners() { 
    this.closeBtn.addEventListener('click', this.closePopup);
    this.form.addEventListener('submit', this.sendMessage);
  }

  removeListeners() { 
    this.closeBtn.removeEventListener('click', this.closePopup); 
    this.form.removeEventListener('submit', this.sendMessage);
  }

  openPopup() {
    this.popupNode.classList.add('_active');
    document.body.style.overflow = 'hidden';
  }

  closePopup = async () => {
    this.popupNode.classList.remove('_active');
    document.body.style.overflow = 'auto';
    this.removeListeners();

    await this.timer(2000);

    this.popupNode.style.display = 'none';
  }

  createSuccessMessage(name) {
    return `<p class="popup-offer__success-message">Спасибо, <span>${name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase()}</span>, мы скоро свяжемся с Вами!</p>`;
  }

  sendMessage = async (event) => {
    event.preventDefault();
    const formData = new FormData(this.form);

    const response = await fetch('/form/sendOfferPopupDataToTG.php', { // path php
      method: 'POST',
      body: formData,
    });

    if(response.ok) {
      this.textContainer.innerHTML = this.createSuccessMessage(this.form.elements.username.value); // после отправки
    } else {
      alert('Возникла ошибка на сервере, попробуйте перезагрузить страницу и снова отправить запрос')
    }
    await this.timer(3000);
    this.closePopup();
  }

  setCookie() { document.cookie = `${this.cookieName}=true;`; }

  async addPopupToDOM() {
    // добавление в DOM
    document.body.insertAdjacentHTML('afterbegin', this.componentHTML);

    // задержка до появления
    await this.timer(this.timeToAppear);

    // запись необходимых DOM-узлов в переменные 
    this.popupNode = document.querySelector('.popup-offer');
    this.closeBtn = this.popupNode.querySelector('.popup-offer__close');
    this.form = this.popupNode.querySelector('.popup-offer__form');
    this.textContainer = this.popupNode.querySelector('.popup-offer__text-container');

    // открытие попапа с анимацией появления
    this.openPopup();
    // добавление обработчиков на закрытие попапа и обработку формы заявки
    this.addListeners();
    // запись открытия попапа в куки для предотвращения очередного открытия
    this.setCookie();
  }
}
/*
const offerLandscape = new OfferPopup({
  title: 'Ландшафтный дизайн в подарок!',
  text: [
    'Только до 31 августа клубный поселок «Репинское» дарит профессиональный ландшафтный проект при приобретении любого участка. Мы создадим красоту вокруг вашего дома!',
    'Осталось всего 12 свободных участков!',
  ],
  imageSrc: '/img/popup-offer/offer1.jpg',
  buttonText: 'Заказать звонок',
  timeToAppear: 50,
  cookieName: 'offerLandscape-popup',
  theme: '«Ландшафтный дизайн в подарок!»',
});

const offerGuestsHouse = new OfferPopup({
  title: 'Построим гостевой дом со СПА в подарок!',
  text: [
    'Покупателям участков от 40 соток мы сделаем уникальный подарок – построим «под ключ» гостевой дом площадью 120 м2 со СПА и террасой совершенно бесплатно.',
    'Спешите! Предложение ограниченно!',
  ],
  imageSrc: '/img/popup-offer/offer2.jpg',
  buttonText: 'Узнать детали акции',
  timeToAppear: 70,
  cookieName: 'offerGuestsHouse-popup',
  theme: '«Построим гостевой дом со СПА в подарок!»',
});
*/
(function choosePopup() {
  if(!document.cookie.includes(offerLandscape.cookieName)) {
    offerLandscape.addPopupToDOM();
  } else if(!document.cookie.includes(offerGuestsHouse.cookieName)) {
    offerGuestsHouse.addPopupToDOM();
  }
})();