import Page from '../common/Page.js';

export default class SignIn extends Page {
    constructor() {
        super({
            id: 'signin',
            content: `<div class="signin-container">
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
        </div>`,
        });

        this.emailInput = null;
        this.passwordInput = null;
        this.submitBtn = null;
        this.email = null;
        this.password = null;

        addEventListeners();
    }

    addEventListeners() {
        const content = document.querySelector('.container');
        content.addEventListener('input', event => this.checkFields(event));
    }

    checkFields(event) {
        event.preventDefault();

        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.submitBtn = document.querySelector('#signin-submit');

        if (emailInput.value && passwordInput.value) {
            submitBtn.disabled = false;
            submitBtn.addEventListener('click', event => this.getInputData(event));
        } else {
            submitBtn.disabled = true;
        }
    }

    getInputData(event) {
        event.preventDefault();

        this.email = this.emailInput.value;
        this.password = this.passwordInput.value;

        this.findAndLoginUser();
    }

    findAndLoginUser() {
        //make req to DB to find email/password pair
        if (/*found*/ true) {
            //fetch user book data
            //render Main screen
            //with user name and SignOut btn
        } else {
            //show error
        }
    }
}