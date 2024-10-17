import Page from '../common/Page.js';
import { getBook, deleteBook, setBookGrade, addQuote, addNote, updateBookStatus } from '../utils/data.js';
import { STATUSES, GENRES, TAGS, FORMATS } from '../utils/dictionaries.js';
import defaultCover from '../images/no-image.svg';
import deleteIcon from '../images/icon-delete.svg';
import editIcon from '../images/icon-edit.svg';
import plusCircle from '../images/plus-circle.svg';
import arrowBack from '../images/arrow-left.svg';

export default class ViewBook extends Page {
    constructor(state) {
        super({
            id: 'viewbook'
        });
        this.bookId = null;
        this.bookData = null;
        this.viewBookForm = null;
    }

    render() {
        if (this.bookData && this.viewBookForm) {
            const container = document.querySelector('.book-info-container');
            if (container) {
                container.innerHTML = this.viewBookForm;
            }
        }

        return `<main class="container"><div class="book-content-container">
        <button class="back-button">
                        <img src=${arrowBack} alt="Назад" class="back-icon">
                        Вернуться назад
                    </button>
        <div class="book-info-container">Загружаем...</div>
        </div></div>`
    }

    async renderAsync() {
        this.bookId = sessionStorage.getItem('bookId');
        if (this.bookId) {
            let bookData = await this.getCurrentBook();

            if (bookData && bookData.title) {
                this.bookData = bookData;
                sessionStorage.setItem('bookData', JSON.stringify(this.bookData));

                let cover = bookData.cover ? bookData.cover : defaultCover;
                let status = this.addStatusInput();
                let bookPages = this.bookPages() ? this.bookPages() : '';
                let tags = this.getTags() ? this.getTags() : '';
                let format = this.bookData.format ? this.bookData.format : 'Не указан';
                let expectations = this.bookData.expectations ? this.bookData.expectations : '-';
                let quotes = this.drawQuotes();
                let notes = this.drawNotes();
                let grade = this.bookData.grade ? this.showCurrentGrade() : this.showNoGrade();

                this.viewBookForm = `
                            <div class="book-info-column-left">
                                <div class="book-cover-view">
                                    <img src="${cover}" alt="Обложка книги">
                                </div>
                                <div class="rating-stars">
                                    ${grade}
                                </div>
                            </div>
                            <div class="book-info-column-right">
                                <div class="book-title-wrapper">
                                    <h1 class="book-title">${bookData.title}</h1>
                                    <div class="icon-container">
                                        <div class="edit-icon-container">
                                            <img src="${editIcon}" alt="Редактировать" class="edit-icon">
                                        </div>
                                        <div class="delete-icon-container">
                                            <img src="${deleteIcon}" alt="Удалить" class="delete-icon">
                                        </div>
                                    </div>
                                </div>
                                <h3 class="book-author">${bookData.author}</h3>
                                ${bookPages}
                                ${tags}
                                <div class="form-group">
                                    ${status}
                                </div>
                                <div class="book-details">
                                    <div class="book-detail">
                                        <span class="detail-label">Жанр:</span>
                                        <span class="detail-value">${this.bookData.genre}</span>
                                    </div>
                                    <div class="book-detail">
                                        <span class="detail-label">Формат:</span>
                                        <span class="detail-value">${format}</span>
                                    </div>
                                    <div class="book-detail">
                                        <span class="detail-label">Ожидания:</span>
                                        <span class="detail-value">${expectations}</span>
                                    </div>
                                </div>
                                <h2 class="section-title">Цитаты</h2>
                                <div class="quote-container"> 
                                    ${quotes}
                                    <div class="quote-input-wrapper">
                                        <input type="text" class="quote-input" placeholder="Добавить цитату">
                                        <button class="add-quote-button">
                                            <img src="${plusCircle}" alt="Добавить">
                                        </button>
                                    </div>
                                </div>
                                <h2 class="section-title">Заметки</h2>
                                <div class="note-container">
                                    ${notes}
                                    <div class="note-input-wrapper">
                                        <input type="text" class="note-input" placeholder="Добавить заметку">
                                        <button class="add-note-button">
                                            <img src="${plusCircle}" alt="Добавить">
                                        </button>
                                    </div>
                                </div>
                            </div>`;
                this.render();
                this.addLaterListeners();
            }

            return `<div class="book-content-container">
                <button class="back-button">
                                <img src=${arrowBack} alt="Назад" class="back-icon">
                                Вернуться назад
                            </button>
                <div class="book-info-container">Что-то пошло не так :(</div>
                </div>`
        }
    }

    addEventListeners() {
        const content = document.querySelector('.book-content-container');
        if (content) {
            content.addEventListener('click', event => this.callEventHandler(event));
        }
    }

