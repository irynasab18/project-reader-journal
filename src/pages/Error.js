import Page from '../common/Page.js';

export default class ErrorPage extends Page {
  constructor() {
    super({
      id: 'error',
      metaTitle: 'Error',
      title: 'Ошибка 404',
      content: '<p>Ошибка 404. Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>',
    });
  }
}
