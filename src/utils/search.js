async function performSearch(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes`;
    const queryParams = new URLSearchParams({
        q: query,
        apiKey: '...'
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
    console.log(data.items[0].volumeInfo)

    for (let i = 0; i < 3; i++) {
        let book = {};
        book.name = data.items[i].volumeInfo.title;
        book.author = data.items[i].volumeInfo.authors.join(', ');
        book.coverLink = data.items[i].volumeInfo.imageLinks.thumbnail;
        response.push(book);
    }

    return response;

}

export { performSearch };