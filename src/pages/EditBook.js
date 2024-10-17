import Page from '../common/Page.js';
import { STATUSES, GENRES, TAGS, FORMATS } from '../utils/dictionaries.js';
import { updateBook } from '../utils/data.js';
import { addOptsToList } from '../utils/helpers.js';
import defaultCover from '../images/no-image.svg';

export default class EditBook extends Page {
    constructor() {
        super({
            id: 'editbook'
        });

        this.bookId = null;
        this.bookData = null;

        this.title = null;
        this.author = null;
        this.cover = null;
        this.genre = null;
        this.pages = null;
        this.status = null;
        this.format = null;
        this.readPages = null;
        this.expectations = null;
        this.tags = null;

        this.newBookData = null;
        this.newTitle = null;
        this.newAuthor = null;
        this.newCover = null;
        this.newGenre = null;
        this.newPages = null;
        this.newStatus = null;
        this.newFormat = null;
        this.newReadPages = null;
        this.newExpectations = null;
        this.newTags = null;
    }

    render() {
        if (this.bookData && this.editBookForm) {
            const container = document.querySelector('.container');
            container.innerHTML = this.editBookForm;
        }
        this.addEventListeners();
        return `<main class="container"><div class="book-content-container">
        <div class="book-info-container">Загружаем...</div>
        </div></div>`
    }

    async renderAsync() {
        this.bookId = sessionStorage.getItem('bookId');
        console.log('EDIT BOOK ID ', this.bookId)
        if (this.bookId) {
            let bookData = JSON.parse(sessionStorage.getItem('bookData')) || await this.getCurrentBook();
            console.log('EDIT BOOK DATA ', bookData)

            if (bookData && bookData.title) {
                this.bookData = bookData;
                this.setOldData();

                this.editBookForm = `<div class="book-content-container">
                <h1 class="page-title">Редактирование книги</h1>
                <form class="book-form">
                    <div class="form-column">
                        <div class="form-group file-upload">
                            <div class="file-name-wrapper">
                                <button type="button" id="remove-file" class="remove-file-btn"
                                    style="display: none;">X</button>
                                <span id="file-name" class="file-name">Обложка книги</span>
                            </div>
                            <input type="file" id="cover-upload" class="form-input-hidden">
                            <label for="cover-upload" class="btn-add-file btn-outline file-upload-btn">+ Добавить
                                обложку</label>
                        </div>
    
                        <div class="form-group">
                            <label for="author" class="form-label required">Автор</label>
                            <input type="text" id="author" class="form-input" value="${this.author}" required>
                        </div>
                        <div class="form-group">
                            <label for="pages" class="form-label">Количество страниц</label>
                            <input type="number" id="pages" class="form-input" value="${this.bookPages}">
                        </div>
                        <div class="form-group">
                            <label for="status" class="form-label required">Статус</label>
                            ${this.addStatusInput()}
                        </div>
                        <div class="form-group">
                            <label for="format" class="form-label">Формат</label>
                            ${this.addFormatInput()}
                        </div>
                    </div>
                    <div class="form-column">
                        <div class="form-group">
                            <label for="title" class="form-label required">Название книги</label>
                            <input type="text" id="title" class="form-input" value="${this.title}" required>
                        </div>
                        <div class="form-group">
                            <label for="genre" class="form-label required">Жанр</label>
                            ${this.addGenresInput()}
                        </div>
    
                        <div class="form-group">
                            <label for="read-pages" class="form-label">Количество прочитанных страниц</label>
                            <input type="number" id="read-pages" class="form-input" value="${this.readBookPages}">
                        </div>
                        <div class="form-group">
                            <label for="expectations" class="form-label">Ожидания</label>
                            <input type="text" id="expectations" class="form-input" value="${this.expectations}">
                        </div>
    
                        <div class="form-group">
                            <label for="tags" class="form-label">Тэги</label>
                            <select id="tags" class="form-select" multiple size="1">
                                ${addOptsToList(TAGS)}
                                ${this.tags}
                            </select>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="btn btn-outline">Назад</button>
                            <button type="submit" class="btn btn-primary" disabled=true>Сохранить</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>`;

                this.render();
                this.addEventListeners();
            }

            return `<div class="book-content-container">
                <div class="book-info-container">Что-то пошло не так :(</div>
                </div>`
        }
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        if (content) {
            content.addEventListener('click', event => this.callEventHandler(event));
            content.addEventListener('input', event => this.checkFields(event));
        }
    }

    async getCurrentBook() {
        return await getBook(this.bookId);
    }

    setOldData() {
        console.log('SET OLD DATA ', this.bookData)
        this.title = this.bookData.title;
        this.author = this.bookData.author;
        this.cover = this.bookData.cover ? this.bookData.cover : defaultCover;
        this.genre = this.bookData.genre;
        this.pages = this.bookData.pages ? this.bookData.pages : '';
        this.status = this.bookData.status;
        this.format = this.bookData.format ? this.bookData.format : '';
        this.readPages = this.bookData.readPages ? this.bookData.readPages : '';
        this.expectations = this.bookData.expectations ? this.bookData.expectations : '';
        this.tags = this.showSelectedValue(this.bookData.tags) ? this.showSelectedValue(this.bookData.tags) : '';
    }

