import { connectFirestoreEmulator } from 'firebase/firestore';
import Page from '../common/Page.js';
import SmallCard from '../common/SmallCard.js';
import btnLike from '../images/add_like.svg';
import { getUserBooks } from '../utils/data.js';

export default class MainPage extends Page {
    constructor(state) {
        super({
            id: 'main'
        });
    }

    render() {
        console.log('render')
        return this.renderInit();
        this.renderAsync();
    }

    renderInit() {
        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Читаю сейчас</h1>
            <a href="#addBook" id="add-book-btn" class="add-book-btn">
                    <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                    Добавить книгу
                </a>
        </div>

        <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    async renderAsync() {
        let booksHtml;
        let bookCards = await getUserBooks(sessionStorage.getItem('userId'), 'В процессе');

        if (bookCards && bookCards.length > 0) {
            let bookObjects = this.normalizeBookCards(bookCards);
            booksHtml = this.drawBookCards(bookObjects);
            console.log(booksHtml)

            return this.drawFullPageWithCards(booksHtml);
        }

        // return `<div class="main-content-container">
        // <div class="content-header">
        //     <h1 class="main-page-title">Читаю сейчас</h1>
        //     <a href="#addBook" id="add-book-btn" class="add-book-btn">
        //             <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
        //             Добавить книгу
        //         </a>
        // </div>
        // <div class="books-container">${this.showPlaceholder()}</div>`;
    }

    showPlaceholder() {
        return `<div class="wrap-list">
        <div class="placeholder-text">
        <p>У вас пока нет книг в статусе "Читаю сейчас".</p>
        </div>
        </div>`;
    }

    async getUserBooks(userId, status) {
        let booksArray = await getUserBooks(userId, status);
        if (booksArray && booksArray.length) {
            return booksArray;
        }
        this.bookCards = null;
    }

    normalizeBookCards(cardsArray) {
        let rawBookResponses = cardsArray.map(response => {
            return {
                id: response.id,
                body: response._document.data.value.mapValue.fields
            };
        });
        let bookObjects = rawBookResponses.map(book => {
            return {
                id: book.id,
                body: this.flattenObject(book.body)
            }
        });
        return bookObjects.map(bookItem => {
            return {
                id: bookItem.id,
                title: bookItem.body.title,
                author: bookItem.body.author,
                cover: bookItem.body.cover || null, //TEMP - UNTIL COVERS LOADED
                type: 'main',
                options: {
                    pages: bookItem.body.pages,
                    readPages: bookItem.body.readPages,
                    format: bookItem.body.format,
                    genre: bookItem.body.genre,
                    tags: bookItem.body.tags,
                    expectations: bookItem.body.expectations
                }
            }
        });
    }

    drawBookCards(bookObjects) {
        let cards = bookObjects.map(book => {
            return new SmallCard(
                book.id,
                book.cover,
                book.title,
                book.author,
                book.type,
                book.options
            );
        });

        return cards.map(card => card.render());
    }

    drawFullPageWithCards(cards) {
        let content = cards.join();
        return `<div class="main-content-container">
        <div class="content-header">
            <h1 class="main-page-title">Читаю сейчас</h1>
            <a href="#addbook" id="add-book-btn" class="add-book-btn">
                <img src="${btnLike}" alt="Иконка добавить книгу" class="add-icon">
                Добавить книгу
            </a>
        </div>
        <div class="books-container">${content}</div>`;
    }

    flattenObject(nestedObject) {
        const flatObject = {};

        for (const key in nestedObject) {
            if (nestedObject.hasOwnProperty(key)) {
                const valueObj = nestedObject[key];

                if (valueObj.hasOwnProperty('stringValue')) {
                    flatObject[key] = valueObj.stringValue;
                } else if (valueObj.hasOwnProperty('nullValue')) {
                    flatObject[key] = null;
                } else if (valueObj.hasOwnProperty('arrayValue')) {
                    flatObject[key] = valueObj.arrayValue.values || [];
                }
            }
        }

        return flatObject;
    }

}