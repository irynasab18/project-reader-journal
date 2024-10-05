import Page from '../common/Page.js';

export default class Search extends Page {
    constructor() {
        super({
            id: 'main-page',
            content: `<div class="search-container">
            <div class="content-header">
                <h1 class="main-page-title">Поиск</h1>
                
            </div>
    
            <div class="books-container"></div>`,
        });
    }

}