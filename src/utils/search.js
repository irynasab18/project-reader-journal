import imagePlaceholder from '../images/no-image.svg';

async function performSearch(query) {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
    const queryParams = new URLSearchParams({
        q: query,
        apiKey: process.env.BOOKS_API_KEY
    });

    try {
        const response = await fetch(`${apiUrl}?${queryParams}`);
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        const data = await response.json();
        return handleSearchResponse(data);
    } catch (error) {
        console.error('Ошибка поиска:', error);
        return [];
    }
}

function handleSearchResponse(data) {
    let response = [];
    console.log(data)

    if (data && data.items && data.items.length > 0) {
        for (let i = 0; i < 3; i++) {
            let book = {};
            book.title = data.items[i].volumeInfo.title ? data.items[i].volumeInfo.title : 'Название не указано';

            book.author = data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors.join(', ') : 'Автор не указан';

            if (data.items[i].volumeInfo.imageLinks && data.items[i].volumeInfo.imageLinks.thumbnail) {
                book.coverLink = data.items[i].volumeInfo.imageLinks.thumbnail;
            } else {
                book.coverLink = imagePlaceholder;
            }

            response.push(book);
        }

        return response;
    }

    return data;
}

export { performSearch };