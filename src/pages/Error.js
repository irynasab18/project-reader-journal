import Page from '../common/Page.js';

export default class ErrorPage extends Page {
  constructor() {
    super({
      id: 'error',
      metaTitle: 'Achtung, warning, kujdes, attenzione, pozornost...',
      title: 'Ошибка 404',
      content: '<p>Страница не найдена, попробуйте вернуться на <a href="#main">главную</a>.</p>',
    });
  }
}
