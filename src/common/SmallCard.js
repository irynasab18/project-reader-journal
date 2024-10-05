import { STATUSES } from '../utils/dictionaries.js';

export default class SmallCard {
    constructor({ id, cover, title, author, type, options = {} }) {
        this.id = id;
        this.cover = cover;
        this.title = title;
        this.author = author;
        this.options = options
        this.type = type; //to render 1 of 3 card views
    }

    render(className = 'card') {
        if (this.type === 'search') {
            return this.constructSearchCard();
        }

        if (this.type === 'main') {
            return constructMainCard();
        }

        if (this.type === 'all') {
            return constructAllCard();
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
    </div>
    `;
    }

    constructMainCard() {
        let tags = null;
        let pages = null;

        if (this.options.tags && this.options.tags > 0) {
            tags = this.addTags();
        }

        if (this.options.readPages && this.options.allPages) {
            pages = this.addPages();
        }

        let moreBtn = this.addMoreBtn();

        return `
        <div class="book-card">
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
    }

    constructAllCard() {
        let tags = null;
        let pages = null;

        if (this.options.tags && this.options.tags > 0) {
            tags = this.addTags();
        }

        if (this.options.readPages && this.options.allPages) {
            pages = this.addPages();
        }

        let moreBtn = this.addMoreBtn();

        let statusInput = this.addStatusInput();

        return `
        <div class="book-card">
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
        // const bookTags = document.createElement('div');
        // bookTags.classList.add('book-tags');
        // this.options.tags.forEach(tag => {
        //     const tagElem = document.createElement('div');
        //     tagElem.classList.add('tag');
        //     tagElem.value = tag;
        //     bookTags.append(tagElem);
        // })

        // const bookDetails = document.querySelector('.book-details');
        // bookDetails.append(bookTags);

        let tagElems = this.options.tags.map(tag => {
            return `<div class="tag">${tag}</div>`
        });

        return `<div class="book-tags">
                    ${tagElems}
                </div>`;
    }

    addPages() {
        // const bookPages = document.createElement('p');
        // bookPages.classList.add('book-pages');

        // const readPages = document.createElement('span');
        // readPages.classList.add('pages-read');
        // readPages.value = this.options.readPages;

        // const separator = document.createElement('span');
        // separator.value = '/';

        // const allPages = document.createElement('span');
        // allPages.classList.add('pages-read');
        // allPages.value = this.options.allPages;

        // const readStr = document.createElement('span');
        // readStr.value = 'страниц прочитано';

        // bookPages.append(readPages);
        // bookPages.append(separator);
        // bookPages.append(allPages);
        // bookPages.append(readStr);

        // const bookDetails = document.querySelector('.book-details');
        // bookDetails.append(bookPages);

        return `<p class="book-pages">
        <span class="pages-read">${this.options.readPages}</span>
        <span>/</span>
        <span class="total-pages">${this.options.allPages}</span>
        <span>страниц прочитано</span>
    </p>;`
    }

    addMoreBtn() {
        // const moreBtnContainer = document.createElement('div');
        // moreBtnContainer.classList.add('book-more');

        // const moreBtn = document.createElement('a');
        // moreBtn.classList.add('menu-item');
        // moreBtn.href = '#';
        // moreBtn.value = 'Смотреть больше';
        // moreBtnContainer.append(moreBtn);

        // const bookDetails = document.querySelector('.book-info');
        // bookDetails.append(moreBtnContainer);

        return `<div class="book-more">
        <a href="#" class="menu-item">Смотреть больше</a>
    </div>`;
    }

    addStatusInput() {
        return `<div class="form-group book-status">
        <select id="status" class="form-select">
            <option>${STATUSES.NOT_STARTED}</option>
            <option>${STATUSES.IN_PROGRESS}</option>
            <option>${STATUSES.POSTPONED}</option>
            <option>${STATUSES.DISCARDED}</option>
            <option>${STATUSES.FINISHED}</option>
        </select>
    </div>`;
    }
}


/* <div class="book-card">
        <div class="book-cover">
            <img src="${this.cover}" alt="Обложка книги">
        </div>
        <div class="book-info">
            <div class="book-details">
                <h3 class="book-title">${this.title}</h3>
                <p class="book-author">${this.author}</p>

                <p class="book-pages">
                    <span class="pages-read">${this.options.readPages}</span>
                    <span>/</span>
                    <span class="total-pages">${this.options.allPages}</span>
                    <span>страниц прочитано</span>
                </p>

                <div class="book-tags">
                    <div class="tag">Фантастика</div>
                    <div class="tag">Приключения</div>
                </div>

            </div>
            <div class="book-more">
                <a href="#" class="menu-item">Смотреть больше</a>
            </div>
        </div>
    </div> */