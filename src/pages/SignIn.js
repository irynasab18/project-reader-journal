import Page from '../common/Page.js';
import { loginUser } from '../utils/data.js';

export default class SignIn extends Page {
    constructor() {
        super({
            id: 'signin'
        });

        this.emailInput = null;
        this.passwordInput = null;
        this.submitBtn = null;
        this.email = null;
        this.password = null;
        this.user = null;
    }

    addEventListeners() {
        const content = document.querySelector('.signin-container');
        if (content) {
            content.addEventListener('input', event => this.checkFields(event));

            this.submitBtn = document.querySelector('#signin-submit');
            this.submitBtn.addEventListener('click', event => this.handleInputData(event));
        }
    }

    render(error = null) {
        if (error) {
            let normalizedError = this.normalizeError(error);
            const formColumn = document.querySelector('.form-column');

            formColumn.innerHTML = formColumn.innerHTML +
                `<div class="form-group">
                <p class="error-message">${normalizedError}</p>
            </div>`;

            this.addEventListeners();
        }
        return `<div class="signin-container">
        <h1 class="page-title">Вход</h1>
        <form class="login-form">
            <div class="form-column">
                <div class="form-group">
                    <label for="email" class="form-label required">E-mail</label>
                    <input type="email" id="email" class="form-input" required>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label required">Пароль</label>
                    <input type="password" id="password" class="form-input" required>
                </div>

                <div class="form-buttons">
                    <button id="signin-submit" type="submit" class="reg-btn reg-btn-primary" disabled=true>Войти</button>
                </div>
            </div>
        </form>
    </div>`;
    }

    checkFields(event) {
        event.preventDefault();

        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');

        if (emailInput.value && passwordInput.value) {
            this.submitBtn.disabled = false;
            this.email = emailInput.value;
            this.password = passwordInput.value;
        } else {
            this.submitBtn.disabled = true;
        }
    }

    async handleInputData(event) {
        event.preventDefault();
        event.stopPropagation();
        await this.handleLogin();
    }

    async handleLogin() {
        this.userId = await loginUser(this.email, this.password);

        if (this.userId && typeof this.userId === 'string') {
            sessionStorage.setItem('userId', this.userId);
            window.location.hash = '#main';
        } else {
            this.render(this.userId)
        }

    }

    normalizeError(err) {
        if (err && err.errorMessage && err.errorMessage.includes('invalid-credential')) {
            return 'Проверьте правильность введенных данных';
        } else if (err && err.errorMessage && err.errorMessage.includes('invalid-email')) {
            return 'Проверьте введенный email';
        } else if (err && err.errorMessage && err.errorMessage.includes('too-many-requests')) {
            return 'Слишком много неудачных попыток входа';
        } else {
            return 'Неизвестная ошибка'
        }
    }

}