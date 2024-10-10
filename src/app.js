import Start from './pages/Start.js';
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import AddBook from './pages/AddBook.js';
import ViewBook from './pages/AddBook.js';
import MainPage from './pages/MainPage.js';
import AllBooks from './pages/AllBooks.js';
import Search from './pages/Search.js';
import Header from './components/Header.js';
import ContentContainer from './components/ContentContainer.js';
import ErrorPage from './pages/Error.js';

import './styles/styles.css';

const components = {
    header: new Header(),
    content: new ContentContainer(),
};

const routes = {
    start: new Start(),
    signup: new SignUp(),
    signin: new SignIn(),
    main: new MainPage(),
    all: new AllBooks(),
    search: new Search(),
    addbook: new AddBook(),
    viewbook: new ViewBook(),
    error: new ErrorPage(),
};

class View {
    constructor(container, routes) {
        this.container = container;
        this.routes = routes;
        this.contentContainer = this.container.querySelector('#content');
        this.links = this.container.querySelectorAll('#mobileMenu .menu-item'); //add all possible links/btns
    }

    renderContent(pageId) {
        if (pageId === 'signin' || pageId === 'signup' || pageId === 'start') {
            this.container.querySelector('#mobileMenu').classList.add('hidden');
            this.container.querySelector('#mobileMenu').classList.remove('shown');
            this.container.querySelector('#logout-btn').classList.add('hidden');
            this.container.querySelector('#logout-btn').classList.remove('shown');
            this.container.querySelector('#signup-btn').classList.add('shown');
            this.container.querySelector('#signup-btn').classList.remove('hidden');
            this.container.querySelector('#signin-btn').classList.add('shown');
            this.container.querySelector('#signin-btn').classList.remove('hidden');
        } else {
            this.container.querySelector('#mobileMenu').classList.remove('hidden');
            this.container.querySelector('#mobileMenu').classList.add('shown');
            this.container.querySelector('#logout-btn').classList.remove('hidden');
            this.container.querySelector('#logout-btn').classList.add('shown');
            this.container.querySelector('#signup-btn').classList.add('hidden');
            this.container.querySelector('#signup-btn').classList.remove('shown');
            this.container.querySelector('#signin-btn').classList.add('hidden');
            this.container.querySelector('#signin-btn').classList.remove('shown');
        }
        const route = this.routes[pageId] || this.routes['error'];
        console.log(route.id)
        this.contentContainer.innerHTML = route.render();

        if (route.id === 'main' || route.id === 'all') {
            route.renderAsync();
        }
    }

    updateMenu(activePage) {
        this.links.forEach((link) => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === activePage);
        });
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
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
    }

    init() {
        this.openStartPage();
        this.handleButtonsClicks();
        this.handleHashChange();
    }

    openStartPage() {
        this.model.updateState('start');
    }

    handleButtonsClicks() {
        const signUpBtn = this.container.querySelector('#signup-btn');
        const signInBtn = this.container.querySelector('#signin-btn');
        const logoutBtn = this.container.querySelector('#logout-btn');

        signUpBtn.addEventListener('click', (event) => this.updateState(event, 'signup'));
        signInBtn.addEventListener('click', (event) => this.updateState(event, 'signin'));
        logoutBtn.addEventListener('click', (event) => this.updateState(event, 'start'));
    }

    updateState(event, state) {
        event.preventDefault();
        this.model.updateState(state);

        if (state === 'signup') {
            this.handleSignUp();
        }

        if (state === 'signin') {
            this.handleSignIn();
        }

        if (state === 'start') {
            sessionStorage.removeItem('userId');
        }
    }

    handleHashChange() {
        const pageId = location.hash.slice(1).toLowerCase();
        this.model.updateState(pageId);

        if (pageId === 'addbook') {
            routes.addbook.addEventListeners();
        }
    }

    handleSignUp() {
        routes.signup.addEventListeners();
    }

    handleSignIn() {
        console.log('SIGNIN')
        routes.signin.addEventListeners();
    }

    handleBookCreation(event) {
        event.preventDefault();
        routes.login
    }
}

export default class App {
    constructor(container) {
        this.container = container;
        this.routes = routes; //from this module scope
        this.components = components; //from this module scope
    }

    renderComponents() { //SHOULD DIFFER LOGGED IN AND LOGGED OUT USERS TO RENDER HEADER
        this.container.innerHTML = `
            ${this.components.header.render()}
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
