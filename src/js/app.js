import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

'use strict'

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile    .iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow')
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function (e) {
                menuArrow.parentElement.parentElement.classList.toggle('_active')
            });
        }
    }
}
else {
    document.body.classList.add('_pc');
}

// Меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// Прокрутка при клике

const menuLinks = document.querySelectorAll('a[data-goto]');
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

  
// Слайдер

var mobs = window.matchMedia("(max-width: 320px)");
var mobl = window.matchMedia("(max-width: 425px)");
var tablets = window.matchMedia("(max-width: 768px)");
var laptop = window.matchMedia("(max-width: 1024px)");

var slidesNum = 1;

if (mobs.matches) { // Если медиа запрос совпадает
    slidesNum = 1;
} 
else{
    if (mobl.matches) {
        slidesNum = 2;
    }
    else {
        if (tablets.matches) {
            slidesNum = 3;
        }
        else {
            if (laptop.matches) {
                slidesNum = 4;
            }
            else {
                slidesNum = 5;
            }
        }
    }
}
new Swiper(".image-slider", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true
        // dynamicBullets: true,
    },
    slidesPerView: slidesNum,
    // Управление клавиатурой
    keyboard: {
        // Включить\выключить
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    // Бесконечный слайдер
    loop: true,

    // Свободный режим
    freeMode: true,

    // Автопрокрутка

    autoplay: {
        // Пауза между прокруткой
        delay: 1000,
        // Закончить на последнем слайде
        stopOnLastSlide: true,
        // Отключить после ручного переключения
        disableOnInteraction: false
    },

    // Скорость
    speed: 1000,

    // Эффекты переключения слайдов.
    // Листание
    effect: 'slide',
});


// Модальное окно
MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-custom-open',
    closeTrigger: 'data-custom-close',
    openClass: 'is-open', // [5]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // [10]
})
   
// Спойлеры
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    for (let j = 0; j < acc.length; j++){
        if(acc[j] != this){
          acc[j].classList.remove("active");
          acc[j].nextElementSibling.style.maxHeight = null;
      }
    }
    let panel = this.nextElementSibling; 
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

document.onkeydown = function(e){
  var keyCode = e.keyCode || e.charCode;
  if (keyCode == 32) e.preventDefault();
};

// Игра динозаврик
let character = document.getElementById("character");
let characterImg = document.getElementById("charimg");
let block1 = document.getElementById("house1");
let block2 = document.getElementById("car1");
let block3 = document.getElementById("house2");
let border = document.getElementById("border");
let button = document.getElementById("open_game");
let button1 = document.getElementById("open_game1");
let game = document.getElementById("game");
let game_menu = document.getElementById("game_menu");
let game_menu_btn = document.getElementById("game_menu_btn");
let close_btn = document.getElementById("cross");
var counter = 0;
var charSpeed = 600;
var houseSpeed = 2.5;

button.addEventListener('click', function () {
    game.style.display = "flex";
    const gotoBlock = document.querySelector(".page__section_9");
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
    if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active')
    }
    window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
    });

});
button1.addEventListener("click", function () {
  game.style.display = "flex";
});

close_btn.addEventListener("click", function () {
    game_stop();
    game.style.display = "none";
  
});
function game_stop() {
    block1.style.animation = "none";
    block2.style.animation = "none";
    block3.style.animation = "none";
    characterImg.src = "/img/grifon_stop.png";
    border.style.backgroundImage = "url('/img/game_road_stop.jpg')";
    game_menu.style.display = "flex";
    document.getElementById("gameScore").innerHTML = "&nbsp;" + Math.floor(counter / 100);
    document.getElementById("scoreArea").style.display = "none";
    close_btn.style.display = "block";
}
function game_start() {
    game_menu.style.display = "none";
    switch_animation();
    counter = 0;
    document.getElementById("scoreArea").style.display = "flex";
    close_btn.style.display = "none";
    block1.style.animation = "goLeft " + houseSpeed + "s infinite linear";
    setTimeout(function () {
        block2.style.animation = "goLeft " + houseSpeed + "s infinite linear";
    }, 500);
    setTimeout(function () {
        block3.style.animation = "goLeft "+houseSpeed+"s infinite linear";
    }, 1100);
    characterImg.src = "/img/grifon.gif";
    border.style.backgroundImage = "url('/img/game_bg.gif')";
}
function switch_animation() {
    if (character.classList == "animate") { return }
    character.classList.add("animate");
    setTimeout(function () {
        character.classList.remove("animate");
    }, charSpeed);
}


