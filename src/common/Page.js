export default class Page {
  constructor({ id, content }) {
    this.id = id;
    this.content = content;
  }

  render(className = 'container') {
    return `<main class="${className}">${this.content}</main>`;
  }
  
}