    addLaterListeners() {
        const stars = document.querySelector('.rating-stars');
        if (stars) {
            stars.addEventListener('click', event => this.setGrade(event));
        }

        const quoteBtn = document.querySelector('.add-quote-button');
        if (quoteBtn) {
            quoteBtn.addEventListener('click', event => this.addQuote(event));
        }

        const noteBtn = document.querySelector('.add-note-button');
        if (noteBtn) {
            noteBtn.addEventListener('click', event => this.addNote(event));
        }

        const statusSelect = document.querySelector('#status');
        if (statusSelect) {
            statusSelect.addEventListener('change', event => this.updateStatus(event));
        }
    }

    callEventHandler(event) {
        event.preventDefault();
        if (event.target.className === 'edit-icon') {
            window.location.hash = '#editbook';
        }
        if (event.target.className === 'delete-icon') {
            this.deleteBook();
        }
        if (event.target.className === 'back-button') {
            if (this.bookData.status !== 'В процессе') {
                window.location.hash = '#all';
            } else {
                window.location.hash = '#main';
            }
        }
    }

    async getCurrentBook() {
        return await getBook(this.bookId);
    }

    async setGrade(event) {
        event.preventDefault();
        let grade = event.target.dataset.value;

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.textContent = star.getAttribute('data-value') <= grade ? '★' : '☆'
        })

        await setBookGrade(this.bookId, grade);
    }

    async deleteBook() {
        if (this.bookId) {
            let result = confirm(`Вы действительно хотите удалить книгу "${this.bookData.title}"?`);
            if (result) {
                await deleteBook(this.bookId);
                history.back();
            }
        }
    }

    bookPages() {
        if (!this.bookData.pages) {
            return false;
        }
        if (this.bookData.pages && !this.bookData.readPages) {
            return `<p class="book-pages">${this.bookData.pages} страниц</p>`
        }
        if (this.bookData.pages && this.bookData.readPages) {
            return `<p class="book-pages">${this.bookData.readPages}
            из ${this.bookData.pages} страниц прочитано</p>`;
        }
        return false;
    }

    getTags() {
        if (!this.bookData.tags || this.bookData.tags.length === 0) {
            return false;
        }
        if (this.bookData.tags.length > 0) {
            let tagDivs = this.bookData.tags.map(tag => `<div class="tag">${tag}</div>`);
            return `<div class="book-tags">${tagDivs.join('')}</div>`
        }
        return false;
    }

    showSelectedValue(value) {
        return `<option selected>${value}</option>`
    }

    showCurrentGrade() {
        let stars = [];
        let empty = '☆';
        let filled = '★';
        for (let i = 1; i <= 5; i++) {
            if (i <= this.bookData.grade) {
                stars.push(`<span class="star" id="s${i}" data-value="${i}">${filled}</span>`)
            } else {
                stars.push(`<span class="star" id="s${i}" data-value="${i}">${empty}</span>`)
            }
        }
        return stars.join('');
    }

    showNoGrade() {
        return `
        <span class="star" id="s1" data-value="1">☆</span>
        <span class="star" id="s2" data-value="2">☆</span>
        <span class="star" id="s3" data-value="3">☆</span>
        <span class="star" id="s4" data-value="4">☆</span>
        <span class="star" id="s5" data-value="5">☆</span>
        `;
    }

    addStatusInput() {
        let stats = [];
        let statuses = Object.values(STATUSES);

        for (let key in statuses) {
            if (statuses[key] !== this.bookData.status) {
                stats.push(`<option>${statuses[key]}</option>`);
            }
        };

        return `<select id="status" class="form-select status-view">
            ${stats.join('')}
            <option selected>${this.bookData.status}</option>
        </select>`
    }

    async addQuote(event) {
        event.preventDefault();

        const quoteInput = document.querySelector('.quote-input');
        if (quoteInput && quoteInput.value) {
            await addQuote(this.bookId, quoteInput.value)
        }

        this.renderAsync();
    }

    async addNote(event) {
        event.preventDefault();

        const noteInput = document.querySelector('.note-input');
        if (noteInput && noteInput.value) {
            await addNote(this.bookId, noteInput.value)
        }

        this.renderAsync();
    }

    drawQuotes() {
        let quotes = [];
        if (this.bookData && this.bookData.quotes && this.bookData.quotes.length > 0) {
            this.bookData.quotes.forEach(q => {
                quotes.push(`<div class="quote-block"><p class="quote-text">${q}</p></div>`);
            })
            return `${quotes.join('')}`;
        }
        return '';
    }

    drawNotes() {
        let notes = [];
        if (this.bookData && this.bookData.notes && this.bookData.notes.length > 0) {
            this.bookData.notes.forEach(n => {
                notes.push(`<div class="note-block"><p class="note-text">${n}</p></div>`);
            })
            return `${notes.join('')}`;
        }
        return '';
    }

    async updateStatus(event) {
        event.preventDefault();
        let res = await updateBookStatus(this.bookId, event.target.value);
        console.log(res)
    }
}