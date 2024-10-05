import Page from '../common/Page.js';
import { STATUSES } from '../utils/dictionaries.js';
import { GENRES } from '../utils/dictionaries.js';
import { TAGS } from '../utils/dictionaries.js';
import { FORMATS } from '../utils/dictionaries.js';

export default class AddBook extends Page {
    constructor() {
        super({
            id: 'add-book',
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
                            <option>${STATUSES.NOT_STARTED}</option>
                            <option>${STATUSES.IN_PROGRESS}</option>
                            <option>${STATUSES.POSTPONED}</option>
                            <option>${STATUSES.DISCARDED}</option>
                            <option>${STATUSES.FINISHED}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="format" class="form-label">Формат</label>
                        <select id="format" class="form-select">
                            <option>${FORMATS.PAPERBOOK}</option>
                            <option>${FORMATS.EBOOK}</option>
                            <option>${FORMATS.AUDIOBOOK}</option>
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
                            <option>${GENRES.FANTASY}</option>
                            <option>${GENRES.SCIENCE_FICTION}</option>
                            <option>${GENRES.MAGICAL_REALISM}</option>
                            <option>${GENRES.DYSTOPIAN}</option>
                            <option>${GENRES.MYSTERY}</option>
                            <option>${GENRES.HORROR}</option>
                            <option>${GENRES.THRILLER}</option>
                            <option>${GENRES.HISTORICAL_FICTION}</option>
                            <option>${GENRES.ROMANCE}</option>
                            <option>${GENRES.CONTEMPORARY}</option>
                            <option>${GENRES.SHORT_STORY}</option>
                            <option>${GENRES.AUTOBIOGRAPHY}</option>
                            <option>${GENRES.BIOGRAPHY}</option>
                            <option>${GENRES.ART}</option>
                            <option>${GENRES.POPULAR_PSYCOLOGY}</option>
                            <option>${GENRES.HISTORY}</option>
                            <option>${GENRES.TRAVEL}</option>
                            <option>${GENRES.TRUE_CRIME}</option>
                            <option>${GENRES.HUMOR}</option>
                            <option>${GENRES.POPULAR_SCIENCE}</option>
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
                        <select id="tags" class="form-select">
                            <option>${TAGS.FUNNY}</option>
                            <option>${TAGS.SAD}</option>
                            <option>${TAGS.SLOW}</option>
                            <option>${TAGS.FAST}</option>
                            <option>${TAGS.AUTUMN}</option>
                            <option>${TAGS.SUMMER}</option>
                            <option>${TAGS.WINTER}</option>
                            <option>${TAGS.SPRING}</option>
                            <option>${TAGS.EMOTIONAL}</option>
                            <option>${TAGS.RELAXING}</option>
                            <option>${TAGS.HOPEFUL}</option>
                            <option>${TAGS.MYSTERIOUS}</option>
                            <option>${TAGS.DARK}</option>
                            <option>${TAGS.TOUCHING}</option>
                            <option>${TAGS.REALISTIC}</option>
                        </select>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="btn btn-outline">Назад</button>
                        <button type="submit" class="btn btn-primary" disabled>Сохранить</button>
                    </div>
                </div>
            </form>
        </div>
        </div>`
        });

        this.addEventListeners();
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        content.addEventListener('click', event => this.callEventHandler(event));
    }

    callEventHandler(event) {
        event.preventDefault();
        if (event.target.className === 'btn-add-file') {
            this.uploadFile(event.target);
        }
        if (event.target.className === 'remove-file') {
            this.deleteUploadedFile(event.target);
        }
    }

    uploadFile(elem) {
        elem.addEventListener('change', event => {
            event.preventDefault();
            const fileName = this.files[0] ? this.files[0].name : 'Обложка книги';
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
            fileInput.value = ''; // Сбрасываем значение поля
            document.getElementById('file-name').textContent = 'Обложка книги'; // Возвращаем текст по умолчанию
            this.style.display = 'none'; // Скрываем кнопку удаления
        })
    }

}