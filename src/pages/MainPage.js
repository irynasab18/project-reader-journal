import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks } from '../utils/data.js';
import { normalizeBookCards, drawBookCards } from '../utils/helpers.js';

export default class MainPage extends Page {
    constructor(state) {
        super({
            id: 'main'
        });
    }

    render() {
        return this.renderInit();
        this.renderAsync();
    }

    renderInit() {
        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Читаю сейчас</h1>
            <a href="#addBook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    async renderAsync() {
        let booksHtml;
        let bookCards = await getUserBooks(sessionStorage.getItem('userId'), 'В процессе');

        if (bookCards && bookCards.length > 0) {
            let bookObjects = normalizeBookCards(bookCards, 'main');
            booksHtml = drawBookCards(bookObjects);

            return this.drawFullPageWithCards(booksHtml);
        }

        // return `<div class="main-content-container">
        // <div class="content-header">
        //     <h1 class="main-page-title">Читаю сейчас</h1>
        //     <a href="#addBook" id="add-book-btn" class="add-book-btn">
        //             <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
        //             Добавить книгу
        //         </a>
        // </div>
        // <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе "Читаю сейчас".</p>
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