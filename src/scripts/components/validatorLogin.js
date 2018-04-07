let validatorLogin = (() => {

    let login = document.body.querySelectorAll('.login__input')[0],
        password = document.body.querySelectorAll('.login__input')[1],
        submit = document.body.querySelector('.login__btn.authorize'),
        loginPopup = document.body.querySelectorAll('.login__popup p')[0],
        passwordPopup = document.body.querySelectorAll('.login__popup p')[1],
        loginWrap = document.body.querySelectorAll('.login__input-wrap')[0],
        passwordWrap = document.body.querySelectorAll('.login__input-wrap')[1];

    let validate = value => {
        if (value === login.value) {
            if (value.length === 0) {
                return 'Поле не может быть пустым';
            } else if (/[^а-яА-Яa-zA-Z0-9]/i.test(value)) {
                return 'Поле может состоять только из букв и цифр, никаких специальных символов или пробелов';
            }
        } else if (value === password.value) {
            if (value.length === 0) {
                return 'Поле не может быть пустым';
            }
        }
    }

    const handler = () => {
        if (submit) {
            submit.addEventListener('click', e => {
                loginPopup.textContent = validate(login.value);
                if (loginPopup.textContent) {
                    loginWrap.classList.add('error');
                } else {
                    loginWrap.classList.add('correct');

                    passwordPopup.textContent = validate(password.value);

                    if (passwordPopup.textContent) {
                        passwordWrap.classList.add('error');
                    } else {
                        passwordWrap.classList.add('correct');
                    }
                }
                setTimeout(function() {
                    loginWrap.classList.remove('error');
                    passwordWrap.classList.remove('error');

                    loginWrap.classList.remove('correct');
                    passwordWrap.classList.remove('correct');
                }, 2000);
            });
        }       
    }

    return { handler }
})();

export default validatorLogin;