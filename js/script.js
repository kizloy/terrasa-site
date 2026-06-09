// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});

// ===== БАЗА БЛЮД =====
const dishesData = {
    tartar: {
        title: 'Тартар из говядины',
        weight: '220 г',
        price: '1 200 ₽',
        img: 'img/menu/tartar.jpg',
        desc: 'Нежнейшая рубленая говядина с каперсами, дижонской горчицей и желтком перепелиного яйца. Подаётся с хрустящими гренками.',
        ingredients: ['Говяжья вырезка', 'Каперсы', 'Дижонская горчица', 'Желток перепелиного яйца', 'Лук-шалот', 'Оливковое масло', 'Гренки', 'Соль', 'Перец']
    },
    bruschetta: {
        title: 'Брускетта с томатами',
        weight: '180 г',
        price: '650 ₽',
        img: 'img/menu/bruschetta.jpg',
        desc: 'Хрустящий поджаренный хлеб с сочными томатами, базиликом и чесноком. Лёгкая классика итальянской кухни.',
        ingredients: ['Чиабатта', 'Томаты черри', 'Базилик', 'Чеснок', 'Оливковое масло', 'Бальзамический крем', 'Соль']
    },
    carpaccio: {
        title: 'Карпаччо из лосося',
        weight: '200 г',
        price: '1 100 ₽',
        img: 'img/menu/carpaccio.jpg',
        desc: 'Тончайшие слайсы свежего лосося с рукколой, лимоном и соусом из каперсов.',
        ingredients: ['Лосось охлаждённый', 'Руккола', 'Лимон', 'Каперсы', 'Оливковое масло', 'Пармезан', 'Соль', 'Перец']
    },
    shrimps: {
        title: 'Креветки в соусе',
        weight: '250 г',
        price: '890 ₽',
        img: 'img/menu/shrimps.jpg',
        desc: 'Тигровые креветки, обжаренные в сливочно-чесночном соусе с добавлением белого вина и зелени.',
        ingredients: ['Тигровые креветки', 'Сливочное масло', 'Чеснок', 'Белое вино', 'Петрушка', 'Лимонный сок', 'Соль', 'Перец чили']
    },
    julienne: {
        title: 'Жульен с грибами',
        weight: '200 г',
        price: '720 ₽',
        img: 'img/menu/julienne.jpg',
        desc: 'Классический жульен из белых грибов и шампиньонов в сливочном соусе под сырной корочкой.',
        ingredients: ['Шампиньоны', 'Белые грибы', 'Сливки 33%', 'Сыр моцарелла', 'Лук репчатый', 'Мускатный орех', 'Соль']
    },
    borsch: {
        title: 'Борщ с телятиной',
        weight: '350 мл',
        price: '580 ₽',
        img: 'img/menu/borsch.jpg',
        desc: 'Наваристый борщ на телячьем бульоне со свежими овощами и сметаной. Подаётся с салом и чесночными пампушками.',
        ingredients: ['Телятина на кости', 'Свёкла', 'Капуста', 'Картофель', 'Морковь', 'Лук', 'Томатная паста', 'Сметана', 'Сало', 'Чеснок']
    },
    tomyam: {
        title: 'Том Ям с креветками',
        weight: '400 мл',
        price: '750 ₽',
        img: 'img/menu/tomyam.jpg',
        desc: 'Острый тайский суп на кокосовом молоке с тигровыми креветками, грибами и лемонграссом.',
        ingredients: ['Тигровые креветки', 'Кокосовое молоко', 'Шампиньоны', 'Лемонграсс', 'Галангал', 'Листья лайма', 'Чили', 'Рыбный соус']
    },
    creamSoup: {
        title: 'Сливочный с грибами',
        weight: '300 мл',
        price: '520 ₽',
        img: 'img/menu/cream-soup.jpg',
        desc: 'Нежный крем-суп из белых грибов с трюфельным маслом и хрустящими гренками.',
        ingredients: ['Белые грибы', 'Сливки', 'Лук', 'Сливочное масло', 'Трюфельное масло', 'Гренки', 'Соль']
    },
    shashlik: {
        title: 'Шашлык из свинины',
        weight: '300 г',
        price: '950 ₽',
        img: 'img/menu/shashlik.jpg',
        desc: 'Сочный шашлык из свиной шейки, маринованной в гранатовом соусе с луком. Подаётся с лавашом и соусом.',
        ingredients: ['Свиная шейка', 'Гранатовый сок', 'Лук', 'Специи', 'Лаваш', 'Соус ткемали']
    },
    steak: {
        title: 'Стейк Рибай',
        weight: '350 г',
        price: '2 400 ₽',
        img: 'img/menu/steak.jpg',
        desc: 'Премиальный стейк из мраморной говядины, обжаренный до средней прожарки. Сочный, ароматный, с дымком.',
        ingredients: ['Мраморная говядина Рибай', 'Морская соль', 'Чёрный перец', 'Сливочное масло', 'Чеснок', 'Тимьян']
    },
    lula: {
        title: 'Люля-кебаб',
        weight: '280 г',
        price: '680 ₽',
        img: 'img/menu/lula.jpg',
        desc: 'Традиционный люля-кебаб из рубленой баранины с зеленью и специями на мангале.',
        ingredients: ['Баранина', 'Курдючный жир', 'Лук', 'Кинза', 'Зира', 'Соль', 'Перец']
    },
    lemonade: {
        title: 'Лимонад домашний',
        weight: '350 мл',
        price: '380 ₽',
        img: 'img/menu/lemonade.jpg',
        desc: 'Освежающий лимонад из свежих цитрусов с мятой и лёгкой газировкой.',
        ingredients: ['Лимон', 'Апельсин', 'Мята', 'Сахарный сироп', 'Газированная вода']
    },
    mors: {
        title: 'Морс клюквенный',
        weight: '400 мл',
        price: '320 ₽',
        img: 'img/menu/mors.jpg',
        desc: 'Домашний морс из северной клюквы с лёгкой кислинкой.',
        ingredients: ['Клюква', 'Сахар', 'Вода']
    }
};