    async callEventHandler(event) {
        console.log(event)
        event.preventDefault();
        if (event.target.className === 'btn-add-file btn-outline file-upload-btn') {

            this.uploadFile(event.target);
        }
        if (event.target.className === 'remove-file-btn') {
            this.deleteUploadedFile(event.target);
        }
        if (event.target.className === 'btn btn-outline') {
            window.location.hash = '#viewbook';
        }
        if (event.target.type === 'submit') {
            await this.updateBook();
            window.location.hash = '#viewbook';
        }

    }

    uploadFile(elem) {
        elem.addEventListener('change', event => {
            event.preventDefault();
            this.newFileName = this.files[0] ? this.files[0].name : 'Обложка книги';
            document.getElementById('file-name').textContent = fileName;

            if (this.files[0]) {
                document.getElementById('remove-file').style.display = 'inline-block';
            }
        });
    }

    deleteUploadedFile(elem) {
        elem.addEventListener('click', event => {
            event.preventDefault();
            const fileInput = document.getElementById('cover-upload');
            fileInput.value = '';
            document.getElementById('file-name').textContent = 'Обложка книги';
            this.style.display = 'none';
        })
    }

    checkFields(event) {
        event.preventDefault();

        const authorInput = document.querySelector('#author'); //madatory
        const pagesInput = document.querySelector('#pages');
        const statusInput = document.querySelector('#status'); //madatory
        const formatInput = document.querySelector('#format');
        const titleInput = document.querySelector('#title'); //madatory
        const genreInput = document.querySelector('#genre'); //madatory
        const pagesReadInput = document.querySelector('#read-pages');
        const expectationsInput = document.querySelector('#expectations');
        const tagsInput = document.querySelector('#tags');

        const imgElement = document.querySelector('.book-cover-view img') || null;
        if (imgElement) {
            this.newCover = imgElement.getAttribute('src') || this.cover;
        } else {
            this.newCover = this.cover;
        }

        if (authorInput.value) {
            this.newAuthor = authorInput.value;
        }

        if (pagesInput.value) {
            this.newPages = pagesInput.value;
        }

        if (statusInput.value) {
            this.newStatus = statusInput.value;
        }

        if (formatInput.value) {
            this.newFormat = formatInput.value;
        }

        if (titleInput.value) {
            this.newTitle = titleInput.value;
        }

        if (genreInput.value) {
            this.newGenre = genreInput.value;
        }

        if (pagesReadInput.value) {
            this.newReadPages = pagesReadInput.value;
        }

        if (expectationsInput.value) {
            this.newExpectations = expectationsInput.value;
        }

        if (tagsInput && tagsInput.options) {
            this.newTags = [];
            for (let opt of tagsInput.options) {
                if (opt.selected === true) {
                    this.newTags.push(opt.innerText)
                }
            }
        }

        if (authorInput.value && titleInput.value && genreInput.value && statusInput.value) {
            document.querySelector('.btn-primary').disabled = false;
        } else {
            document.querySelector('.btn-primary').disabled = true;
        }
    }

    async updateBook() {
        let data = {
            title: this.newTitle,
            author: this.newAuthor,
            cover: this.newCover,
            status: this.newStatus,
            genre: this.newGenre,
            pages: this.newPages,
            format: this.newFormat,
            readPages: this.newReadPages,
            expectations: this.newExpectations,
            tags: this.newTags
        }
        await updateBook(this.bookId, data); //call DB utils
    }

    showSelectedValue(value) {
        if (Array.isArray(value)) {
            let arr = value.map(v => `<option selected>${v}</option>`);
            return arr.join('');
        }
        return `<option selected>${value}</option>`;
    }

    addStatusInput() {
        let stats = [];
        let statuses = Object.values(STATUSES);

        for (let key in statuses) {
            if (statuses[key] !== this.status) {
                stats.push(`<option>${statuses[key]}</option>`);
            }
        };

        return `<select id="status" class="form-select" required>
            ${stats.join('')}
            <option selected>${this.status}</option>
        </select>`
    }

    addFormatInput() {
        let fors = [];
        let formats = Object.values(FORMATS);

        for (let key in formats) {
            if (formats[key] !== this.format) {
                fors.push(`<option>${formats[key]}</option>`);
            }
        };

        return `<select id="format" class="form-select">
            ${fors.join('')}
            <option selected>${this.format}</option>
        </select>`
    }

    addGenresInput() {
        let gers = [];
        let genres = Object.values(GENRES);

        for (let key in genres) {
            if (genres[key] !== this.genre) {
                gers.push(`<option>${genres[key]}</option>`);
            }
        };

        return `<select id="genre" class="form-select">
            ${gers.join('')}
            <option selected>${this.genre}</option>
        </select>`
    }
}

