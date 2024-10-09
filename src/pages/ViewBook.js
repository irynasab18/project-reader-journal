import Page from '../common/Page.js';
import { getBook, deleteBook } from '../utils/data.js';
import { STATUSES, GENRES, TAGS, FORMATS } from '../utils/dictionaries.js';
const cover = './src/images/frame-cover.png';
const deleteIcon = './src/images/icon-delete.svg';
const editIcon = './src/images/icon-edit.svg';
const plusCircle = './src/images/plus-circle.svg';

export default class ViewBook extends Page {
    constructor(id) {
        super({
            id: 'viewbook'
        });
        this.id = id; //ID to fetch book

        this.getCurrentBook();
        this.addEventListeners();
    }

    render() {
        return `<div class="book-content-container">
        <button class="back-button">
            <img src="arrow-left.svg" alt="Назад" class="back-icon">
            Вернуться назад
        </button>

        <div class="book-info-container">
            <div class="book-info-column-left">
                <!-- Обложка книги -->
                <div class="book-cover">
                    <img src="${cover}" alt="Обложка книги">
                </div>

                <div class="rating-stars">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>

            <div class="book-info-column-right">
                <div class="book-title-wrapper">
                    <h1 class="book-title">Название книги</h1>
                    <div class="icon-container">
                        <div class="edit-icon-container">
                            <img src="${editIcon}" alt="Редактировать" class="edit-icon">
                        </div> <!-- Иконка редактирования -->
                        <div class="delete-icon-container">
                            <img src="${deleteIcon}" alt="Удалить" class="delete-icon">
                        </div> <!-- Иконка удаления -->
                    </div>
                </div>

                <h3 class="book-author">Автор книги</h3>
                <p class="book-pages">145 / 468 страниц прочитано</p>

                <div class="book-tags">
                    <div class="tag">фантастика</div>
                    <div class="tag">приключения</div>
                </div>

                <div class="form-group">
                    <label for="status" class="form-label">Статус</label>
                    <select id="status" class="form-select">
                        ${this.addOptsToList(STATUSES)}
                        ${this.showSelectedValue(this.status)}
                    </select>
                </div>

                <div class="book-details">
                    <div class="book-detail">
                        <span class="detail-label">Жанр:</span>
                        <span class="detail-value">Фантастика</span>
                    </div>
                    <div class="book-detail">
                        <span class="detail-label">Формат:</span>
                        <span class="detail-value">Электронная</span>
                    </div>
                    <div class="book-detail">
                        <span class="detail-label">Ожидания:</span>
                        <span class="detail-value">Очень интересно, ожидание высокое.</span>
                    </div>
                </div>

                <h2 class="section-title">Цитаты</h2>
                <div class="quote-container">
                    <div class="quote-block">
                        <p class="quote-text">"Это была самая удивительная история."</p>
                    </div>
                    <div class="quote-block">
                        <p class="quote-text">"В конце концов, мы всегда находим то, что искали."</p>
                    </div>
                    <div class="quote-input-wrapper">
                        <input type="text" class="quote-input" placeholder="Добавить цитату">
                        <button class="add-quote-button">
                            <img src="${plusCircle}" alt="Добавить">
                        </button>
                    </div>
                </div>

                <!-- Блок заметок -->
                <h2 class="section-title">Заметки</h2>
                <div class="note-container">
                    <div class="note-block">
                        <p class="note-text">Не забыть перечитать первую главу перед финалом.</p>
                    </div>
                    <div class="note-input-wrapper">
                        <input type="text" class="note-input" placeholder="Добавить заметку">
                        <button class="add-note-button">
                            <img src="${plusCircle}" alt="Добавить">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        content.addEventListener('click', event => this.callEventHandler(event));
    }

    callEventHandler(event) {
        event.preventDefault();
        if (event.target.className === 'edit-icon') {
            //open update book page
        }
        if (event.target.className === 'delete-icon') {
            this.deleteBook();
        }
        if (event.target.className === 'back-icon') {
            //open previous page
        }
        if (event.target.className === 'star') {
            this.setGrade();
            //update book in DB
        }
    }

    async getCurrentBook() {
        let book = await getBook(this.id); //call DB utils with book ID?
        console.log(book)
    }

    setGrade() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                stars.forEach(s => s.textContent = s.getAttribute('data-value') <= value ? '★' : '☆');
            });
        });
    }

    deleteBook() {
        deleteBook(this.id); //call DB method with kinda ID???
    }

}