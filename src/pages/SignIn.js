import Page from '../common/Page.js';

export default class SignIn extends Page {
    constructor() {
        super({
            id: 'signin',
            content: `<div class="signin-container">
            <h1 class="page-title">Вход</h1>
            <form class="login-form">
                <div class="form-column">
                    <!-- Поле E-mail -->
                    <div class="form-group">
                        <label for="email" class="form-label required">E-mail</label>
                        <input type="email" id="email" class="form-input" required>
                    </div>

                    <!-- Поле Пароль -->
                    <div class="form-group">
                        <label for="password" class="form-label required">Пароль</label>
                        <input type="password" id="password" class="form-input" required>
                    </div>

                    <!-- Кнопка Войти -->
                    <div class="form-buttons">
                        <button id="signin-submit" type="submit" class="reg-btn reg-btn-primary" disabled=true>Войти</button>
                    </div>
                </div>
            </form>
        </div>`,
        });
    }

    addEventListeners() {
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const submitBtn = document.querySelector('#signin-submit');

        if (emailInput.value && passwordInput.value) {
            submitBtn.disabled = false;
            submitBtn.addEventListener('click', event => this.getInputData(event));
        } else {
            submitBtn.disabled = true;
        }

    }

    getInputData(event) {
        event.preventDefault();

        const email = emailInput.value;
        const passord = passwordInput.value;

        this.findAndLoginUser(email, passord);
    }

    findAndLoginUser(email, passord) {
        if (/*found*/ true) {
            //render Main screen!!!!
            //with user name and SignOut btn
        } else {
            //show error
        }

    }
}