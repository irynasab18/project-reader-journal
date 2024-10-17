import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks, updateBookStatus } from '../utils/data.js';
import { normalizeBookCards, drawBookCards } from '../utils/helpers.js';

export default class AllBooks extends Page {
    constructor() {
        super({
            id: 'all'
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
            <h1 class="main-page-title">Все книги</h1>
            <a href="#addBook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    async renderAsync() {
        let booksHtml;
        let bookCards = await getUserBooks(sessionStorage.getItem('userId'));

        if (bookCards && bookCards.length > 0) {
            let bookObjects = normalizeBookCards(bookCards, 'all');
            booksHtml = drawBookCards(bookObjects);

            return this.drawFullPageWithCards(booksHtml);
        }
    }

    addEventListeners() {
        const bookContainer = document.querySelector('.books-container');
        if (bookContainer) {
            bookContainer.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.target.id === 'view-book') {
                    sessionStorage.setItem('bookId', event.target.parentNode.parentNode.parentNode.id);
                    window.location.hash = '#viewbook';
                }
            })

            bookContainer.addEventListener('change', (event) => {
                event.preventDefault();
                if (event.target.className === 'form-select') {
                    this.updateStatus(event);
                }
            });
        }
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе. Добавьте книгу через страницу поиска
        или кнопку "Добавить книгу".</p>
        </div>
        </div>`;
    }

    async getUserBooks(userId) {
        let booksArray = await getUserBooks(userId);
        if (booksArray && booksArray.length) {
            return booksArray;
        }
        this.bookCards = null;
    }

    drawFullPageWithCards(cards) {
        this.foundData = cards.join('');;
        this.render(true);
    }

    async updateStatus(event) {
        event.preventDefault();
        const bookId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        let res = await updateBookStatus(bookId, event.target.value);
        console.log(res)
    }
}