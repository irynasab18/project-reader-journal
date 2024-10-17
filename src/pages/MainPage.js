import { waitForPendingWrites } from 'firebase/firestore';
import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks } from '../utils/data.js';
import { normalizeBookCards, drawBookCards } from '../utils/helpers.js';

export default class MainPage extends Page {
    constructor(state) {
        super({
            id: 'main'
        });
        this.foundData = null;
    }

    render(dataReceived = false) {
        if (dataReceived && this.foundData) {
            const bookContainer = document.querySelector('.books-container');
            if (bookContainer) {
                bookContainer.innerHTML = this.foundData;
            } else {
                window.location.hash = '#main';
            }
        }
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

    addEventListeners() {
        const bookContainer = document.querySelector('.books-container');
        bookContainer.addEventListener('click', event => this.callEventHandler(event));

    }

    callEventHandler(event) {
        event.preventDefault();
        if (event.target.id === 'view-book') {
            event.preventDefault();
            sessionStorage.setItem('bookId', event.target.parentNode.parentNode.parentNode.id);
            window.location.hash = '#viewbook';
        }
    }

    async renderAsync() {
        let booksHtml;
        let bookCards = await getUserBooks(sessionStorage.getItem('userId'), 'В процессе');

        if (bookCards && bookCards.length > 0) {
            let bookObjects = normalizeBookCards(bookCards, 'main');
            booksHtml = drawBookCards(bookObjects);

            return this.drawFullPageWithCards(booksHtml);
        }
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
        this.foundData = cards.join('');;
        this.render(true);
    }

}