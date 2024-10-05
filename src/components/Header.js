import Section from '../common/Section.js';

import logo from '../images/logo.svg';
import hamburger from '../images/hamburger-icon.svg';

export default class Header extends Section {
    constructor(customClass = '') {
        super({ id: 'header', customClass });
    }

    render(loggedIn = false) {
        if (loggedIn) {
            return `<header class="nav-menu sticky">
            <div class="logo">
                <img src="${logo}" alt="Логотип">
            </div>
            <nav class="menu" id="mobileMenu">
                <a href="#" class="menu-item">Читаю сейчас</a>
                <a href="#" class="menu-item">Все книги</a>
                <a href="#" class="menu-item">Поиск</a>
            </nav>
            <div class="auth-buttons">
                <button class="auth-btn">Выход</button>
            </div>
            <div class="hamburger" id="hamburger">
                <img src="${hamburger}" alt="Меню">
            </div>
        </header>`
        }
        return `
    <header class="nav-menu sticky">
    <div class="logo">
        <img src="${logo}" alt="Логотип">
    </div>
    <div class="auth-buttons">
        <button id="signup-btn" class="auth-btn" href="#signup">Регистрация</button>
        <button id="signin-btn" class="auth-btn" href="#signin">Вход</button>
    </div>
    <div class="hamburger" id="hamburger">
        <img src="${hamburger}" alt="Меню">
    </div>
</header>
    `;
    }
}