import Page from '../common/Page.js';


export default class Search extends Page {
    constructor() {
        super({
            id: 'main-page'
        });
        this.searchInput = null;
        this.searchBtn = null;
        this.searchStr = null;
        this.render();
        //this.addEventListeners();
    }

    render() {
        return `<div class="content-wrapper">
        <div class="content-header">
            <h1 class="main-page-title">Поиск</h1>
        </div>
        <div class="search-container">
            <button class="search-button">
                <img src="icon-search6.svg" alt="Поиск">
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
        content.addEventListener('click', event => this.callEventHandler(event));
        content.addEventListener('input', event => this.checkFields(event));
    }

    checkFields(event) {
        event.preventDefault();
        this.searchInput = document.querySelector('.search-input');

        if (searchInput.value) {
            this.searchStr = searchInput.value;
        }
    }

    callEventHandler(event) {
        event.preventDefault();

        if (event.target.className === 'search-button') {
            this.runSearch();
        }
    }

    async runSearch() {
        let result = await searchForBooks(this.searchStr);
        this.renderSearchResults(result);
    }

    renderSearchResults(res) {
        const wrapper = document.querySelector('.wrap-list');
        wrapper.innerHTML = '';

        if (res.length === 0) {
            this.rerenderPage(`<div class="placeholder-text">Ничего не найдено. 
            Попробуйте изменить критерий поиска</div>`)
        } else {
            //create card instances from SmallCard
            //create html with cards
            this.rerenderPage(/*list of rendered cards*/);
        }
    }

    rerenderPage(content) {
        const wrapper = document.querySelector('.wrap-list');
        wrapper.innerHTML = content;
    }


}