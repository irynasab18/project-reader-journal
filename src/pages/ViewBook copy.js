export default class BigCard {
    constructor(coverUrl, title, author, pages, readPages, tags) {
        this.cover = './src/images/frame-cover.png';
        this.deleteIcon = './src/images/icon-delete.svg';
        this.editIcon = './src/images/icon-edit.svg';
        this.plusCircle = './src/images/plus-circle.svg';
        // this.title = 'Война и мир';
        // this.author = 'Лев Толстой';
        // this.year = 1893;
        // this.country = 'Россия';
        // this.genre = 'Роман';
        // this.pages = 907;
        // this.readPages = 190;
        // this.tags = ['источеская', 'классика'];
        // this.expectations = 'so nice, much interesting';
        // this.format = 'бумага';
        // this.status = 'В процессе';
        // this.beginDate = '13.09.2024';
        // this.rating = null;
        // this.quotes = [];
        // this.notes = [];

        addEventListeners();
    }

    render() {
        return `<div class="book-content-container">
        <!-- Кнопка Вернуться назад -->
        <button class="back-button">
            <img src="arrow-left.svg" alt="Назад" class="back-icon">
            Вернуться назад
        </button>

        <!-- Контейнер информации о книге -->
        <div class="book-info-container">
            <div class="book-info-column-left">
                <!-- Обложка книги -->
                <div class="book-cover">
                    <img src="${this.cover}" alt="Обложка книги">
                </div>

                <!-- Оценка книги (звездочки) -->
                <div class="rating-stars">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>

            <!-- Правая колонка с информацией о книге -->
            <div class="book-info-column-right">
                <div class="book-title-wrapper">
                    <h1 class="book-title">Название книги</h1>
                    <div class="icon-container">
                        <div class="edit-icon-container">
                            <img src="${this.editIcon}" alt="Редактировать" class="edit-icon">
                        </div> <!-- Иконка редактирования -->
                        <div class="delete-icon-container">
                            <img src="${this.deleteIcon}" alt="Удалить" class="edit-icon">
                        </div> <!-- Иконка удаления -->
                    </div>
                </div>

                <h3 class="book-author">Автор книги</h3>
                <p class="book-pages">145 / 468 страниц прочитано</p>

                <!-- Тэги книги -->
                <div class="book-tags">
                    <div class="tag">фантастика</div>
                    <div class="tag">приключения</div>
                </div>

                <!-- Выпадающий список для статуса книги -->
                <div class="form-group">
                    <label for="status" class="form-label">Статус</label>
                    <select id="status" class="form-select">
                        <option>Не начато</option>
                        <option>В процессе</option>
                        <option>Отложено</option>
                        <option>Не буду дочитывать</option>
                        <option>Прочитано</option>
                    </select>
                </div>

                <!-- Блок с жанром, форматом и ожиданиями -->
                <div class="book-details">
                    <div class="book-detail">
                        <span class="detail-label">Жанр:</span>
                        <span class="detail-value">Фантастика</span>
                    </div>
                    <div class="book-detail">
                        <span class="detail-label">Формат:</span>
                        <span class="detail-value">Электронная</span>
                    </div>
                    <div class="book-detail">
                        <span class="detail-label">Ожидания:</span>
                        <span class="detail-value">Очень интересно, ожидание высокое.</span>
                    </div>
                </div>

                <!-- Блок цитат -->
                <h2 class="section-title">Цитаты</h2>
                <div class="quote-container">
                    <div class="quote-block">
                        <p class="quote-text">"Это была самая удивительная история."</p>
                    </div>
                    <div class="quote-block">
                        <p class="quote-text">"В конце концов, мы всегда находим то, что искали."</p>
                    </div>
                    <div class="quote-input-wrapper">
                        <input type="text" class="quote-input" placeholder="Добавить цитату">
                        <button class="add-quote-button">
                            <img src="${this.plusCircle}" alt="Добавить">
                        </button>
                    </div>
                </div>

                <!-- Блок заметок -->
                <h2 class="section-title">Заметки</h2>
                <div class="note-container">
                    <div class="note-block">
                        <p class="note-text">Не забыть перечитать первую главу перед финалом.</p>
                    </div>
                    <div class="note-input-wrapper">
                        <input type="text" class="note-input" placeholder="Добавить заметку">
                        <button class="add-note-button">
                            <img src="${this.plusCircle}" alt="Добавить">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        content.addEventListener('click', event => this.callEventHandler(event));
    }

    setGrade(event) {
        event.preventDefault();
        if (event.target.className === 'star') {
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const value = star.getAttribute('data-value');
                    stars.forEach(s => s.textContent = s.getAttribute('data-value') <= value ? '★' : '☆');
                });
            });
        }
    }
}