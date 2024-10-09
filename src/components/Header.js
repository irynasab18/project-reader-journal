import Section from '../common/Section.js';

import logo from '../images/logo.svg';
import hamburger from '../images/hamburger-icon.svg';

export default class Header extends Section {
    constructor(customClass = '') {
        super({ id: 'header', customClass });
    }

    render(loggedIn = false) {
        //if (loggedIn) {
        return `<header class="nav-menu sticky">
            <div class="logo">
                <img src="${logo}" alt="Логотип">
            </div>
            <nav class="menu hidden" id="mobileMenu">
                <a href="#main" class="menu-item">Читаю сейчас</a>
                <a href="#all" class="menu-item">Все книги</a>
                <a href="#search" class="menu-item">Поиск</a>
            </nav>
            <div class="auth-buttons">
                <a href="#start" id="logout-btn" class="auth-btn hidden">Выход</a>
                <a href="#signup" id="signup-btn" class="auth-btn">Регистрация</a>
                <a href="#signin" id="signin-btn" class="auth-btn">Вход</a>
            </div>
            <div class="hamburger" id="hamburger">
                <img src="${hamburger}" alt="Меню">
            </div>
        </header>`;
    }
}


//             return `<header class="nav-menu sticky">
//             <div class="logo">
//                 <img src="${logo}" alt="Логотип">
//             </div>
//             <nav class="menu" id="mobileMenu">
//                 <a href="#inprocess" class="menu-item">Читаю сейчас</a>
//                 <a href="#all" class="menu-item">Все книги</a>
//                 <a href="#search" class="menu-item">Поиск</a>
//             </nav>
//             <div class="auth-buttons">
//                 <button class="auth-btn">Выход</button>
//             </div>
//             <div class="hamburger" id="hamburger">
//                 <img src="${hamburger}" alt="Меню">
//             </div>
//         </header>`
//         }
//         return `
//     <header class="nav-menu sticky">
//     <div class="logo">
//         <img src="${logo}" alt="Логотип">
//     </div>
//     <div class="auth-buttons">
//         <button id="signup-btn" class="auth-btn" href="#signup">Регистрация</button>
//         <button id="signin-btn" class="auth-btn" href="#signin">Вход</button>
//     </div>
//     <div class="hamburger" id="hamburger">
//         <img src="${hamburger}" alt="Меню">
//     </div>
// </header>
//     `;
//    }
//}