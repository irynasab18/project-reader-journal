import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
//import AddBook from './pages/AddBook.js';
import Header from './components/Header.js';
import ContentContainer from './components/ContentContainer.js';
import ErrorPage from './pages/Error.js';

import './styles/styles.css';

const components = {
    header: new Header(),
    content: new ContentContainer(),
};

const routes = {
    signup: new SignUp(),
    signin: new SignIn(),
    //addBook: new AddBook(),
    error: new ErrorPage(),
};

class View {
    constructor(container, routes) {
        this.container = container;
        this.routes = routes;
        this.contentContainer = this.container.querySelector('#content');
    }

    renderContent(pageId) {
        const route = this.routes[pageId] || this.routes['error'];
        this.contentContainer.innerHTML = route.render();
    }
}

class Model {
    constructor(view) {
        this.view = view;
    }

    updateState(pageId) {
        this.view.renderContent(pageId);
    }
}

class Controller {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    init() {
        this.openSignUp();
        this.handleButtonsClicks();
    }

    openSignUp() {
        this.model.updateState('signup');
    }

    handleButtonsClicks() {
        const signUpBtn = this.container.querySelector('#signup-btn');
        const signInBtn = this.container.querySelector('#signin-btn');

        signUpBtn.addEventListener('click', (event) => this.updateState(event, 'signup'));
        signInBtn.addEventListener('click', (event) => this.updateState(event, 'signin'));
    }

    updateState(event, state) {
        event.preventDefault();
        this.model.updateState(state);
    }
}

export default class App {
    constructor(container) {
        this.container = container;
        this.routes = routes; //from this module scope
        this.components = components; //from this module scope
    }

    renderComponents() { //SHOULD DIFFER LOGGED IN AND LOGGED OUT USERS TO RENDER HEADER
        console.log(this.container);

        this.container.innerHTML = `
      ${this.components.header.render(/*true for logged in*/)}
      ${this.components.content.render()}
    `;
    }

    init() {
        this.renderComponents();
        const view = new View(this.container, this.routes);
        const model = new Model(view);
        const controller = new Controller(this.container, model);
        controller.init();
    }
}
