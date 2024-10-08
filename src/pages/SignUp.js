import Page from '../common/Page.js';
import { registerUser, loginUser, addUserToDatabase } from '../utils/data.js';

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
        this.user = null;
        this.userId = null;
    }

    addEventListeners() {
        const content = document.querySelector('.signup-container');
        if (content) {
            content.addEventListener('input', event => this.checkFields(event));

            this.submitBtn = document.querySelector('#signup-submit');
            this.submitBtn.addEventListener('click', event => this.handleInputData(event));
        }
    }

    checkFields(event) {
        event.preventDefault();
        event.stopPropagation();

        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#password');

        if (nameInput.value && emailInput.value && passwordInput.value) {
            this.submitBtn.disabled = false;
            this.name = nameInput.value;
            this.email = emailInput.value;
            this.password = passwordInput.value;
        } else {
            this.submitBtn.disabled = true;
        }
    }

    async handleInputData(event) {
        event.preventDefault();
        event.stopPropagation();

        this.user = await this.handleRegistration();

        this.userId = await this.saveUserInDB();
        localStorage.setItem('userId', this.userId);
    }

    async handleRegistration() {
        console.log('SAVE')
        let { displayName, email } = await registerUser(this.name, this.email, this.password);
        return {
            name: displayName,
            email
        };
    }

    async saveUserInDB() {
        return await addUserToDatabase(this.user.name, this.user.email);
    }
}