// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerHeight = document.querySelector('header').offsetHeight;
        
        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});

// ===== ФИЛЬТР МЕНЮ =====
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Снимаем active со всех кнопок
        tabBtns.forEach(b => b.classList.remove('active'));
        // Даём active нажатой
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
    
    const TOKEN = '8639639473:AAEib3CuDx-a50VBNLh8nl8LXruRleCEk9w';
    const CHAT_ID = '759171746';
    
    const name = this.querySelector('[name="name"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const guests = this.querySelector('[name="guests"]').value;
    const date = this.querySelector('[name="date"]').value;
    const time = this.querySelector('[name="time"]').value;
    
    const message = `🔔 *Новая бронь!*\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n👥 Гостей: ${guests}\n📅 Дата: ${date}\n🕐 Время: ${time}`;
    
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Отправка...';
    btn.disabled = true;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
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
        console.error('Ошибка отправки:', error);
    }
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
});
