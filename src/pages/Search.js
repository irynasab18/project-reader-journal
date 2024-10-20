import Page from '../common/Page.js';
import searchIcon from '../images/icon-search.svg';
import { performSearch } from '../utils/search.js';
import { drawFoundBookCards } from '../utils/helpers.js';
import { addBook } from '../utils/data.js';

export default class Search extends Page {
    constructor() {
        super({
            id: 'search'
        });
        this.searchInput = null;
        this.searchBtn = null;
        this.searchStr = '';
        this.title;
        this.author;
        this.cover;
    }

    render() {
        return `<div class="content-wrapper">
        <div class="content-header">
            <h1 class="main-page-title">Поиск</h1>
        </div>
        <div class="search-container">
            <button class="search-button">
                <img src="${searchIcon}" alt="Поиск" class="search-btn">
            </button>
            <input type="text" class="search-input" placeholder="Что будем искать?">
        </div>
        <div class="wrap-list">
            <div class="placeholder-text">Для поиска книги введите название, ISBN
                или автора книги в текстовое поле выше.</div>
        </div>
    </div>`
    }

    addEventListeners() {
        const content = document.querySelector('.search-container');
        if (content) {
            content.addEventListener('click', event => this.callEventHandler(event));
            content.addEventListener('input', event => this.checkFields(event));
        }
    }

    checkFields(event) {
        event.preventDefault();
        this.searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-button')

        if (this.searchInput.value && this.searchInput.value.length > 2) {
            this.searchStr = this.searchInput.value;
        }
    }

    async callEventHandler(event) {
        event.preventDefault();

        if (event.target.className === 'search-btn') {
            await this.runSearch();
        }
    }

    async runSearch() {
        let result = await performSearch(this.searchStr);
        this.renderSearchResults(result);
    }

    renderSearchResults(res) {
        const wrapper = document.querySelector('.wrap-list');
        wrapper.innerHTML = '';

        if (res.length === 0) {
            this.rerenderPage(`<div class="placeholder-text">Ничего не найдено. 
            Попробуйте изменить критерий поиска</div>`)
        } else {
            let booksHtml = drawFoundBookCards(res);
            this.rerenderPage(booksHtml.join(''));
        }
    }

    rerenderPage(content) {
        const wrapper = document.querySelector('.wrap-list');
        wrapper.innerHTML = content;

        wrapper.addEventListener('click', event => this.addBookToList(event));
    }

    async addBookToList(event) {
        event.preventDefault();

        let bookCard = event.target.parentNode.parentNode.parentNode;
        let title = bookCard.querySelector('.book-title').textContent;
        let author = bookCard.querySelector('.book-author').textContent;
        let cover = bookCard.querySelector('img').src;

        let data = {
            title,
            author,
            cover
        };

        const btn = bookCard.querySelector('.menu-item');
        btn.innerHTML = 'Добавлено!';
        btn.style.cursor = 'default';
        btn.style.textDecorator = 'none';
        const wrapper = document.querySelector('.wrap-list');
        wrapper.removeEventListener('click', this.addBookToList);

        await this.saveBook(data);
    }

    async saveBook(initData) {
        let data = {
            userId: sessionStorage.getItem('userId'),
            title: initData.title,
            author: initData.author,
            cover: initData.cover,
            status: 'Не начато',
            genre: 'Не указан',
            pages: null,
            format: null,
            readPages: null,
            expectations: null,
            tags: []
        }
        await addBook(data);
    }


}