// Пробел, стрелочка вверх, буква w
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 32 || event.keyCode == 38 || event.keyCode == 87) {
        if (border.classList == "game_run") {
            switch_animation();
        }
        else {
            game_start()
            border.classList.add("game_run");
        }
    }
});
// Для клика и мобилок
border.addEventListener('click', function () {
    if (border.classList == "game_run") {
        switch_animation();
    }
    else {
        game_start()
        border.classList.add("game_run");
    }
});
game_menu_btn.addEventListener('click', function () {
    game_start();
});


let check = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let block1Left = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
    let block2Left = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    let block3Left = parseInt(window.getComputedStyle(block3).getPropertyValue("left"));
    if (block1Left < 40 && block1Left > 0 && characterTop <= 150) {
        game_stop();
    }
    else if (block2Left <= -70 && block2Left >= -110 && characterTop <= 50) {
        game_stop();
    }
    else if (block3Left <= -204 && block3Left >= -232 && characterTop <= 150) {
        game_stop();
    }
    else{
        counter++;
        document.getElementById("scoreSpan").innerHTML = "&nbsp;"+Math.floor(counter/100);
    }
}) 

// Кнопка наверх


function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('showbtn');
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove('showbtn');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}

var goTopBtn = document.getElementById('scrollupbutton');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);



//loader//

let loaderwrapper = document.querySelector('.loaderwrapper');

window.addEventListener('load', () => {
    loaderwrapper.classList.add('hide');
    setTimeout(() => {
        loaderwrapper.remove();
     },600)
});


// ------  Смена языка -------

const select = document.querySelector('select');
const allLang = ['en', 'ru', 'ua'];

