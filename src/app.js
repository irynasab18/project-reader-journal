import Start from './pages/Start.js';
import SignUp from './pages/SignUp.js';
import SignIn from './pages/SignIn.js';
import AddBook from './pages/AddBook.js';
import ViewBook from './pages/ViewBook.js';
import EditBook from './pages/EditBook.js';
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
    editbook: new EditBook(),
    error: new ErrorPage(),
};

class View {
    constructor(container, routes) {
        this.container = container;
        this.routes = routes;
        this.contentContainer = this.container.querySelector('#content');
        this.links = [...this.container.querySelectorAll('#mobileMenu .menu-item'),
        ...this.container.querySelectorAll('#authButtons .auth-btn')];
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
        this.contentContainer.innerHTML = route.render();

        if (route.id === 'main' || route.id === 'all' || route.id === 'viewbook' || route.id === 'editbook') {
            route.renderAsync();
        }
    }

    // updateMenu(activePage) {
    //     this.links.forEach((link) => {
    //         const href = link.getAttribute('href').substring(1);
    //         link.classList.toggle('active', href === activePage);
    //     });
    // }
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
        sessionStorage.removeItem('userId');
        this.openStartPage();
        this.handleHashChange();

        // window.addEventListener('DOMContentLoaded', (event) => {
        //     const lastPage = localStorage.getItem('lastPage');
        //     if (lastPage) {
        //         this.model.updateState(lastPage);
        //     } else {
        //         this.model.updateState('main');
        //     }
        // });
    }

    openStartPage() {
        window.location.hash = '#start';
    }

    handleHashChange() {
        const pageId = location.hash.slice(1).toLowerCase();
        localStorage.setItem('lastPage', pageId);
        this.model.updateState(pageId);

        if (pageId === 'start') {
            sessionStorage.removeItem('userId');
        }

        if (pageId === 'addbook') {
            routes.addbook.addEventListeners();
        }

        if (pageId === 'viewbook') {
            routes.viewbook.addEventListeners();
        }

        if (pageId === 'search') {
            routes.search.addEventListeners();
        }

        if (pageId === 'signup') {
            routes.signup.addEventListeners();
        }

        if (pageId === 'signin') {
            routes.signin.addEventListeners();
        }

        if (pageId === 'main') {
            routes.main.addEventListeners();
        }

        if (pageId === 'all') {
            routes.all.addEventListeners();
        }
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
