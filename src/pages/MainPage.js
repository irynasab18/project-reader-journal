import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';

export default class MainPage extends Page {
    constructor() {
        super({
            id: 'main-page',
            content: `<div class="content-container">
            <div class="content-header">
                <h1 class="main-page-title">В процессе</h1>
                <button class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </button>
            </div>
    
            <div class="books-container"></div>`,
        });
    }

    render(state) {
        if (state) { //user has data to show
            //get IN_PROGRESS books
            const booksInProgress = 1;
            return `<div class="content-container">
            <div class="content-header">
                <h1 class="main-page-title">В процессе</h1>
                <button class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </button>
            </div>
    
            <div class="books-container">${booksInProgress}</div>`
        }

        return `<div class="content-container">
        <div class="content-header">
            <h1 class="main-page-title">В процессе</h1>
            <button class="add-book-btn">
                <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                Добавить книгу
            </button>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе "Читаю сейчас".</p>
        </div>
        </div>`;
    }


}