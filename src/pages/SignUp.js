import Page from '../common/Page.js';

export default class SignUp extends Page {
    constructor() {
        super({
            id: 'signup',
            content: `<div class="signup-container">
      <h1 class="page-title">Регистрация</h1>
      <form class="registration-form">
          <div class="form-column">
              <div class="form-group">
                  <label for="name" class="form-label required">Имя</label>
                  <input type="text" id="name" class="form-input" required>
              </div>

              <div class="form-group">
                  <label for="email" class="form-label required">E-mail</label>
                  <input type="email" id="email" class="form-input" required>
              </div>

              <div class="form-group">
                  <label for="password" class="form-label required">Пароль</label>
                  <input type="password" id="password" class="form-input" required>
              </div>

              <div class="form-buttons">
                  <button id="signup-submit" type="submit" class="reg-btn reg-btn-primary" disabled=true>Зарегистрироваться</button>
              </div>
          </div>
      </form>
  </div>`,
        });
        this.nameInput = null;
        this.emailInput = null;
        this.passwordInput = null;
        this.submitBtn = null;
        this.name = null;
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
        this.nameInput = document.querySelector('#name');
        this.emailInput = document.querySelector('#email');
        this.passwordInput = document.querySelector('#password');
        this.submitBtn = document.querySelector('#signup-submit');

        if (nameInput.value && emailInput.value && passwordInput.value) {
            submitBtn.disabled = false;
            submitBtn.addEventListener('click', event => this.getInputData(event));
        } else {
            submitBtn.disabled = true;
        }
    }

    getInputData(event) {
        event.preventDefault();
        if (this.nameInput.value.length < 2) {
            //return error
        }
        if (!this.emailInput.value.includes('@')) {
            //return error
        }
        if (this.passwordInput.length < 2) {
            //return error
        }

        this.name = this.nameInput.value;
        this.email = this.emailInput.value;
        this.password = this.passwordInput.value;

        this.saveUser();
        this.loginUser();
    }

    saveUser() {
        //save user to DB
    }

    loginUser() {
        //open main page
    }
}