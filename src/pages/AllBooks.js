import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks } from '../utils/data.js';

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

    render(state) {
        if (state) { //user has data to show
            const allBooks = this.getUserBooks();
            return `<div class="main-content-container">
            <div class="content-header">
                <h1 class="main-page-title">Мои книги</h1>
                <a href="#addbook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
            </div>
    
            <div class="books-container">${allBooks}</div>`
        }

        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Мои книги</h1>
            <a href="#addbook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе. Добавьте книгу через страницу поиска
        или кнопку "Добавить книгу".</p>
        </div>
        </div>`;
    }

    getUserBooks() {
        let booksArray = getUserBooks();
        //put data into html via SmallCards instance?
    }


}