const langArr = {
  // Заголовки секций
  title1: {
    ru: "Об агенстве",
    en: "About agency",
    ua: "Про агенство",
  },
  title2: {
    ru: "Наши партнеры",
    en: "Our partners",
    ua: "Наші партнери",
  },
  title3: {
    ru: "Чем мы занимаемся?",
    en: "What are we doing?",
    ua: "Що ми робимо?",
  },
  title4: {
    ru: "Наши актуальные объекти",
    en: "Our current objects",
    ua: "Наші актуальні об'єкти",
  },
  title5: {
    ru: "Как нас найти?",
    en: "How to find us?",
    ua: "Як нас знайти?",
  },
  title6: {
    ru: "<h1>Консультация по любому вопросу</h1><h1>Свяжитесь с нами</h1>",
    en: "<h1>Consultation on any issue</h1><h1>Contact us</h1>",
    ua: "<h1>Консультація з будь-якого питання</h1><h1>Зв'яжіться з нами</h1>",
  },
  title7: {
    ru: "Часто задаваемые вопросы",
    en: "Frequently asked Questions",
    ua: "Часто задавані питання",
  },
  title8: {
    ru: "Мини-игра",
    en: "Mini-game",
    ua: "Міні-гра",
  },
  title9: {
    ru: "Если вы не нашли ответ на свой вопрос, можете связаться с менеджером",
    en: "If you did not find the answer to your question, you can contact the manager",
    ua: "Якщо ви не знайшли відповіді на своє запитання, можете зв'язатися з менеджером",
  },
  // Подзаголовки первой секции
  subtitle1: {
    ru: "Професиональная команда экспертов на рынке премиальных объектов",
    en: "A professional team of experts in the premium property market",
    ua: "Професійна команда експертів на ринку преміальних об'єктів",
  },
  subtitle2: {
    ru: "Эффективно продаем и сдаем в аренду объекты недвижимости",
    en: "Effectively sell and rent real estate",
    ua: "Ефективно продаємо та здаємо в оренду об'єкти нерухомості",
  },
  subtitle3: {
    ru: "Экономим ваше время в вопросах недвижимости",
    en: "We save your time in real estate matters",
    ua: "Заощаджуємо ваш час у питаннях нерухомості",
  },
  about: {
    ru: "<p>Агентство недвижимости Грифон – это современная, дружная, позитивная и опытная команда специалистов  - экспертов на рынке недвижимости Украины и мира.</p><p> Наша главная задача – стать для вас специалистом, который обеспечит решение Вашего вопроса!</p><p> Агентство находится в условиях постоянного обучения, профессионального и личностного роста, позволяет нам качественно, грамотно, работать на достижение результата. Для решения Вашего вопроса нам потребуется – определить Ваш запрос, и максимально точно удовлетворить Вашу потребность, и осуществить ее!</p><p>Наша стратегия – это дружелюбные отношения с нашим клиентом, желание эффективно помочь, и сэкономить Ваше время с целью минимизировать риски и ресурсы. </p><p>С помощью нашей команды Вы сможете полностью лишиться волнений и получить решение Вашей задачи.Вместо обещаний, мы выбираем реальные действия!</p>",
    en: "<p>Gryphon Real Estate Agency is a modern, friendly, positive and experienced team of specialists - experts in the real estate market of Ukraine and the world.</p><p> Our main task is to become a specialist for you who will provide a solution to your question!</p><p> The agency is in conditions of constant learning, professional and personal growth, which allows us to work efficiently, competently, to achieve results. To solve your issue, we will need to define your request, and meet your need as accurately as possible, and implement it!</p><p>Our strategy is friendly relations with our client, the desire to help effectively, and save your time in order to minimize risks and resources. </p><p>With the help of our team, you can completely lose your worries and get a solution to your problem. Instead of promises, we choose real actions!</p>",
    ua: "<p>Агентство нерухомості Грифон – це сучасна, дружня, позитивна та досвідчена команда фахівців - експертів на ринку нерухомості України та світу.</p><p> Наше головне завдання – стати для вас фахівцем, який забезпечить вирішення Вашого питання!</p><p> Агентство перебуває в умовах постійного навчання, професійного та особистісного зростання, дозволяє нам якісно, ​​грамотно, працювати на досягнення результату. Для вирішення Вашого питання нам потрібно буде – визначити Ваш запит, і максимально точно задовольнити Вашу потребу, і здійснити її! ризики та ресурси. </p><p>За допомогою нашої команди Ви зможете повністю позбутися хвилювань і отримати вирішення Вашого завдання. Замість обіцянок, ми обираємо реальні дії!</p>",
  },
  // Форма обратной связи
  callformbtn: {
    ru: "Заказать звонок",
    en: "Request a call",
    ua: "Замовити дзвінок",
  },
  callform1: {
    ru: "Оформить заявку",
    en: "Make a request",
    ua: "Оформити заявку",
  },
  callform2: {
    ru: "Имя",
    en: "Name",
    ua: "Ім'я",
  },
  callform3: {
    ru: "Номер телефона",
    en: "Phone number",
    ua: "Номер телефону",
  },
  callform4: {
    ru: "Комментарий (Необязательно)",
    en: "Comment (Optional)",
    ua: "Коментар (Необов'язково)",
  },
  callform5: {
    ru: "Отправить",
    en: "Send",
    ua: "Надіслати",
  },
  // Элементы меню
  menu1: {
    ru: "Главная",
    en: "Main",
    ua: "Головна",
  },
  menu2: {
    ru: "Застройщики",
    en: "Developers",
    ua: "Забудовники",
  },
  menu3: {
    ru: "Наши услуги &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    en: "Our services &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    ua: "Наші послуги &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
  },
  menu4: {
    ru: "Продажа квартир",
    en: "Sale of apartments",
    ua: "Продаж квартир",
  },
  menu5: {
    ru: "Продажа домов",
    en: "Sales of houses",
    ua: "Продаж будинків",
  },
  menu6: {
    ru: "Продажа коммерческой недвижимости",
    en: "Sale of commercial real estate",
    ua: "Продаж комерційної нерухомості",
  },
  menu7: {
    ru: "Продажа земельных участков",
    en: "Sale of land",
    ua: "Продаж земельних ділянок",
  },
  menu8: {
    ru: "Бизнес под ключ",
    en: "Turnkey business",
    ua: "Бізнес під ключ",
  },
  menu9: {
    ru: "Инвестиционное предложение",
    en: "Investment proposal",
    ua: "Інвестиційна пропозиція",
  },
  menu10: {
    ru: "Контакты",
    en: "Contacts",
    ua: "Контакти",
  },
  menu11: {
    ru: "Полезная информация &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    en: "Useful information &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
    ua: "Корисна інформація &nbsp;<span class='menu__arrow'><i class='fa-solid fa-angle-down'></i></span>",
  },
  menu12: {
    ru: "Наши партнеры",
    en: "Our partners",
    ua: "Наші партнери",
  },
  menu13: {
    ru: "Наши актуальные объекты",
    en: "Our current objects",
    ua: "Наші актуальні об'єкти",
  },
  menu14: {
    ru: "Часто задаваемые вопросы",
    en: "Frequently asked Questions",
    ua: "Часто задавані питання",
  },
  menu15: {
    ru: "Мини-игра",
    en: "Mini game",
    ua: "Міні-гра",
  },
  //   Виды услуг
  work1: {
    ru: "Продажа/Аренда Квартир",
    en: "Sale/Rent Apartments",
    ua: "Продаж/оренда квартир",
  },
  work2: {
    ru: "Продажа/Аренда коммерческой недвижимости",
    en: "Sale/Rental of commercial real estate",
    ua: "Продаж комерційної нерухомості",
  },
  work3: {
    ru: "Продажа/Аренда домов",
    en: "Sale/Rent of houses",
    ua: "Продаж/Оренда будинків",
  },
  work4: {
    ru: "Продажа/Аренда земельных участков",
    en: "Sale/Rental of land plots",
    ua: "Продаж/Оренда земельних ділянок",
  },
  work5: {
    ru: "Бизнес под ключ",
    en: "Turnkey business",
    ua: "Бізнес під ключ",
  },
  work6: {
    ru: "Инвестиционное предложение",
    en: "Investment proposal",
    ua: "Інвестиційна пропозиція",
  },
  work7: {
    ru: "Недвижимость за рубежом",
    en: "Real estate abroad",
    ua: "Нерухомість за кордоном",
  },
  //  Контакты
  contact1: {
    ru: "<h1>Контакты</h1>",
    en: "<h1>Contacts</h1>",
    ua: "<h1>Контакти</h1>",
  },
  contact2: {
    ru: "<p>ул. Маршала Жукова</p><p>График работы:</p><p>ПН-ВС Круглосуточно</p><p>+380677595191</p>",
    en: "<p>st. Marshal Zhukov</p><p>Working hours:</p><p>Mon-Sun 24/7</p><p>+380677595191</p>",
    ua: "<p>вул. Маршала Жукова</p><p>Графік роботи:</p><p>ПН-ВС Цілодобово</p><p>+380677595191</p>",
  },
  // Форма обратной связи 2
  callformbtn2: {
    ru: "Заказать звонок",
    en: "Request a call",
    ua: "Замовити дзвінок",
  },
  "callform2-2": {
    ru: "Имя",
    en: "Name",
    ua: "Ім'я",
  },
  "callform2-3": {
    ru: "Номер телефона",
    en: "Phone number",
    ua: "Номер телефону",
  },
  "callform2-4": {
    ru: "Комментарий (Необязательно)",
    en: "Comment (Optional)",
    ua: "Коментар (Необов'язково)",
  },
  //   Ответы на вопросы
  question1: {
    ru: "Зачем мне обращаться к риэлтору при продаже квартиры?",
    en: "Why should I contact a realtor when selling an apartment?",
    ua: "Навіщо мені звертатися до ріелтора під час продажу квартири?",
  },
  question2: {
    ru: "На что обратить внимание при покупке квартиры?",
    en: "What to look for when buying an apartment?",
    ua: "На що звернути увагу під час купівлі квартири?",
  },
  question3: {
    ru: "Какие у меня будут расходы при продаже недвижимости?",
    en: "What will my costs be when selling a property?",
    ua: "Які в мене будуть витрати на продаж нерухомості?",
  },
  question4: {
    ru: "Основные этапы купли-продажи недвижимости",
    en: "The main stages of the purchase and sale of real estate",
    ua: "Основні етапи купівлі-продажу нерухомості",
  },
  question5: {
    ru: "Как избежать рисков при продаже недвижимости?",
    en: "How to avoid risks when selling real estate?",
    ua: "Як уникнути ризиків під час продажу нерухомості?",
  },
  question6: {
    ru: "Чем вы рискуете, покупая недвижимость самостоятельно?",
    en: "What are your risks when buying property on your own?",
    ua: "Чим ви ризикуєте, купуючи нерухомість самостійно?",
  },
  answer1: {
    ru: "Сделка при участии профессионального риэлтора значительно безопаснее самостоятельного заключения договора. Помимо знаний, специалист обладает опытом – иногда подозрительные объекты видно сразу, благодаря тому, что в практике встречались аналогичные случаи.",
    en: "A deal with the participation of a professional realtor is much safer than concluding an agreement on your own. In addition to knowledge, a specialist has experience - sometimes suspicious objects are immediately visible, due to the fact that similar cases have occurred in practice.",
    ua: "Угода за участю професійного ріелтора значно безпечніша за самостійне укладання договору. Крім знань, фахівець має досвід – іноді підозрілі об'єкти видно відразу, завдяки тому, що на практиці траплялися аналогічні випадки.",
  },
  answer2: {
    ru: "Выбрав подходящую квартиру, изучите правоустанавливающие документы продавца, убедитесь в их подлинности. Договор купли-продажи, дарственная, решение суда и т.д. должны быть полностью корректны.",
    en: "Having chosen a suitable apartment, study the title documents of the seller, make sure they are authentic. Purchase and sale agreement, deed of gift, court decision, etc. must be completely correct.",
    ua: "Вибравши відповідну квартиру, вивчіть документи продавця, які встановлюють, переконайтеся в їх справжності. Договір купівлі-продажу, дарчого, рішення суду і т.д. мають бути повністю коректними.",
  },
  answer3: {
    ru: "Размер гонорара риэлтора при продаже недвижимости в Одессе оговаривается в начале сотрудничества, он является окончательным и не подлежит изменению. Гонорар может быть изменен по предварительному согласованию, если итоговый объем работ оказался на порядок больше, чем планируемый. Кроме того, продавец несет дополнительные расходы на оплату государственной пошлины, а также в частных случаях: если нужные документы отсутствуют на руках и их необходимо восстанавливать или запрашивать, если необходимо оформлять нотариальное согласие супруга, доверенности и так далее.",
    en: "The amount of the realtor's fee when selling real estate in Odessa is negotiated at the beginning of cooperation, it is final and cannot be changed. The fee can be changed by prior agreement if the final amount of work turned out to be an order of magnitude more than planned. In addition, the seller bears additional costs for paying the state fee, as well as in particular cases: if the necessary documents are not on hand and need to be restored or requested, if it is necessary to draw up a notarized consent of the spouse, powers of attorney, and so on.",
    ua: "Розмір гонорару ріелтора під час продажу нерухомості в Одесі обговорюється на початку співпраці, він є остаточним і не підлягає зміні. Гонорар може бути змінений за попереднім погодженням, якщо підсумковий обсяг робіт виявився на порядок більшим, ніж запланований. Крім того, продавець несе додаткові витрати на оплату державного мита, а також у окремих випадках: якщо потрібні документи відсутні на руках і їх необхідно відновлювати або вимагати, якщо необхідно оформлювати нотаріальну згоду чоловіка, довіреності тощо.",
  },
  answer4: {
    ru: "От объекта к объекту этапы могут несколько разниться, но последовательность всегда остается примерно следующей: Поиск объекта/покупателя, переговоры сторон Внесение задатка. Проверка юридической чистоты объекта. Подготовка сделки. Заключение сделки – подписание договора. Государственная регистрация права собственности покупателя. Исполнение условий сделки – передача объекта, его оплата и других, прописанных в договоре. Завершение сделки – подписание передаточного акта.",
    en: "From object to object, the stages may vary somewhat, but the sequence always remains approximately as follows: Search for an object / buyer, negotiations of the parties Making a deposit. Checking the legal purity of the object. Deal preparation. The conclusion of the transaction is the signing of the contract. State registration of the buyer's ownership. Fulfillment of the terms of the transaction - the transfer of the object, its payment and others prescribed in the contract. Completion of the transaction - signing the transfer deed.",
    ua: "Від об'єкта до об'єкта етапи можуть дещо відрізнятися, але послідовність завжди залишається приблизно наступною: Пошук об'єкта/покупця, переговори сторін Внесення задатку. Перевірка юридичної чистоти об'єкта. Підготовка угоди. Укладання угоди – підписання договору. Державна реєстрація права власності покупця. Виконання умов угоди – передача об'єкта, його оплата та інших, прописаних у договорі. Завершення угоди – підписання передавального акта.",
  },
  answer5: {
    ru: "Продавцы недвижимости подвержены риску мошенничества или возникновения ошибок чуть меньше, чем покупатели. Впрочем, не стоит расслабляться – внимательность необходима каждому. Постоянный мониторинг рынка, изучение предложений и спроса помогут назначить адекватную цену. Никому не хочется по незнанию продать недвижимость значительно дешевле рыночной цены, но и чересчур высокую назначать не стоит, если вы не готовы ждать «того самого» покупателя долгие месяцы. Проявите внимание к документам: одна маленькая ошибка может стать причиной больших проблем. Переделывать целый пакет документов сложнее, чем изначально все тщательно проверить.",
    en: "Real estate sellers are at slightly less risk of fraud or errors than buyers. However, do not relax - attention is necessary for everyone. Constant monitoring of the market, study of supply and demand will help to set an adequate price. No one wants to unknowingly sell real estate much cheaper than the market price, but you should not appoint too high if you are not ready to wait for the “same” buyer for many months. Pay attention to documents: one small mistake can cause big problems. It is more difficult to redo a whole package of documents than to carefully check everything from the very beginning.",
    ua: "Продавці нерухомості схильні до ризику шахрайства або виникнення помилок трохи менше, ніж покупці. Втім, не варто розслаблятися – уважність потрібна кожному. Постійний моніторинг ринку, вивчення пропозицій та попиту допоможуть призначити адекватну ціну. Нікому не хочеться за незнанням продати нерухомість значно дешевше за ринкову ціну, але й надто високу призначати не варто, якщо ви не готові чекати «того самого» покупця довгі місяці. Зверніть увагу до документів: одна маленька помилка може стати причиною великих проблем. Переробляти цілий пакет документів складніше, ніж спочатку ретельно перевірити.",
  },
  answer6: {
    ru: "Вариантов негативного развития события для покупателя по определению больше, чем для продавца. Риски, как правило, ограничены ценой выбранного объекта. Невнимательное изучение документов и недостаточная глубина юридической проверки могут оставить пространство для маневра мошенников. К примеру, если вы боитесь обидеть потенциального продавца приглашением в психоневрологический диспансер, это может обернуться фатальной ошибкой. Если после заключения сделки окажется, что продавец недееспособен – с огромной долей вероятности суд отменит сделку, и не факт, что покупателю вернется полная сумма. Кроме того, существует масса случаев с неожиданным появлением лиц, которые имеют права или претензии на объект недвижимости, который покупатель уже начал считать своим. Например, длительно отсутствующих родственников или супругов, с которыми собственник не поддерживает отношения, но документально развод не оформлен. Примеров мошенничества – масса, чтобы не стать жертвой, необходимо предельно внимательно изучать каждый документ.",
    en: "By definition, there are more options for a negative development of an event for a buyer than for a seller. Risks are usually limited to the price of the selected object. Inattentive study of documents and insufficient depth of due diligence can leave room for fraudsters to maneuver. For example, if you are afraid to offend a potential salesperson with an invitation to a psychoneurological dispensary, this can turn into a fatal mistake. If, after the conclusion of the transaction, it turns out that the seller is incompetent, it is very likely that the court will cancel the transaction, and it is not a fact that the full amount will be returned to the buyer. In addition, there are many cases with the unexpected appearance of persons who have rights or claims to a property that the buyer has already begun to consider his own. For example, long-term absent relatives or spouses with whom the owner does not maintain relations, but the divorce is not documented. There are a lot of examples of fraud, in order not to become a victim, it is necessary to carefully study each document.",
    ua: "Варіантів негативного розвитку події для покупця за визначенням більше, ніж для продавця. Ризики зазвичай обмежені ціною обраного об'єкта. Неуважне вивчення документів та недостатня глибина юридичної перевірки можуть залишити простір для маневру шахраїв. Наприклад, якщо ви боїтеся образити потенційного продавця запрошенням у психоневрологічний диспансер, це може призвести до фатальної помилки. Якщо після укладання угоди виявиться, що продавець є недієздатним – з величезною часткою ймовірності суд скасує угоду, і не факт, що покупцеві повернеться повна сума. Крім того, існує безліч випадків з несподіваною появою осіб, які мають права чи претензії на об'єкт нерухомості, який покупець уже почав вважати своїм. Наприклад, родичів або подружжя, з якими власник не підтримує відносини, але документально розлучення не оформлене. Приклади шахрайства – маса, щоб не стати жертвою, необхідно гранично уважно вивчати кожен документ.",
  },
  gamebtn: {
    ru: "Сыграть в мини-игру",
    en: "Play a mini game",
    ua: "Зіграти у міні-гру",
  },
  textgame:{
    ru: "Вы можете cыграть в нашу мини-игру в ожидании звонка менеджера. Для начала игры кликните в игровом поле.",
    en: "You can play our mini-game while waiting for the manager's call. To start the game, click in the playing field.",
    ua: "Ви можете зіграти в нашу міні-гру, чекаючи дзвінка менеджера. Для початку гри клацніть в ігровому полі.",
  },
  score:{
    ru: "Пройдено: <span id='scoreSpan'></span> км.",
    en: "Traveled: <span id='scoreSpan'></span> km.",
    ua: "Пройдено: <span id='scoreSpan'></span> км.",
    },
  gameover: {
    ru: "Конец игры! Ваш счет: <span id='gameScore'></span>",
    en: "End of the game! Your score: <span id='gameScore'></span>",
    ua: "Кінець гри! Ваш рахунок: <span id='gameScore'></span>",
  },
  gemecontinue:{
    ru: "Продолжить",
    en: "Continue",
    ua: "Продовжити",
  },
  footerabout: {
    ru: "Об агенстве",
    en: "About agency",
    ua: "Про агенство",
  },
  footermain:{
    ru: "Главная",
    en: "Main",
    ua: "Головна",
  },
  footerpartners: {
    ru: "Наши партнеры",
    en: "Our partners",
    ua: "Наші партнери",
  },
  footerobject:{
    ru: "Наши актуальные объекти",
    en: "Our current objects",
    ua: "Наші актуальні об'єкти",
  },
  footercontact:{
    ru: "Связаться с нами",
    en: "Contact with us",
    ua: "Зв'язатися з нами",
  },
  innercontact1:{
    ru: "Контактные данные",
    en: "Contact details",
    ua: "Контактні дані",
  },
  innercontact2:{
    ru: "<p>Назаров Владимир Олегович</p><p>Собственник агенства недвижимости</p><p>Dolbaeb@grifon.ua</p><p>+380677595191</p><p>+380935374207</p>",
    en: "<p>Nazarov Vladimir Olegovich</p><p>Owner of a real estate agency</p><p>Dolbaeb@grifon.ua</p><p>+380677595191</p><p>+380935374207</p>",
    ua: "<p>Назаров Володимир Олегович</p><p>Власник агентства нерухомості</p><p>Dolbaeb@grifon.ua</p><p>+380677595191</p><p>+380935374207</p>",
  },

};

console.log("Hello");
select.addEventListener('change', changeURLLanguage);

// Перенаправление на url с указанным языком
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#ua';
        location.reload();
    }
    select.value = hash;
    
    document.querySelector('.lng-callform2').placeholder = langArr['callform2'][hash];
    document.querySelector(".lng-callform3").placeholder = langArr["callform3"][hash];
    document.querySelector(".lng-callform4").placeholder = langArr["callform4"][hash];
    document.querySelector('.lng-callform2-2').placeholder = langArr['callform2-2'][hash];
    document.querySelector(".lng-callform2-3").placeholder = langArr["callform2-3"][hash];
    document.querySelector(".lng-callform2-4").placeholder = langArr["callform2-4"][hash];
    document.querySelector(".lng-callformbtn2").value = langArr["callformbtn2"][hash];
    
    let except = document.querySelector(".lng-callform4");
    let except2 = document.querySelector(".lng-callform2-4");
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            if (elem != except && elem != except2) {
                elem.innerHTML = langArr[key][hash];
            } 
        }
    }
    console.log("Hello3");
}

changeLanguage();

