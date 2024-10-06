import Page from '../common/Page.js';
import btnLike from '../images/add_like.svg';

export default class MainPage extends Page {
    constructor(state) {
        super({
            id: 'main-page'
        });
        this.state = state; //empty or not - ON LOGIN MAKE DB REQ FOR USER TO CHECK IF HE HAS BOOKS?
        this.render(state);
    }

    render(state) {
        if (state) { //user has data to show
            //get IN_PROGRESS books as SmallCard instances
            return `<div class="content-container">
            <div class="content-header">
                <h1 class="main-page-title">В процессе</h1>
                <button class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </button>
            </div>
    
            <div class="books-container">${this.getUserBooks()}</div>`
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
    getUserBooks() {
        let booksArray = getUserBooks('IN_PROGRESS');
        //put data into html via SmallCards instance?
    }

}