import SmallCard from '../common/SmallCard.js';

function normalizeBookCards(cardsArray, type) {
    let rawBookResponses = cardsArray.map(response => {
        return {
            id: response.id,
            body: response._document.data.value.mapValue.fields
        };
    });
    let bookObjects = rawBookResponses.map(book => {
        return {
            id: book.id,
            body: flattenCardObject(book.body)
        }
    });
    return bookObjects.map(bookItem => {
        return {
            id: bookItem.id,
            type: type,
            title: bookItem.body.title,
            author: bookItem.body.author,
            cover: bookItem.body.cover || null, //TEMP - UNTIL COVERS LOADED
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

function flattenCardObject(nestedObject) {
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

function drawBookCards(bookObjects) {
    let cards = bookObjects.map(book => {
        console.log('BOOK ', book)
        return new SmallCard(
            book.id,
            book.type,
            book.title,
            book.author,
            book.cover,
            book.options
        );
    });
    console.log('CARDS ', cards)

    return cards.map(card => card.render());
}

module.exports = {
    normalizeBookCards,
    flattenCardObject,
    drawBookCards
}