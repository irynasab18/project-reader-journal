import Page from '../common/Page.js';

export default class Start extends Page {
    constructor() {
        super({
            id: 'start',
            content: `<div class="content-wrapper">
            <div class="search-container">
            <div class="wrap-list">
                <div class="start-text">Начните или продолжите вести свой
                список чтения после регистрации или входа</div>
            </div>
        </div>`
        });
    }
}