import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks } from '../utils/data.js';
import { normalizeBookCards, drawBookCards } from '../utils/helpers.js';

export default class AllBooks extends Page {
    constructor() {
        super({
            id: 'all',
            content: `<div class="main-content-container">
            <div class="content-header">
                <h1 class="main-page-title">Мои книги</h1>
                <a href="#addbook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
            </div>
    
            <div class="books-container"></div>`,
        });
    }

    render() {
        return this.renderInit();
        this.renderAsync();
    }

    renderInit() {
        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Мои книги</h1>
            <a href="#addbook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`
    }

    async renderAsync() {
        let booksHtml;
        let bookCards = await getUserBooks(sessionStorage.getItem('userId'));

        if (bookCards && bookCards.length > 0) {
            let bookObjects = normalizeBookCards(bookCards, 'main');
            booksHtml = drawBookCards(bookObjects);

            return this.drawFullPageWithCards(booksHtml);
        }

        return `<div class="main-content-container">
            <div class="content-header">
                <h1 class="main-page-title">Мои книги</h1>
                <a href="#addbook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
            </div>
    
            <div class="books-container">${allBooks}</div>`;
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе. Добавьте книгу через страницу поиска
        или кнопку "Добавить книгу".</p>
        </div>
        </div>`;
    }

    async getUserBooks(userId, status) {
        let booksArray = await getUserBooks(userId, status);
        if (booksArray && booksArray.length) {
            return booksArray;
        }
        this.bookCards = null;
    }

    drawFullPageWithCards(cards) {
        let content = cards.join();
        console.log('CONTENT ', content)
        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Читаю сейчас</h1>
            <a href="#addbook" id="add-book-btn" class="add-book-btn">
                <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                Добавить книгу
            </a>
        </div>
        <div class="books-container">${content}</div>`;
    }


}