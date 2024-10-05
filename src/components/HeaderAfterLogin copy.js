import Section from '../common/Section.js';

import logo from '../images/logo.svg';
import hamburger from '../images/hamburger-icon.svg';

export default class HeaderAfter extends Section {
    constructor(customClass = '') {
        super({ id: 'header', customClass });
    }

    //TODO: add username next to Exit
    render() {
        return `
    <header class="nav-menu sticky">
    <div class="logo">
        <img src="${logo}" alt="Логотип">
    </div>
    <nav class="menu" id="mobileMenu">
        <a href="#" class="menu-item">Читаю сейчас</a>
        <a href="#" class="menu-item">Все книги</a>
        <a href="#" class="menu-item">Поиск</a>
    </nav>
    <div class="auth-buttons">
        <button class="btn">Выход</button>
    </div>
    <div class="hamburger" id="hamburger">
        <img src="${hamburger}" alt="Меню">
    </div>
</header>
    `;
    }
}