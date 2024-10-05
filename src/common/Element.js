export default class Element {
    constructor({ id, title, content, metaTitle = title }) {
        this.id = id;
        this.content = content;
        this.metaTitle = metaTitle;
    }

    render(className = 'container') {
        document.title = this.metaTitle;
        return `<main class="${className}"><div>${this.content}</div></main>`;
    }
}