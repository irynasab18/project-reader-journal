import Page from '../common/Page.js';
import { STATUSES, GENRES, TAGS, FORMATS } from '../utils/dictionaries.js';
import { addBook } from '../utils/data.js';
import { addOptsToList } from '../utils/helpers.js';

export default class AddBook extends Page {
    constructor() {
        super({
            id: 'addbook',
            content: `<div class="book-content-container">
            <h1 class="page-title">Добавление книги</h1>
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
                        <input type="text" id="author" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="pages" class="form-label">Количество страниц</label>
                        <input type="number" id="pages" class="form-input">
                    </div>
                    <div class="form-group">
                        <label for="status" class="form-label required">Статус</label>
                        <select id="status" class="form-select" required>
                            ${addOptsToList(STATUSES)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="format" class="form-label">Формат</label>
                        <select id="format" class="form-select">
                        ${addOptsToList(FORMATS)}
                        </select>
                    </div>
                </div>
                <div class="form-column">
                    <div class="form-group">
                        <label for="title" class="form-label required">Название книги</label>
                        <input type="text" id="title" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="genre" class="form-label required">Жанр</label>
                        <select id="genre" class="form-select" required>
                            ${addOptsToList(GENRES)}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="read-pages" class="form-label">Количество прочитанных страниц</label>
                        <input type="number" id="read-pages" class="form-input">
                    </div>
                    <div class="form-group">
                        <label for="expectations" class="form-label">Ожидания</label>
                        <input type="text" id="expectations" class="form-input">
                    </div>

                    <div class="form-group">
                        <label for="tags" class="form-label">Тэги</label>
                        <select id="tags" class="form-select" multiple size="1">
                            ${addOptsToList(TAGS)}
                        </select>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="btn btn-outline">Назад</button>
                        <button type="submit" class="btn btn-primary" disabled=true>Сохранить</button>
                    </div>
                </div>
            </form>
        </div>
        </div>`
        });

        this.bookTitle = null;
        this.author = null;
        this.cover = null;
        this.genre = null;
        this.pages = null;
        this.status = null;
        this.format = null;
        this.readPages = null;
        this.expectations = null;
        this.tags = null;
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        if (content) {
            content.addEventListener('click', event => this.callEventHandler(event));
            content.addEventListener('input', event => this.checkFields(event));
        }

        const fileInput = document.getElementById('cover-upload');
        if (fileInput) {
            fileInput.addEventListener('change', function (event) {
                this.uploadFile(event);
            });
        }
    }

    async callEventHandler(event) {
        event.preventDefault();
        if (event.target.id === 'cover-upload') {
            this.uploadFile(event);
        }
        if (event.target.className === 'remove-file-btn') {
            this.deleteUploadedFile(event.target);
        }
        if (event.target.className === 'btn btn-outline') {
            history.back();
        }
        if (event.target.type === 'submit') {
            await this.saveBook();
            history.back();
        }

    }

    uploadFile(event) {
        event.preventDefault();
        const fileName = event.target.files[0] ? event.target.files[0].name : 'Обложка книги';
        document.getElementById('file-name').textContent = fileName;

        if (event.target.files[0]) {
            document.getElementById('remove-file').style.display = 'inline-block';
        }
    };


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

        if (authorInput.value) {
            this.author = authorInput.value;
        }

        if (pagesInput.value) {
            this.pages = pagesInput.value;
        }

        if (statusInput.value) {
            this.status = statusInput.value;
        }

        if (formatInput.value) {
            this.format = formatInput.value;
        }

        if (titleInput.value) {
            this.bookTitle = titleInput.value;
        }

        if (genreInput.value) {
            this.genre = genreInput.value;
        }

        if (pagesReadInput.value) {
            this.readPages = pagesReadInput.value;
        }

        if (expectationsInput.value) {
            this.expectations = expectationsInput.value;
        }

        if (tagsInput && tagsInput.options) {
            this.tags = [];
            for (let opt of tagsInput.options) {
                if (opt.selected === true) {
                    this.tags.push(opt.innerText);
                }
            }
        }

        if (authorInput.value && titleInput.value && genreInput.value && statusInput.value) {
            document.querySelector('.btn-primary').disabled = false;
        } else {
            document.querySelector('.btn-primary').disabled = true;
        }
    }

    async saveBook() {
        let data = {
            userId: sessionStorage.getItem('userId'),
            title: this.bookTitle,
            author: this.author,
            cover: this.cover,
            status: this.status,
            genre: this.genre,
            pages: this.pages,
            format: this.format,
            readPages: this.readPages,
            expectations: this.expectations,
            tags: this.tags
        }
        let id = await addBook(data); //call DB utils
    }

}

