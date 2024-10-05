import Page from '../common/Page.js';

export default class SignUp extends Page {
    constructor() {
        super({
            id: 'signup',
            content: `<div class="signup-container">
      <h1 class="page-title">Регистрация</h1>
      <form class="registration-form">
          <div class="form-column">
              <!-- Поле Имя -->
              <div class="form-group">
                  <label for="name" class="form-label required">Имя</label>
                  <input type="text" id="name" class="form-input" required>
              </div>

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

              <!-- Кнопка Зарегистрироваться -->
              <div class="form-buttons">
                  <button id="signup-submit" type="submit" class="reg-btn reg-btn-primary" disabled>Зарегистрироваться</button>
              </div>
          </div>
      </form>
  </div>`,
        });
    }

    addEventListeners() {
        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');
        const submitBtn = document.querySelector('#signup-submit');

        if (nameInput.value && emailInput.value && passwordInput.value) {
            submitBtn.disabled = false;
            submitBtn.addEventListener('click', event => this.getInputData(event));
        } else {
            submitBtn.disabled = true;
        }
    }

    getInputData(event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const passord = passwordInput.value;

        this.findAndLoginUser(name, email, password);
    }

    saveUser(name, email, password) {
        if (name.length < 2) {
            //return error
        }
        if (!email.includes('@')) {
            //return error
        }
        if (password.length < 2) {
            //return error
        }

        //save user to DB

    }
}