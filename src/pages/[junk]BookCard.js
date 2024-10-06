export default class SmallCard {
    constructor(coverUrl, title, author, pages, readPages, tags) {
        this.cover = './src/images/frame-cover.png';
        this.title = 'Война и мир';
        this.author = 'Лев Толстой';
        this.pages = 907;
        this.readPages = 190;
        this.tags = ['источеская', 'классика'];
    }

    render() {
        return `<div class="book-card">
        <div class="book-cover">
            <img src="${this.cover}" alt="Обложка книги">
        </div>
        <div class="book-info">
            <div class="book-details">
                <h3 class="book-title">${this.title}</h3>
                <p class="book-author">${this.author}</p>
                <p class="book-pages">
                    <span class="pages-read">${this.readPages}</span>
                    <span>/</span>
                    <span class="total-pages">${this.pages}</span>
                    <span>страниц прочитано</span>
                </p>
                <div class="book-tags">
                    <div class="tag">${this.tags[0]}</div>
                    <div class="tag">${this.tags[1]}</div>
                </div>
            </div>
            <div class="book-more">
                <a href="#" class="menu-item">Смотреть больше</a>
            </div>
        </div>
    </div>`;
    }
}