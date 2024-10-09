import App from './src/app.js';
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const app = new App(root);
    app.init();
});

// document.addEventListener('DOMContentLoaded', () => {
//     const lastScrollTop = 0;
//     const navMenu = document.querySelector('.nav-menu');
//     const hamburger = document.getElementById('hamburger');
//     const mobileMenu = document.getElementById('mobileMenu');

//     // Открытие/закрытие гамбургер-меню
//     hamburger.addEventListener('click', () => {
//         mobileMenu.classList.toggle('open');
//     });

//     // Скрытие меню при скролле вниз и показ при скролле вверх
//     window.addEventListener('scroll', () => {
//         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//         if (scrollTop > lastScrollTop) {
//             // Скролл вниз
//             navMenu.style.top = '-100px';
//         } else {
//             // Скролл вверх
//             navMenu.style.top = '0';
//         }
//         lastScrollTop = scrollTop;
//     });
// });
