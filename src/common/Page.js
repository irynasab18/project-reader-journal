export default class Page {
  constructor({ id, content }) {
    this.id = id;
    this.content = content;
  }

  render(className = 'container') {
    return `<main class="${className}">${this.content}</main>`;
  }

  // async renderAsync(className = 'container') {
  //   return await `<main class="${className}">${this.content}</main>`;
  // }
}
