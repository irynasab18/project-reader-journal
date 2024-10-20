import { STATUSES } from '../utils/dictionaries.js';
import defaultCover from '../images/no-image.svg';
import { flattenCardObject } from '../utils/helpers.js'

export default class SmallCard {
    constructor(id = null, type, title, author, cover, options = {}) {
        this.id = id;
        this.cover = cover || defaultCover;
        this.title = title;
        this.author = author;
        this.options = options;
        this.type = type; //to render 1 of 3 card views
    }

    render(className = 'card') {
        if (this.type === 'search') {
            return this.constructSearchCard();
        }

        if (this.type === 'main') {
            return this.constructMainCard();
        }

        if (this.type === 'all') {
            return this.constructAllCard();
        }

    }

    constructSearchCard() {
        return `
        <div class="book-card">
        <div class="book-cover">
            <img src="${this.cover}" alt="Обложка книги">
        </div>
        <div class="book-info">
            <div class="book-details">
                <h3 class="book-title">${this.title}</h3>
                <p class="book-author">${this.author}</p>
            </div>
            <div class="book-more">
            <a class="menu-item">Добавить в список</a>
        </div>
        </div>
    </div>
    `;
    }

    constructMainCard() {
        let tags = '';
        let pages = '';

        if (this.options.tags && this.options.tags.length > 0) {
            tags = this.addTags();
        }

        if (this.options.readPages && this.options.allPages && this.options.readPages > 0 && this.options.allPages > 0) {
            pages = this.addPages();
        }

        let moreBtn = this.addMoreBtn();

        let res = `<div class="book-card" id=${this.id}>
        <div class="book-cover">
            <img src="${this.cover}" alt="Обложка книги">
        </div>
        <div class="book-info">
            <div class="book-details">
                <h3 class="book-title">${this.title}</h3>
                <p class="book-author">${this.author}</p>
                ${pages}
                ${tags}
            </div>
            ${moreBtn}
        </div>
    </div>
    `;

        return res;
    }

    constructAllCard() {
        let tags = '';
        let pages = '';

        if (this.options.tags && this.options.tags > 0) {
            tags = this.addTags();
        }

        if (this.options.readPages && this.options.allPages) {
            pages = this.addPages();
        }

        let moreBtn = this.addMoreBtn();

        let statusInput = this.addStatusInput();

        return `
        <div class="book-card" id=${this.id}>
        <div class="book-cover">
            <img src="${this.cover}" alt="Обложка книги">
        </div>
        <div class="book-info">
            <div class="book-details">
                <h3 class="book-title">${this.title}</h3>
                <p class="book-author">${this.author}</p>
                ${pages}
                ${tags}
                ${statusInput}
            </div>
            ${moreBtn}
        </div>
    </div>
    `;
    }

    addTags() {
        if (this.options && this.options.tags) {
            let tagElems = this.options.tags.map(tag => {
                return `<div class="tag">${tag.stringValue}</div>`
            });

            return `<div class="book-tags">
                        ${tagElems.join('')}
                    </div>`;
        }
        return '';
    }

    addPages() {
        if (this.options && this.options.readPages && this.options.pages) {
            return `<p class="book-pages">
            <span class="pages-read">${this.options.readPages}</span>
            <span>/</span>
            <span class="total-pages">${this.options.pages}</span>
            <span>страниц прочитано</span>
        </p>;`
        }
        return '';
    }

    addMoreBtn() {
        return `<div class="book-more">
        <a href="#" class="menu-item" id="view-book">Смотреть больше</a>
    </div>`;
    }

    addStatusInput() {
        let stats = [];
        let statuses = Object.values(STATUSES);

        for (let key in statuses) {
            if (statuses[key] !== this.options.status) {
                stats.push(`<option>${statuses[key]}</option>`);
            }
        };

        return `<div class="form-group book-status">
        <select id="status" class="form-select">
            ${stats.join('')}
            <option selected>${this.options.status}</option>
        </select>
    </div>`;
    }
}