// ===== МОДАЛЬНОЕ ОКНО =====
const modal = document.getElementById('dish-modal');
const modalImg = modal.querySelector('.modal-img');
const modalTitle = modal.querySelector('.modal-title');
const modalWeight = modal.querySelector('.modal-weight');
const modalPrice = modal.querySelector('.modal-price');
const modalDesc = modal.querySelector('.modal-desc');
const ingredientsList = modal.querySelector('.ingredients-list');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

function openDishModal(dishId) {
    const dish = dishesData[dishId];
    if (!dish) return;
    
    modalImg.src = dish.img;
    modalImg.alt = dish.title;
    modalTitle.textContent = dish.title;
    modalWeight.textContent = dish.weight;
    modalPrice.textContent = dish.price;
    modalDesc.textContent = dish.desc;
    
    ingredientsList.innerHTML = '';
    dish.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ingredientsList.appendChild(li);
    });
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeDishModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

modalClose.addEventListener('click', closeDishModal);
modalOverlay.addEventListener('click', closeDishModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDishModal();
});

// Вешаем клик на все карточки меню
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const dishId = this.getAttribute('data-dish');
        if (dishId) openDishModal(dishId);
    });
});

// ===== ФИЛЬТР МЕНЮ =====
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===== ОТПРАВКА В TELEGRAM =====
document.getElementById('booking-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const TOKEN = 'ТВОЙ_ТОКЕН';
    const CHAT_ID = 'ТВОЙ_CHAT_ID';
    
    const name = this.querySelector('[name="name"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const guests = this.querySelector('[name="guests"]').value;
    const date = this.querySelector('[name="date"]').value;
    const time = this.querySelector('[name="time"]').value;
    
    const message = '\uD83D\uDD14 *Новая бронь!*\n\n\uD83D\uDC64 Имя: ' + name + '\n\uD83D\uDCDE Телефон: ' + phone + '\n\uD83D\uDC65 Гостей: ' + guests + '\n\uD83D\uDCC5 Дата: ' + date + '\n\uD83D\uDD50 Время: ' + time;
    
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.disabled = true;
    
    try {
        const response = await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            btn.textContent = '✓ Заявка отправлена!';
            btn.style.background = '#4CAF50';
            this.reset();
        } else {
            throw new Error('Ответ не ok');
        }
    } catch (error) {
        btn.textContent = '❌ Ошибка';
        btn.style.background = '#e74c3c';
    }
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
});